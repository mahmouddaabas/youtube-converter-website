const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const ytdl = require('ytdl-core');


app.use(cors());

app.get('/convert/:url/:format', async (request, response) => {
    console.log('Converting video.')
    const url = request.params.url;
    const selected_format = request.params.format;

    dl_url = 'https://www.youtube.com/watch?' + url

    ytdl.getInfo(dl_url).then(info => {
        
    videoname = info.videoDetails.title; //grab video title
    for(var i = 0; i < 5; i++){ //replace | with -
        videoname = videoname.replace("|", '-')
        }
        videoname = videoname.replace(/[^a-z0-9 ,.?!]/ig, '') //remove all illegal characters (ex arabic alphabet)
        //console.log(videoname + selected_format)

    response.header("Content-Disposition", 'attachment;\  filename="' + videoname + selected_format)

    ytdl(dl_url ,{format: selected_format})

    .pipe(response)
    })
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});