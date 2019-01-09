var locale = null;

chrome.storage.local.get(["locale"], function(result) {
  if (result) {
    locale = result.locale;
  }
  embedScript();
});

function embedScript() {
  var code = `
    (function() {
      Object.defineProperties(Navigator.prototype, {
        language: {
          value: '${locale}',
          configurable: false,
          enumerable: true,
          writable: false
        },
        languages: {
          value: ['${locale}'],
          configurable: false,
          enumerable: true,
          writable: false
        }
      });
    })();`;

  var script = document.createElement("script");
  script.textContent = code;
  document.documentElement.prepend(script);
  script.remove();
}
