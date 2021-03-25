const fs = require('fs').promises
const path = require('path')
const { constants } = require('fs')
const { FILTER_BOUNDS, EXTENSION_MIMES, FILTER_DATA } = require('./consts')

/*
 *   Validate Filters
*/
function validateFilters(filters) {
  var cleanedFilters = {}
  for (const filter in filters) {
    var value = filters[filter]
    if (isNaN(value) || value === null || value === Infinity || value === -Infinity) {
      console.warn('Invalid filter value', filter, value)
      continue
    }
    const bounds = FILTER_BOUNDS[filter]
    if (!bounds) {
      console.warn('Invalid filter', filter)
      continue
    }
    var newValue = Number(value)
    if (newValue === bounds[2]) { // Default value
      continue
    }
    if (newValue < bounds[0]) {
      console.warn('Filter', filter, 'value below minimum', bounds[0])
      newValue = bounds[0]
    } else if (newValue > bounds[1]) {
      console.warn('Filter', filter, 'value above maximum', bounds[1])
      newValue = bounds[1]
    }
    cleanedFilters[filter] = newValue
  }
  return cleanedFilters
}
exports.filters = validateFilters

/*
 *   Validate Src (if local path get base64 data url)
*/
function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}
function getMimetype(src) {
  const ext = path.extname(src)
  if (!ext) return false
  return EXTENSION_MIMES[ext.substr(1).toLowerCase()]
}
async function validateSrc(src) {
  if (validateUrl(src)) return src // website
  try {
    const mimetype = getMimetype(src)
    if (!mimetype) return false
    await fs.access(src, constants.R_OK)
    const buff = await fs.readFile(src)
    return `data:${mimetype};base64,${buff.toString('base64')}`
  } catch (err) {
    console.error(err)
    return false
  }
}
exports.src = validateSrc

/*
 *   Filter object to css style string
*/
function buildStyle(filters) {
  const styles = []
  for (const filter in filters) {
    const data = FILTER_DATA[filter]
    styles.push(`${data[0]}(${filters[filter]}${data[1]})`)
  }
  return 'filter: ' + styles.join(' ')
}
exports.buildStyle = buildStyle