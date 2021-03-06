# Webpack

### Udemy Webpack Beyond the Basics

---

```
const path = require("path"); // "path" is provided by Node

module.exports = {
  entry: {
    main: ["./src/main.js"]
    // create our main bundle
    // paths in "entry" are always relative to where you run webpack from
    // main can be a string or an array of strings with file paths to bundle - multiple files get concatenated
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js", 
    // the convention is to use whatever the entry bundle name is, followed by "-bundle", e.g. main-bundle
    path: path.resolve(__dirname, "../dist"),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist'
  }
}
```

NOTE: when running webpack-dev-server, it seems you have to globally install this _unless_ running it through an npm script:
`npm install webpack-dev-server -g`
Alternatively run it through npx (which comes with npm) to use the local version: `npx webpack-dev-server`

Important: Webpack only understands JavaScript. It relies on Loaders to enable it to understand other file types (e.g. CSS).

Loaders run in reverse order, e.g.

```
  module: {
    rules: [
      {
        test: /\.css$/, // regex points to file type
        use: [ // array of loaders to use on these files
          {
            loader: 'style-loader' // this loader is used second
          },
          {
            loader: 'css-loader' // this loader is used first
          }
        ]
      }
    ]
  }
```
