/**
 * Returns a copy of a canvas element with surrounding transparent space removed
 */
const { createCanvas, createImageData } = require('canvas')
var trimCanvas = (function () {
  function rowBlank(imageData, width, y) {
    for (var x = 0; x < width; ++x) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  function columnBlank(imageData, width, x, top, bottom) {
    for (var y = top; y < bottom; ++y) {
      if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
  }

  return function (canvas, offset = 25) {
    console.log('canvas', canvas)
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('cav', canvas.width, canvas.height)
    var top = 0, bottom = imageData.height, left = 0, right = imageData.width;

    while (top < bottom && rowBlank(imageData, width, top)) ++top;
    while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
    while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
    while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;
    console.log('level', left - offset, top - offset, right - left + 2 * offset, bottom - top + 2 * offset)


    var trimmed = ctx.getImageData(left - offset, top - offset, right - left + 2 * offset, bottom - top + 2 * offset);



    console.log('copy', trimmed.width, trimmed.height)
    return {
      left: left - offset,
      top: top - offset,
      right: right - left + 2 * offset,
      bottom: bottom - top + 2 * offset
    }

    /* var trimmed = ctx.getImageData(left - offset, top - offset, right - left + 2 * offset, bottom - top + 2 * offset);



    console.log('copy', trimmed.width, trimmed.height)
    var copy = createCanvas(trimmed.width, trimmed.height)
    const copyCtx = copy.getContext('2d')
    copyCtx.putImageData(trimmed, 0, 0);
    return copy; */
  };
})();

module.exports = trimCanvas;