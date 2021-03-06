from flask import Flask, request, send_file
from flask_cors import CORS
from pytube import YouTube
import re
import youtube_dl
import os
import io

app = Flask(__name__)
CORS(app)

@app.route("/")
def welcome():
    return "Contact the creator for documentation on how to use this."+ "<br>Discord: mahe#0996"


@app.route("/download")
def download():
    #Args that are sent with the query
    url = request.args.get('url')
    format = request.args.get('format')
    quality = request.args.get('quality')
    
    video = YouTube(url)

    #Get video title
    title = video.title;

    #Clean video title
    title = re.sub('[^A-Za-z0-9]+', '', title)
    #print("Video title: " + title)

    #Get video streams
    #print(video.streams.all)

    #Select video resolution based on args in the query
    if quality == "high": 
        video = video.streams.get_highest_resolution()
    else:
        video = video.streams.get_lowest_resolution()

    if format == "mp3":
        #Extract information
        ydlinfo = youtube_dl.YoutubeDL()
        info_dict = ydlinfo.extract_info(url, download=False)
        video_title = info_dict.get("title", None)

        #Clean video title for MP3 to prevent it from creating a folder for the downloaded file
        video_title = video_title.replace("/", "-")

        #Declare options for the download
        ydl_opts = {
            'outtmpl': title + ".mp3",
            'format': 'bestaudio/best',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
                }],
            }

        #Download the file with youtube_dl
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        #Declare path to downloaded MP3 file
        path = title + ".mp3"

        #Create a place to store the file in the memory
        return_data = io.BytesIO()

        #Open the file and write it into the place we created in the memory.
        with open(path, 'rb') as fo:
            return_data.write(fo.read())
        return_data.seek(0)

        #Delete the downloaded MP3 file as we no longer need it.
        os.remove(path)

        #Send the file
        return send_file(return_data, as_attachment=True, attachment_filename=video_title + ".mp3")

    else:
        #Download the file with pytube
        video.download(filename=title + ".mp4")

        #Declare path to downloaded MP4 file
        path = title + ".mp4"

        #Create a place to store the file in the memory
        return_data = io.BytesIO()

         #Open the file and write it into the place we created in the memory.
        with open(path, 'rb') as fo:
            return_data.write(fo.read())
        return_data.seek(0)

        #Delete the downloaded MP4 file as we no longer need it.
        os.remove(path)

        #Send the file
        return send_file(return_data, as_attachment=True, attachment_filename=title + ".mp4")
