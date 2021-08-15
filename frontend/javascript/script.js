$(document).ready(() => {

    var format;

    $(".mp3").on("click", () => {
        $(".mp3").css('background-color','green');
        $(".mp4").css('background-color','white');
        format = ".mp3"
    })

    $(".mp4").on("click", () => {
        $(".mp4").css('background-color','green');
        $(".mp3").css('background-color','white');
        format = ".mp4"
    })

    $(".convert-btn").on("click", () => {
        if(format != undefined) { //check if a format has been selected
            split_url($(".url-input").val()).then(url_response => {
                fetch('https://youtube-downloader-web.herokuapp.com/convert/' + url_response + "/" + format)
                .then(response => {
                    var url = response.url; //get the url from the response
                    var a = document.createElement("a") //create an a element
                    a.href = url; //set the url to the a documents href
                    a.click(); //click on the a document to trigger a browser download
                    a.remove(); //remove the a element once its done
                })
            })
        }
        else {
            alert("Select a format!")
        }
    })

    async function split_url(url){
        url = url.split("?")
        return url[1];
    }
})