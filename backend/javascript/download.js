const fs = require('fs');
const ytdl = require('ytdl-core');

const os = require('os');
const path = require('path');
const dl_path = path.join(os.homedir(), "Downloads");
//console.log(dl_path);

async function video_information(url){
    ytdl.getInfo(url).then(info => {
        //console.log(info.videoDetails.title);
        download_video(url, info.videoDetails.title, '.mp3')
    })
}

async function download_video(url, video_name, format){
    video_name = video_name.replace("|", "-")
    //console.log(video_name)
ytdl(url)
  .pipe(fs.createWriteStream(dl_path +  '\\' + video_name + format));
}

video_information('https://youtu.be/aJnUvVOMmYc?list=RDMM')

module.exports = {
    video_information,
    download_video
}
