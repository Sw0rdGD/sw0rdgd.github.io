let x = 5;

function myFunction() {
    alert("Hello! I am an alert box!");
}

function foo() {
    let element = document.getElementById("demo");
    element.innerHTML = x;
    element.style.color = "red";
    element.onclick = myFunction;
    element.click();
}

let file = "test.txt";

function testFetch() {
    fetch(file)
        .then(x => x.text())
        .then(y => document.getElementById("demo").innerHTML = y);
}