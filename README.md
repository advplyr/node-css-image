# Node CSS Image

Apply css filters to an image.

**Puppeteer v8**

## Installation

```bash
$ npm install node-css-image
```

## Usage

```js
const path = require('path')
const CssImage = require('node-css-image')

const samplePayload = {
  src: 'https://www.w3schools.com/CSSref/pineapple.jpg',
  height: 300,
  width: 300,
  filters: {
    sepia: 0.5,
    brightness: 1.25,
    saturate: 2
  },
  output: path.join(__dirname, 'sample2-output.png')
}

CssImage.save(samplePayload).then(() => console.log('Done')).catch((error) => {
  console.error('Failed', error)
})
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
