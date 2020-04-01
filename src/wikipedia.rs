use reqwest::Error;

pub fn search_page_url(name: &str) -> Result<String, Error> {
    let request_url = format!("https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&titles={page_name}",
                              page_name = name);

    let api_response = reqwest::blocking::get(&request_url)?.text()?;

    let api_response = json::parse(&api_response).unwrap();

    let target_url: &str = api_response["query"]["pages"]
        .entries()
        .next()
        .unwrap() // This is a very bad idea
        .1["fullurl"]
        .as_str()
        .unwrap(); // This is also a bad idea

    return Ok(target_url.to_string())
}
