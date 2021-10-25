const { fileURLToPath } = require('url')
const { parse, dirname, join, resolve } = require('path')
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
      let [, shadow] = id.split(`${prefix}`)
      if (shadow) {
        shadow = withoutExt(shadow)
        let [main, overrides] = files.find(([file]) => {
          return shadow === withoutExt(file)
        })
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
        const [fileWithExt] = files.find(([file]) => withoutExt(file) === withoutExt(shadow))
        return {
          code: await readFile(resolve(roots.blueprint, fileWithExt), 'utf8'),
          map: null,
        }
      }
    },
  }
}

module.exports = vitePluginBlueprint

function withoutExt (str) {
  const parsed = parse(str)
  return join(parsed.dir, parse(parsed.base).name).replace(/^\/+/, '')
}

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
