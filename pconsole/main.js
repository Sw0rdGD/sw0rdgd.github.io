const ws = new WebSocket("wss://pconsole-cli-backend.fly.dev/ws");
let consoleStream = "";
let prevCommands = [];
let prevCommandPointer = 0;

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

    
}

ws.onclose = () => {
    console.log("WebSocket connection closed");
}

function sendCommand(command) {
    ws.send(command);
    prevCommands.push(command);
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
    if (ele.id == "consoleInput") {
        switch (event.code) {
            case "Enter":
                sendCommandFromInput(ele);
                document.getElementById("consoleInput").value = "";
                break;
            case "ArrowUp":
                event.preventDefault();
                switchCommandUp();
                break;
            case "ArrowDown":
                event.preventDefault();
                switchCommandDown();
                break;
        }
        
    }
}

function switchCommandDown() {
    if (prevCommands.length === 0) return;
    prevCommandPointer++;
    if (prevCommandPointer === prevCommands.length) prevCommandPointer = 0;

    document.getElementById("consoleInput").value = prevCommands[prevCommandPointer];
}

function switchCommandUp() {
    if (prevCommands.length === 0) return;
    prevCommandPointer--;
    if (prevCommandPointer < 0) prevCommandPointer = prevCommands.length - 1;

    document.getElementById("consoleInput").value = prevCommands[prevCommandPointer];
}

function resetSwitchCommand() {
    prevCommandPointer = 0;
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