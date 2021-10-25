# vite-plugin-blueprint

A [Vite](https://vitejs.dev/) plugin that lets you easily shadow files in your app directory from a _blueprint_. 

Take this simple Vite app as example:

```
example/
├── blueprint/
│   ├── foobar.js
│   └── main.js
├── index.html
└── vite.config.js
```

And this **vite.config.js**:

```js
import vitePluginBlueprint from 'vite-plugin-blueprint'

export default {
  plugins: [
    vitePluginBlueprint({
      root: resolve => resolve(import.meta.url, 'blueprint'),
      prefix: '@blueprint/',
      files: [
        // Searches foobar.js in the app root directory, 
        // if not found, provide foobar.js from the blueprint root
        ['foobar.js'],
        // Searches for either main.js, index.js or start.js in the app root directory, 
        // if not found, provide main.js from the blueprint root
        ['main.js', ['index.js', 'start.js']],
      ],
    }),
  ],
}
```

Now, if you delete the `main.js` file at the root, the app will still compile because that file will be shadowed by `main.js` under `blueprint/`, as long as you use the prefix you set when referencing files:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App backed by Blueprint</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="@blueprint/main"></script>
  </body>
</html>
```

## Install

```bash
npm i vite-plugin-blueprint --save-dev
```

## License

MIT
