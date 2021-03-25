const path = require('path')
const CssImage = require('../index')

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