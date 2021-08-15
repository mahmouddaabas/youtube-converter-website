const fs = require('fs');
const ytdl = require('ytdl-core');

const os = require('os');
const path = require('path');
const dl_path = path.join(os.homedir(), "Downloads");
//console.log(dl_path);

async function video_information(url, format){
    ytdl.getInfo(url).then(info => {
        //console.log(info.videoDetails.title);
        download_video(url, info.videoDetails.title, format)
    })
}

async function download_video(url, video_name, format){
    for(var i = 0; i < 5; i++){
    video_name = video_name.replace("|", '-')
    }
    //console.log(video_name)
    ytdl(url).pipe(fs.createWriteStream(dl_path +  '\\' + video_name + format));
}

module.exports = {
    video_information,
    download_video
}
