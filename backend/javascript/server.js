const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;

const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


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

    if(selected_format == ".mp3") {

        let stream = ytdl(dl_url, { //make stream reference the ytdl function
            quality: 'highestaudio',
          });

        ffmpeg(stream) //load the downloaded file into ffmpeg
        .noVideo() //remove video
        .format("mp3") //assign format
        .pipe(response, {end: true}); //pipe the response then end the output stream
    }
    else {
        ytdl(dl_url)
        .pipe(response);
    }
    })
});

app.listen(port, () => {
    console.log('Listening on port: ' + port)
});