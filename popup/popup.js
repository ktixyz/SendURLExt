function sendCurrentURL() {
    document.querySelector("#send-url-btn>span").innerHTML = 'Sending...';
    document.querySelector("#send-url-btn>svg").classList.toggle("vibrate-3");

    setTimeout(function () {
        URLSent();
    }, 2000);
}

function URLSent() {
    document.querySelector("#send-url-btn>span").innerHTML = 'Sent';
    document.querySelector("#send-url-btn>svg").classList.toggle("vibrate-3");
    document.querySelector("#send-url-btn>svg").classList.toggle("slide-out-blurred-tr");
    document.querySelector("#send-url-btn").classList.toggle("clicked");
}


document.querySelector('#send-url-btn').addEventListener('click', sendCurrentURL);