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
    img.crossOrigin = "Anonymous";
    var orig = Buffer.from(reqImage.split(',')[1], 'base64');
    img.onload = () => {
        const canvas = createCanvas()
        canvas.width = img.width
        canvas.height = img.height
        console.log('load', img, img.width, img.height)
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);


        const trim = trimCanvas(canvas)
        console.log('trim', trim)


        visualCenter(trim, (err, result) => {
            console.log('res', result)
            return res.status(200).json(result)
        })

    }
    img.src = reqImage






})

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
