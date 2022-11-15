# Development

## Setup

This project uses `pnpm`. Might work with `npm`/`yarn` but no promises.

```sh
pnpm i
```

## Developing

```sh
pnpm run dev
```

This starts building on change.

### Firefox

**Loading**

To actually see changes you need to load the extensions by going to [about:debugging](about:debugging), then "This Firefox" and selecting the `manifest.json` in the `dist/dev` folder.

**Working**

After loading you will get a `Manifest URL`. Navigate to it, then change the `manifest.json` to the html file you want to work on.

If you're not seeing changes applied, try reloading the extension [about:debugging](about:debugging)

### Chrome

**Loading**

Go to [chrome://extensions/](chrome://extensions/) and enable developer mode (top right). After that click on `Load unpacked` and select the `dist/dev` folder.

**Working**

You'll get an `ID`. After that you can navigate to `chrome-extension://<ID>/manifest.json`

If you're not seeing changes applied, try reloading the extension in the [chrome://extensions/](chrome://extensions/) tab. (Right from the remove button)
