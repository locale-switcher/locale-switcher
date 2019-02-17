let locale = null;

chrome.storage.local.get(["locale"], result => {
  if (result) {
    locale = result.locale;
  }

  if (locale) embedScript();
});

const embedScript = () => {
  const code = `
    (() => {
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

  const script = document.createElement("script");
  script.textContent = code;
  document.documentElement.prepend(script);
  script.remove();
};
