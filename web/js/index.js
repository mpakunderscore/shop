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

    // console.log(block.innerHTML)

    let items = "";

    for (let i = 0; i < state.items.length; i++) {

            items +=
            "<div class='item'>" +
            "<div class='images'><img src='" + state.items[i].images.split('\n')[0] + "'>" + "</div>" +
            "<div class='name'>" + state.items[i].name + "</div>" +
            "<div class='price'>" + state.items[i].price + " руб</div>" +
            "<div class='description'>" + state.items[i].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
            "<div class='cart'>В корзину</div>" +
            "</div>";
    }

    block.nextElementSibling.innerHTML = items;

    block.nextElementSibling.style.display = "block";
}