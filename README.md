<p align="center">
  <img src="https://github.com/locale-switcher/design/raw/main/assets/store/Store%20Image.png" alt="logo" />
</p>
<br/>

# 🌏 Locale Switcher

![chrome users](https://img.shields.io/chrome-web-store/users/kngfjpghaokedippaapkfihdlmmlafcc?label=chrome)
![chrome rating](https://img.shields.io/chrome-web-store/rating/kngfjpghaokedippaapkfihdlmmlafcc?label=chrome)
![firefox users](https://img.shields.io/amo/users/locale-switcher?label=firefox)
![firefox rating](https://img.shields.io/amo/rating/locale-switcher?label=firerox)
![version](https://img.shields.io/github/v/release/locale-switcher/locale-switcher?label=version&sort=semver)

Browser Extension to quickly change your browser locale.

## 🔗 Download

- [**Chrome**](https://chrome.google.com/webstore/detail/locale-switcher/kngfjpghaokedippaapkfihdlmmlafcc)
- [**Firefox**](https://addons.mozilla.org/en-US/firefox/addon/locale-switcher/)

## ❓ What does it do?

When a locale is chosen the following things will be adjusted:

- `navigator.language`
- `navigator.languages`
- `Accept-Language` headers

## ✨ Features

- Chrome & Firefox
- Support for 700+ languages and variations
- Per tab basis
- Favorite your most used locales
- Fully shortcut enabled, no mouse needed (_Windows_: <kbd>Ctrl + Shift + L</kbd> / _Mac_: <kbd>Cmd + Shift + L</kbd>)
- Dark mode

## 🔐 Permissions

- The extensions needs permissions to intercept and alter web traffic for the `Accept-Language` feature to work.
- Access to tabs to load the client script in order to change `navigator` properties.

## Authors

- Initial idea, implementation and distribution by @athyuttamre
- New UI & current maintenance by @cupcakearmy

## Acknowledgements

The data for the locales is scraped automatically from [Locale Planet](https://www.localeplanet.com/icu/index.html).

## License

Distributed under the MIT License. See `LICENSE` for more information.
