import vitePluginBlueprint from 'vite-plugin-blueprint'

export default {
  plugins: [
    vitePluginBlueprint({
      root: resolve => resolve(import.meta.url, 'blueprint'),
      prefix: '@blueprint',
      files: [
        ['foobar', ['foobar.js']],
        ['main', ['main.js', 'index.js']],
      ],
    }),
  ],
}
