try {
  const language = document.currentScript.getAttribute('data-language')
  const languages = JSON.parse(document.currentScript.getAttribute('data-languages'))
  if (language && languages) {
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
  }
} catch (e) {
  console.error('Could not set languages with locale switcher')
  console.error(e)
}
