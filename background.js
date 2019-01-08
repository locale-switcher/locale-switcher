var locale = null;

chrome.storage.local.get(["locale"], function(result) {
  if (result) {
    locale = result;
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  var change = changes.locale;
  if (change) {
    console.log(
      "[background] storage.locale changed from " +
        change.oldValue +
        " to " +
        change.newValue
    );
    locale = change.newValue;
  }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    if (!locale) return details;
    for (var i = 0; i < details.requestHeaders.length; i++) {
      if (details.requestHeaders[i].name === "Accept-Language") {
        details.requestHeaders[i].value = locale;
        break;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  {
    urls: ["<all_urls>"]
  },
  // TODO: add "extraHeaders" for Chrome 72+
  ["blocking", "requestHeaders"]
);
