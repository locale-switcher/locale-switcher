<p align="center">
  <img src="./icons/256.png" alt="logo" />
</p>

# 🌏 Locale Switcher

Browser Extension to quickly change your browser locale.

## ❓ What does it do?

When a locale chosen the following thinks will be adjusted:

- `navigator.language`
- `navigator.languages`
- `Accept-Language` headers

## ✨ Features

- Chrome & Firefox
- Support for 700+ languages and variations
- Per tab basis
- Favorite your most used locales
- Fully shortcut enabled, no mouse needed (_Windows_: Ctrl+Shift+L / _Mac_: Cmd+Shift+L)

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
