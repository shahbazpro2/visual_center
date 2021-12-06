const express = require('express')
const sharp = require('sharp');
const visualCenter = require('./visualCenter');
const { createCanvas, Image } = require('canvas');
const trimCanvas = require('./trimCanvas')
const app = express()
const port = 5000
app.use(express.json({ limit: '50mb' }))
app.post('/', async (req, res) => {

    if (!req.body.image) { return res.status(204).json("You must need to pass base64 image") }

    const reqImage = req.body.image.startsWith("data:image")
        ? req.body.image
        : `data:image/png;charset=utf-8;base64,${req.body.image}`;

    console.log(req.body.image.startsWith("data:image"))
    const img = new Image();
    var orig = Buffer.from(reqImage.split(',')[1], 'base64');

    console.log('load')
    const canvas = createCanvas()
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);


    const trim = trimCanvas(canvas)

    sharp(orig)
        .resize({ height: trim.bottom, width: trim.right })
        .toBuffer()
        .then(resizedImageBuffer => {
            const resizedImageData = resizedImageBuffer.toString('base64');
            const imgData = `data:image/png;charset=utf-8;base64,${resizedImageData}`;
            visualCenter(imgData, (err, result) => {
                return res.status(200).json(result)
            })
        })
        .catch(err => console.log(err))

    img.src = reqImage


})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
