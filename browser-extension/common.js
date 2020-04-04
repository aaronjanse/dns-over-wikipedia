var apiPrefix = "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&format=json&origin=*&titles=";

function request(url) {
  var x = new XMLHttpRequest();
  x.open('GET', url, false);
  x.send(null);
  return x.responseText
} 

function redirect(requestDetails) {
  var hostname = new URL(requestDetails.url).hostname
  var searchQuery = hostname.replace(/\.idk$/, '');

  var apiData = JSON.parse(request(apiPrefix+searchQuery));
  var wikiUrl = Object.values(apiData.query.pages)[0].fullurl;
  var html = request(wikiUrl);
  var doc = new DOMParser().parseFromString(html, "text/html");
  var wikiUrlRow = doc.querySelector('table.infobox tbody tr td.url');

  if (wikiUrlRow) {
    return {redirectUrl: wikiUrlRow.querySelector('a').href};
  } else {
    return {redirectUrl: wikiUrl};
  }
}

var root = null;
if (typeof chrome !== 'undefined') {
  root = chrome; // chrome
} else if (typeof browser !== 'undefined') {
  root = browser; // firefox
}

root.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls: ["*://*.idk/*"]},
  ["blocking"]
);
