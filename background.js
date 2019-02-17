let locale = null;

chrome.storage.local.get(["locale"], result => {
  if (result) {
    locale = result.locale;
  }
});

chrome.storage.onChanged.addListener(changes => {
  const change = changes.locale;
  if (change) {
    locale = change.newValue;

    chrome.browserAction.setBadgeText({ text: locale || "" });
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    if (!locale) return details;
    for (let i = 0; i < details.requestHeaders.length; i++) {
      if (details.requestHeaders[i].name === "Accept-Language") {
        details.requestHeaders[i].value = locale;
        break;
      }
    }
    const result = { requestHeaders: details.requestHeaders };
    return result;
  },
  {
    urls: ["<all_urls>"]
  },
  ["blocking", "requestHeaders", "extraHeaders"]
);
