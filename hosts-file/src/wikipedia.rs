use std::error::Error;
use scraper::Selector;
use scraper::Html;

pub fn search_page_url(name: &str) -> Result<String, Box<dyn Error>> {
    let request_url = format!("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&titles={page_name}",
                              page_name = name);

    let api_response =
        reqwest::blocking::get(&request_url)?
        .text()?;
    let api_response = json::parse(&api_response)?;

    let wiki_url: &str = api_response["query"]["pages"]
        .entries()
        .next().ok_or("failed to extract entry from api")?
        .1["fullurl"]
        .as_str().ok_or("failed to extract fullurl from api entry")?;

    let wikipedia_page_content = reqwest::blocking::get(wiki_url)?.text()?;

    return match extract_url(&wikipedia_page_content) {
        Err(_) => Ok(wiki_url.to_string()),
        Ok(dest) => Ok(dest)
    };
}

pub fn extract_url(wikipedia_page_content: &str) -> Result<String, String> {
    let select_urls = Selector::parse("table.infobox tbody tr td.url").unwrap();
    let select_link = Selector::parse("a").unwrap();

    let document = Html::parse_document(&wikipedia_page_content);

    let urls = document.select(&select_urls).next().ok_or("couldn't find url in infobox")?;
    let link = urls.select(&select_link).next().ok_or("couldn't find link within infobox url entry")?;
    Ok(link.value().attr("href").ok_or("could not find href")?.to_string())
}