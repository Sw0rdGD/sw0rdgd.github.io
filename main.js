const queryParamsString = window.location.search.substr(1);
const queryParams = queryParamsString
    .split('&')
    .reduce((accumulator, singleQueryParam) => {
        const [key, value] = singleQueryParam.split('=');
        accumulator[key] = decodeURIComponent(value);
        return accumulator;
    }, {});

function myFunction() {
    alert("Hello! I am an alert box!");
}

function foo() {
    let element = document.getElementById("demo");
    element.innerHTML = "hi";
    element.style.color = "red";
    element.onclick = myFunction;
    element.click();
}