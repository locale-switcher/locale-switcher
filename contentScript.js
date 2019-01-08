var locale = null;

chrome.storage.local.get(["locale"], function(result) {
  if (result) {
    locale = result;
  }

  updateNavigator();
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  var change = changes.locale;
  if (change) {
    console.log(
      "[contentScript] storage.locale changed from " +
        change.oldValue +
        " to " +
        change.newValue
    );
    locale = change.newValue;
    updateNavigator();
    location.reload();
  }
});

function updateNavigator() {
  if (!locale) return;

  // TODO: store the original navigator value so we can reset it later.
  Object.defineProperties(navigator, {
    language: {
      value: locale,
      configurable: false,
      enumerable: true,
      writable: false
    },
    languages: {
      value: [locale],
      configurable: false,
      enumerable: true,
      writable: false
    }
  });
}
