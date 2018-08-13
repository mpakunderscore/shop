let state = {};

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        state.items = JSON.parse(this.responseText);
        // console.log(state.items[0]);
    }
};

xhttp.open("GET", "/items", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("JSON");

function addItems(block) {

    // console.log(block.innerHTML)

    let title = block.childNodes[1].innerText.trim();

    let itemsHtml = "";

    let itemsArray = state.items[title];

    console.log(title);
    console.log(state.items);
    console.log(itemsArray);

    let categories = Object.keys(itemsArray);

    let categoriesHtml = "<div class='categories'>" + categories.join(' / ') + "</div>";

    let firstCategory = itemsArray[categories[0]];

    for (let i = 0; i < firstCategory.length; i++) {

        itemsHtml +=
            "<div class='item'>" +
            "<div class='images'><img src='" + firstCategory[i].images.split('\n')[0] + "'>" + "</div>" +
            "<div class='name'>" + firstCategory[i].name + "</div>" +
            "<div class='price'>" + firstCategory[i].price + " руб</div>" +
            "<div class='description'>" + firstCategory[i].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
            "<div class='cart'>- В корзину + <div class='electrocontact'></div></div>" +
            "</div>";
    }

    block.nextElementSibling.innerHTML = categoriesHtml + itemsHtml;

    block.nextElementSibling.style.display = "block";
}