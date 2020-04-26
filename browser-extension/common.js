var apiPrefix = "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&origin=*&titles=";

function request(url) {
  var x = new XMLHttpRequest();
  x.open('GET', url, false);
  x.send(null);
  return x.responseText
} 

function redirect(searchQuery) {
  var apiData = JSON.parse(request(apiPrefix+searchQuery));
  var wikiUrl = Object.values(apiData.query.pages)[0].fullurl;
  var html = request(wikiUrl);
  var doc = new DOMParser().parseFromString(html, "text/html");
  var infoboxRows = doc.querySelectorAll('table.infobox tbody tr');
  infoboxRows = Array.from(infoboxRows);
  var wikiUrlRow = infoboxRows.filter(x => x.innerText.match(/(?:URL)|(?:Website)/));

  if (wikiUrlRow[0]) {
    for (var i in wikiUrlRow) {
      var a = wikiUrlRow[i].querySelector('a');
      if (a) {
        return a.href;
      }
    }
    return wikiUrl;
  } else {
    return wikiUrl;
  }
}

var root = null;
if (typeof chrome !== 'undefined') {
  root = chrome; // chrome
} else if (typeof browser !== 'undefined') {
  root = browser; // firefox
}

root.webRequest.onBeforeRequest.addListener(
  (requestDetails) => {
    var hostname = new URL(requestDetails.url).hostname
    var searchQuery = hostname.replace(/\.idk$/, '');
    return {redirectUrl: redirect(searchQuery)};
  },
  {urls: ["*://*.idk/*"]},
  ["blocking"]
);

if (typeof chrome !== 'undefined') {
  chrome.omnibox.onInputEntered.addListener(function(text) {
    chrome.tabs.update({ url: redirect(text) });
  });
}
