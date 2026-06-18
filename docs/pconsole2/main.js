let elements = document.getElementsByTagName("code");
for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "<codeHeader>PConsole</codeHeader>" + elements[i].innerHTML
}