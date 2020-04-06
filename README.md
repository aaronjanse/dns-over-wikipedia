# DNS over Wikipedia

Wikipedia keeps track of official URLs for popular websites. With DNS over Wikipedia installed, domains ending with `.idk` are resolved by searching Wikipedia and extracting the relevant URL from the infobox.

Example:
1. Type `scihub.idk/` in browser address bar
2. Observe redirect to `https://sci-hub.tw` (at the time of writing)

<img src="./demo.gif" width="600"/>

> Instead of googling for the site, I google for the site's Wikipedia article ("schihub wiki") which usually has an up-to-date link to the site in the sidebar, whereas Google is forced to censor their results. 
>   
> If you Google "Piratebay", the first search result is a fake "thepirate-bay.org" (with a dash) but the Wikipedia article lists the right one.
> — [shpx](https://news.ycombinator.com/item?id=22414031)

## Installation Options

#### [Chrome Extension](https://chrome.google.com/webstore/detail/mjmjpfncapfopnommmngnmjalkopljji/publish-accepted?authuser=0&hl=en)

#### [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/dns-over-wikipedia/)

#### [(optional) Rust DNS Resolver Script](./hosts-file/README.md)
