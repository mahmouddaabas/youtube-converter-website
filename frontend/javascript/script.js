$(document).ready(() => {

    var format;
    var quality = "high";

    $(".mp3").on("click", () => {
        $(".mp3").css('background-color','green');
        $(".mp4").css('background-color','white');
        format = "mp3"
    })

    $(".mp4").on("click", () => {
        $(".mp4").css('background-color','green');
        $(".mp3").css('background-color','white');
        format = "mp4"
    })

    $(".quality-select-box").change(() => {
        quality = $(".quality-select-box").val();
    })

    $(".convert-btn").on("click", () => 
    {
        if(format != undefined && $(".url-input").val().indexOf("youtube") >= 0) { //check if a format has been selected and if its a youtube url
                $(".status").css('color','white');
                $(".status").text("Converting your video, please wait...")
                fetch('https://youtube-converter-web-py.herokuapp.com/download?url=' + $(".url-input").val() + "&format=" + format + "&quality=" + quality)
                .then(response => {
                    var url = response.url; //get the url from the response
                    var a = document.createElement("a") //create an a element
                    a.href = url; //set the url to the a documents href
                    a.click(); //click on the a document to trigger a browser download
                    a.remove(); //remove the a element once its done
                    $(".status").css('color','green');
                    $(".status").text("Sucessfully converted, download will begin shortly.")
            })
        }
        else {
            alert("Insert a valid youtube url and select a format!")
            $(".status").css('color','red');
            $(".status").text("There was an error which caused the conversion to fail.")
        }
    })

    async function split_url(url){
        url = url.split("?")
        return url[1];
    }
})