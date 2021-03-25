exports.FILTER_DATA = {
  brightness: ['brightness', ''],
  contrast: ['contrast', ''],
  saturate: ['saturate', ''],
  hueRotate: ['hue-rotate', 'deg'],
  blur: ['blur', 'px'],
  sepia: ['sepia', '']
}
exports.EXTENSION_MIMES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  webp: 'image/webp',
  tif: 'image/tiff',
  tiff: 'image/tiff',
  bmp: 'image/bmp'
}
exports.FILTER_BOUNDS = {
  brightness: [0, Infinity, 1],
  contrast: [0, Infinity, 1],
  saturate: [0, Infinity, 1],
  hueRotate: [-Infinity, Infinity, 0],
  blur: [0, Infinity, 0],
  sepia: [0, 1, 0]
}
