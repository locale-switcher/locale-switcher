;(() => {
  const language = document.currentScript.getAttribute('data-language')
  const languages = document.currentScript.getAttribute('data-languages')
  Object.defineProperties(window.navigator.__proto__, {
    language: {
      value: language,
      enumerable: true,
    },
    languages: {
      value: languages,
      enumerable: true,
    },
  })
})()
