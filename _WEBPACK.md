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
