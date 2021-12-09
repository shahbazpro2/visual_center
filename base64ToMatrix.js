const { createCanvas, Image } = require('canvas');
const SIZE = 820;

const base64ToRGBMatrix = (base64, callback) => {
    const img = new Image();

    img.crossOrigin = "Anonymous";
    img.onload = () => {
        console.log('imgw', img.width, img.height)
        const resizeRatio = SIZE / Math.max(img.width, img.height);

        const canvas = createCanvas();

        canvas.width = Math.floor(img.width * resizeRatio);
        canvas.height = Math.floor(img.height * resizeRatio);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const { data } = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const { width, height } = canvas;
        console.log('lib', width, height, data)
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
    img.src = base64;

}

module.exports = base64ToRGBMatrix
