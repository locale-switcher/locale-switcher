import { defineConfig } from 'wxt'

export default defineConfig({
  srcDir: 'src',
  extensionApi: 'webextension-polyfill',
  modules: ['@wxt-dev/module-svelte'],
  manifest: () => {
    return {
      name: 'Locale Switcher',
      version: '1.3.0',
      description: 'Lets you quickly switch the browser locale to test localization on your website.',
      permissions: ['storage', 'declarativeNetRequest', 'activeTab', 'scripting'],
      host_permissions: ['<all_urls>'],
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
