const express = require('express');
const app = express();
const convert = require('./download');
const cors = require('cors');
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/convert/:url', async (request, response) => {
    //console.log('Converting video.')
    const url = request.params.url;
    //console.log(url)

    let data = await convert.download_video(url);
    //console.log(data)
    response.send(data)
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});