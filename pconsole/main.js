const ws = new WebSocket("wss://pconsole-cli-backend.fly.dev/ws");
let consoleStream = "";

ws.onopen = () => {
    console.log("WebSocket connection established");
}

ws.onmessage = (event) => {
    console.log("Received message:", event.data);
    consoleStream += event.data + "\n";
    document.getElementById("consoleCode").textContent = consoleStream;
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