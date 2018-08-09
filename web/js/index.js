let state = {};

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        state.items = JSON.parse(this.responseText);
        console.log(state.items[0]);
    }
};

xhttp.open("GET", "/items", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("JSON");




function addItems(block) {


    block.nextElementSibling.innerHTML =
        "<div>" +
        "<div class='images'><img src='" + state.items[0].images.split('\n')[0] + "'>" + "</div>" +
        "<div class='name'>" + state.items[0].name + "</div>" +
        "<div class='description'>" + state.items[0].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
        "<div class='price'>" + state.items[0].price + "</div>" +
        "</div>";

    block.nextElementSibling.style.display = "block";
}