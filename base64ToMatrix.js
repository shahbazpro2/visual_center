const { createCanvas, Image } = require('canvas');
const SIZE = 820;

const base64ToRGBMatrix = (base64, callback) => {
    const img = new Image();
    img.src = base64;

    const resizeRatio = SIZE / Math.max(img.width, img.height);

    const width = Math.floor(img.width * resizeRatio);
    const height = Math.floor(img.height * resizeRatio);

    const canvas = createCanvas();

    canvas.width = Math.floor(img.width * resizeRatio);
    canvas.height = Math.floor(img.height * resizeRatio);

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const { data } = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

    let result = [];
    for (var y = 0; y < height; y++) {
        result[y] = [];
        for (var x = 0; x < width; x++) {
            result[y][x] = {
                r: data[y * width * 4 + x * 4],
                g: data[y * width * 4 + x * 4 + 1],
                b: data[y * width * 4 + x * 4 + 2],
                a: data[y * width * 4 + x * 4 + 3]
            };
        }
    }
    callback(null, result);

}

module.exports = base64ToRGBMatrix
