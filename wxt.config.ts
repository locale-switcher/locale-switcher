import { defineConfig } from 'wxt'

export const version = '1.3.1'

export default defineConfig({
  srcDir: 'src',
  extensionApi: 'webextension-polyfill',
  modules: ['@wxt-dev/module-svelte'],
  manifest: ({ manifestVersion }) => {
    return {
      version,

      // Meta
      name: 'Locale Switcher',
      description: 'Lets you quickly switch the browser locale to test localization on your website.',
      homepage_url: 'https://github.com/locale-switcher/locale-switcher',

      // Config
      permissions:
        manifestVersion === 3
          ? ['storage', 'declarativeNetRequest', 'activeTab']
          : ['storage', 'declarativeNetRequest', 'activeTab', 'scripting'],
      host_permissions: manifestVersion === 3 ? undefined : ['<all_urls>'],
      web_accessible_resources: [
        {
          matches: ['*://*/*'],
          resources: ['override-language.js'],
        },
      ],
      commands: {
        _execute_action: {
          suggested_key: {
            default: 'Ctrl+Shift+L',
          },
        },
      },
    }
  },
})
