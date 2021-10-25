const { fileURLToPath } = require('url')
const { dirname, join, resolve } = require('path')
const { readFile, pathExists } = require('fs-extra')

function vitePluginBlueprint ({ prefix, root, files }) {
  const roots = {
    blueprint: root((...args) => resolve(urlJoin(...args))),
    app: null,
  }
  return {
    name: 'vite-plugin-blueprint',
    configResolved (config) {
      roots.app = config.root
    },
    async resolveId (id) {
      const [, shadow] = id.split(`${prefix}`)
      if (shadow) {
        let [main, overrides] = files.find(([file]) => shadow === file)
        if (!overrides) {
          overrides = []
        }
        for (const override of [main, ...overrides]) {
          const overridePath = resolve(roots.app, override)
          if (await pathExists(overridePath)) {
            return overridePath
          }
        }
        return id
      }
    },
    async load (id) {
      const [, shadow] = id.split(`${prefix}`)
      if (shadow) {
        return {
          code: await readFile(resolve(roots.blueprint, shadow), 'utf8'),
          map: null,
        }
      }
    },
  }
}

module.exports = vitePluginBlueprint

// Props to https://github.com/mcollina/desm

function urlDirname (url) {
  // Works for both CJS and ESM
  try {
    return dirname(fileURLToPath(url))
  } catch {
    return url
  }
}

function urlJoin (url, ...str) {
  return join(urlDirname(url), ...str)
}
