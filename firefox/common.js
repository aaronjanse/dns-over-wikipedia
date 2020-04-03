var pattern = "*://*.idk/*";

var apiPrefix = "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&origin=*&titles=";
 
function redirectAsync(requestDetails) {
  var hostname = new URL(requestDetails.url).hostname
  var searchQuery = hostname.replace(/\.idk$/, '');

  var wikipediaPage = fetch(apiPrefix+searchQuery)
    .then(response => response.json())
    .then(apiData => Object.values(apiData.query.pages)[0].fullurl);

  let finalDomain = wikipediaPage
    .then(page => fetch(page))
    .then(response => response.text())
    .then(html =>
      new DOMParser().parseFromString(html, "text/html"))
    .then(doc =>
      doc.querySelector('table.infobox tbody tr td.url')
         .querySelector('a').href)
    .catch(() => wikipediaPage);

  return finalDomain.then(url => ({redirectUrl: url}));
}

browser.webRequest.onBeforeRequest.addListener(
  redirectAsync,
  {urls: [pattern]},
  ["blocking"]
);