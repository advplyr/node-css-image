const puppeteer = require('puppeteer')
const validator = require('./utils/validator')

async function save(payload) {
  const start_time = Date.now()
  const verbose = !!payload.verbose
  const headless = payload.headless === false ? false : true

  const src = await validator.src(payload.src)
  if (!src) {
    throw new Error('Invalid src')
  }
  const height = payload.height
  const width = payload.width
  const filters = validator.filters(payload.filters)
  const output = payload.output

  const imgStyle = validator.buildStyle(filters)

  if (verbose) console.log('Image Style', imgStyle)

  // Init puppeteer page
  const browser = await puppeteer.launch({ headless })
  const pages = await browser.pages()
  const page = pages[0]
  page.setViewport({ height, width })

  // Set page + image
  const imgStr = `<img src="${src}" style="${imgStyle};height:${height}px;width:${width}px;" />`
  const htmlString = `<html><head><style type="text/css">body { margin: 0; padding: 0; }</style></head><body>${imgStr}</body></html>`
  await page.setContent(htmlString)
  await page.waitForSelector('img')

  // Screenshot
  const buff = await page.screenshot({ path: output, omitBackground: true })

  await browser.close()

  if (verbose) {
    const duration = Math.round((Date.now() - start_time) / 10) / 100
    console.log('Finished in', duration, 's')
  }

  if (!output) return buff
  return true
}
exports.save = save