const ws = new WebSocket("wss://pconsole-cli-backend.fly.dev/ws");
let consoleStream = "";

ws.onopen = () => {
    console.log("WebSocket connection established");
}

ws.onmessage = (event) => {
    console.log("Received message:", event.data);
    consoleStream += event.data + "\n";
    //document.getElementById("consoleCode").textContent = consoleStream;
    splitText(consoleStream, document.getElementById("consoleCode"));
    scrollview = document.getElementsByClassName("consoleInner")[0];
    scrollview.scrollTop = scrollview.scrollHeight;

    document.getElementById("consoleInput").value = "";
}

ws.onclose = () => {
    console.log("WebSocket connection closed");
}

function sendCommand(command) {
    ws.send(command);
}

function sendCommandFromElementID(elementID) {
    const inputElement = document.getElementById(elementID);
    console.log("Sending command:", inputElement.value);
    sendCommand(inputElement.value);
}

function sendCommandFromInput(ele) {
    console.log("Sending command:", ele.value);
    sendCommand(ele.value);
}

function search(ele) {
    if (event.key === "Enter") {
        sendCommandFromInput(ele);
    }
}

function splitText(text, element) {
    const lines = text.split("\n");

    element.innerHTML = "";

    lines.forEach(line => {
        const span = document.createElement("span");
        span.textContent = line;

        span.style.lineHeight = "1em";

        span.style.display = "block";

        element.appendChild(span);
    });
}