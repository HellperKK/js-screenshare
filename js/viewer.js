let interval = null;

document.querySelector("#start").addEventListener("click", () => {
    document.querySelector("#start").disabled = true;
    document.querySelector("#stop").disabled = false;
    interval = setInterval(stream, 1000);
});

document.querySelector("#stop").addEventListener("click", stop);

function stop() {
    document.querySelector("#start").disabled = false;
    document.querySelector("#stop").disabled = true;
    document.querySelector("#frame").src = "";
    clearInterval(interval);
    interval = null;
}

function stream() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
        if ((this.readyState === XMLHttpRequest.DONE) && (this.status == 200)){
            if (this.responseText != "0") {
                document.querySelector("#frame").src = decodeURIComponent(this.responseText);
            }
            else {
                stop();
            }
        }
    };
    xhr.open('POST', 'php/getStream.php', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}