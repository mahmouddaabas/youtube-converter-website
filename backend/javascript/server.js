const express = require('express');
const app = express();
const convert = require('./download');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/convert/:url/:format', async (request, response) => {
    console.log('Converting video.')
    const url = request.params.url;
    const format = request.params.format;
    //console.log(url, format)

    dl_url = 'https://www.youtube.com/watch?' + url
    //console.log(dl_url)

    let data = await convert.video_information(dl_url, format);
    //console.log(data)
    response.send("Converting video, please wait...")
    response.send(data)
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});