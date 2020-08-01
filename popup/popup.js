function getCurrentTabUrl() {
    var queryInfo = {
        active: true,
        currentWindow: true,
    }

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0]
        return tab.url;
    });
}

function sendCurrentURL() {
    document.querySelector("#send-url-btn>span").innerHTML = 'Sending...';
    document.querySelector("#send-url-btn>svg").classList.add("vibrate-3");
    document.querySelector("#send-url-btn").disabled = true;
    document.querySelector("#send-url-btn").classList.remove("failed");
    document.querySelector("#send-url-btn").classList.remove("clicked");
    document.querySelector("#send-url-btn>svg").classList.remove("slide-out-blurred-tr");
    document.querySelector("#send-url-btn>svg").classList.remove("slide-out-blurred-down");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'example.com', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            setTimeout(function () {
                if (this.status === 200) {
                    URLSent();
                } else {
                    URLFailed();
                }
            }, 1500);
        }
    }

    let url = getCurrentTabUrl();

    if (url == "Undefined") {
        URLFailed("No URL found");
    } else {
        xhr.send({ "url": url });
    }
}

function URLSent() {
    document.querySelector("#send-url-btn>span").innerHTML = 'Sent';
    document.querySelector("#send-url-btn>svg").classList.remove("vibrate-3");
    document.querySelector("#send-url-btn>svg").classList.add("slide-out-blurred-tr");
    document.querySelector("#send-url-btn").classList.add("sent");
    document.querySelector("#send-url-btn").disabled = false;
}

function URLFailed(message = "Failed") {
    document.querySelector("#send-url-btn>span").innerHTML = 'Failed';
    document.querySelector("#send-url-btn>svg").classList.remove("vibrate-3");
    document.querySelector("#send-url-btn>svg").classList.add("slide-out-blurred-tr");
    document.querySelector("#send-url-btn").classList.add("failed");
    document.querySelector("#send-url-btn").disabled = false;
}

document.querySelector('#send-url-btn').addEventListener('click', sendCurrentURL);