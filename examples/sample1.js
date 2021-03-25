const path = require('path')
const CssImage = require('../index')

const src = path.join(__dirname, 'sampler.png')
const output = path.join(__dirname, 'sample1-output.png')

const samplePayload = {
  src,
  height: 400,
  width: 600,
  filters: {
    sepia: 0,
    brightness: 1.1,
    hueRotate: 0,
    contrast: 1,
    blur: 0,
    saturate: 2
  },
  output,
  verbose: true
}

CssImage.save(samplePayload).then(() => {
  console.log('Image ready')
}).catch((error) => {
  console.log('Image failed', error)
})