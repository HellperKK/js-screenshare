function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

let video = document.querySelector('video');
let canvas = document.querySelector('canvas');
const constraints = {
    video: true
};

let interval = null;
let media = null;

document.querySelector("#start").addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if ((this.readyState === XMLHttpRequest.DONE) && (this.status == 200)){
            if (this.responseText == "1") {
                media = navigator.mediaDevices.getDisplayMedia(constraints);
                media.then((stream) => {video.srcObject = stream});
                document.querySelector("#start").disabled = true;
                document.querySelector("#stop").disabled = false;
                interval = setInterval(stream, 1000);
                canvas.classList.remove("hidden");
            }
        }
    };
    xhr.open('POST', 'php/canConnect.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
});

document.querySelector("#stop").addEventListener("click", stopStream);

function stopStream() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if ((this.readyState === XMLHttpRequest.DONE) && (this.status == 200)){
            if (this.responseText == "1") {
                clearInterval(interval);
                document.querySelector("#start").disabled = false;
                document.querySelector("#stop").disabled = true;
                media.then(med => med.getTracks().forEach(track => track.stop()));
                media = null;
                canvas.classList.add("hidden");
            }
        }
    };
    xhr.open('POST', 'php/disconnect.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function stream() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if ((this.readyState === XMLHttpRequest.DONE) && (this.status == 200)){
            if (this.responseText != "1") {                
                stopStream();
            }
        }
    };
    xhr.open('POST', 'php/stream.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("frame=" + encodeURIComponent(canvas.toDataURL('image/jpeg', 0.1)));
}