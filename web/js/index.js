let state = {};
// state.cart = [];

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        state.items = JSON.parse(this.responseText);
        state.items['Корзина'] = {};
        state.items['Корзина']['Все'] = [];
        state.items['Корзина']['Все'].push({name: "Test name", images: "", description: "Some test description", price: 1900});
        state.items['Корзина']['Все'].push({name: "Test name", images: "", description: "Some test description", price: 300});
        state.items['Корзина']['Все'].push({name: "Test name", images: "", description: "Some test description", price: 400});
    }
};

xhttp.open("GET", "/items", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("JSON");

function addItemsToCart(id) {

    // console.log(id);

    let block = document.getElementById(id);

    // console.log(block);

    let title = block.childNodes[1].innerText.trim();

    // console.log('addItemsById: ' + id)
    // console.log(state);
    let itemsHtml = "";

    // console.log(state);

    let itemsArray = state.items[title];

    console.log(title)

    let categories = Object.keys(itemsArray);

    let selectedCategory = itemsArray[categories[0]];

    // console.log(categories)

    itemsHtml = buildCartItemsHtml(block, selectedCategory);

    let categoriesHtml = "<div class='categories'>";
    for (let i = 0; i < categories.length; i++) {

        // console.log(category.innerText)
        // console.log(category.innerText)

        categoriesHtml += ("<div class='" + (i !== 0 ? 'category' : 'selectedCategory') + "' onclick='addItemsFromCategory(this)'>" + categories[i] + "</div>");
    }
    categoriesHtml += "</div>";

    //TODO here render
    block.nextElementSibling.innerHTML = categoriesHtml + itemsHtml + "<div class='cart'><div class='cartBack'></div><span>Оплатить</span></div>";
    block.nextElementSibling.style.display = "flex";
}

function addItemsById(id) {

    // console.log(id);

    let block = document.getElementById(id);

    // console.log(block);

    let title = block.childNodes[1].innerText.trim();

    // console.log('addItemsById: ' + id)
    // console.log(state);
    let itemsHtml = "";

    // console.log(state);

    let itemsArray = state.items[title];

    console.log(title)

    let categories = Object.keys(itemsArray);

    let selectedCategory = itemsArray[categories[0]];

    // console.log(categories)

    itemsHtml = buildItemsHtml(block, selectedCategory);

    let categoriesHtml = "<div class='categories'>";
    for (let i = 0; i < categories.length; i++) {

        // console.log(category.innerText)
        // console.log(category.innerText)

        categoriesHtml += ("<div class='" + (i !== 0 ? 'category' : 'selectedCategory') + "' onclick='addItemsFromCategory(this)'>" + categories[i] + "</div>");
    }
    categoriesHtml += "</div>";

    //TODO here render
    block.nextElementSibling.innerHTML = categoriesHtml + itemsHtml;
    block.nextElementSibling.style.display = "flex";
}

function addItemsFromCategory(category) {

    console.log(category.innerText);

    //TODO
    let block = category.parentNode.parentNode.previousSibling.previousSibling;
    let title = block.childNodes[1].innerText.trim();

    let itemsHtml = "";

    let itemsArray = state.items[title];

    let categories = Object.keys(itemsArray);

    let selectedCategory = itemsArray[category.innerText];

    itemsHtml = buildItemsHtml(block, selectedCategory);

    let categoriesHtml = "<div class='categories'>";
    for (let i = 0; i < categories.length; i++) {

        // console.log(category.innerText)
        // console.log(category.innerText)

        categoriesHtml += ("<div class='" + (categories[i] !== category.innerText ? 'category' : 'selectedCategory') + "' onclick='addItemsFromCategory(this)'>" + categories[i] + "</div>");
    }
    categoriesHtml += "</div>";

    block.nextElementSibling.innerHTML = categoriesHtml + itemsHtml;

    block.nextElementSibling.style.display = "flex";
}

function buildItemsHtml(block, category) {

    console.log(category)

    let itemsHtml = "";

    for (let i = 0; i < category.length; i++) {

        itemsHtml +=
            "<div class='item'>" +
            "<div class='images'><img src='" + category[i].images.split('\n')[0] + "'>" + "</div>" +
            "<div class='name'>" + category[i].name + "</div>" +
            "<div class='description'>" + category[i].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
            "<div class='price'>" + category[i].price + " руб</div>" +
            "<div class='cart'><div class='cartBack'></div><span>В корзину</span><div class='electrocontact'></div></div>" +
            "</div>";
    }

    return itemsHtml;
}

function buildCartItemsHtml(block, category) {

    console.log(category)

    let itemsHtml = "";

    for (let i = 0; i < category.length; i++) {

        itemsHtml +=
            "<div class='item'>" +
            "<div class='images'><img src='" + category[i].images.split('\n')[0] + "'>" + "</div>" +
            "<div class='name'>" + category[i].name + "</div>" +
            "<div class='description'>" + category[i].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
            "<div class='price'>" + category[i].price + " руб</div>" +
            "</div>";
    }

    return itemsHtml;
}

function showMain() {

}

function showMenu() {

    let buttons = document.getElementsByClassName('button');

    for (let i = 0; i < buttons.length; i++) {

        if (!buttons[i].classList.contains('mobile')) {
            buttons[i].style.display = "flex";
        } else {
            buttons[i].style.display = "none";
        }
    }
}