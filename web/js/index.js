let state = {};
// state.cart = [];

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

        state.items = JSON.parse(this.responseText);

        state.items['Корзина'] = {};
        state.items['Корзина']['Пусто'] = [];
        state.items['Корзина']['Пусто'].push({name: "Test name", images: "", description: "Some test description", price: 1900});
        state.items['Корзина']['Пусто'].push({name: "Test name", images: "", description: "Some test description", price: 300});
        state.items['Корзина']['Пусто'].push({name: "Test name", images: "", description: "Some test description", price: 400});
    }
};

xhttp.open("GET", "/items/model", true);
xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send("JSON");

function buildShop() {

    let main = document.getElementsByTagName("main")[0];

    let categories = Object.keys(state.items);

    let categoriesHtml = "";
    for (let i = 0; i < categories.length; i++) {

        categoriesHtml += "<div class='block' onclick='includeHTML(`shop/" + translate(categories[i]) + "`)'>";
        categoriesHtml += "<div class='title'>" + categories[i] + "</div>";
        categoriesHtml += buildCategoriesHtml(Object.keys(state.items[categories[i]]), '', false);
        categoriesHtml += "</div>";
    }

    main.innerHTML = categoriesHtml;
}

function buildShopItems(id) {

    let block = document.getElementById(id);
    let title = block.childNodes[1].innerText.trim();

    let itemsArray = state.items[title];
    let categories = Object.keys(itemsArray);
    let selectedCategory = itemsArray[categories[0]];

    let itemsHtml = buildItemsHtml(selectedCategory, false);

    let categoriesHtml = buildCategoriesHtml(categories, categories[0]);

    //TODO here render
    block.getElementsByClassName('categories')[0].innerHTML = categoriesHtml;
    block.nextElementSibling.innerHTML = itemsHtml;
    block.nextElementSibling.style.display = "flex";
}

function buildCategoryItems(category) {

    //TODO
    let block = category.parentNode.parentNode.parentNode.getElementsByClassName('block')[0];
    console.log(block)
    let title = block.childNodes[1].innerText.trim();

    let itemsArray = state.items[title];
    let categories = Object.keys(itemsArray);
    let selectedCategory = itemsArray[category.innerText];

    let itemsHtml = buildItemsHtml(selectedCategory, false);

    let categoriesHtml = buildCategoriesHtml(categories, categories[0]);

    //TODO here render
    block.getElementsByClassName('categories')[0].innerHTML = categoriesHtml;
    block.nextElementSibling.innerHTML = itemsHtml;
    block.nextElementSibling.style.display = "flex";
}

function buildCartItems(id) {

    let block = document.getElementById(id);
    let title = block.childNodes[1].innerText.trim();

    let itemsArray = state.items[title];
    let categories = Object.keys(itemsArray);
    let selectedCategory = itemsArray[categories[0]];

    let itemsHtml = buildItemsHtml(selectedCategory, true);

    let categoriesHtml = buildCategoriesHtml(categories, selectedCategory);

    //TODO here render
    block.nextElementSibling.innerHTML = itemsHtml  + categoriesHtml;
    block.nextElementSibling.style.display = "flex";
}

function buildItemsHtml(items, isCart) {

    let itemsHtml = "";
    // let itemsHtml = "<div class='items'>";

    for (let i = 0; i < items.length; i++) {

        itemsHtml +=
            "<div class='item'>" +
            "<div class='images'><img src='" + items[i].images.split('\n')[0] + "'>" + "</div>" +
            "<div class='name'>" + items[i].name + "</div>" +
            "<div class='description'>" + items[i].description.replace(/(?:\r\n|\r|\n)/g, '<br/>') + "</div>" +
            "<div class='price'>" + items[i].price + " руб</div>";

        if (!isCart)
            itemsHtml += "<div class='cart'><div class='cartBack'></div><span>В корзину</span><div class='electrocontact'></div></div>";

        itemsHtml += "</div>";
    }

    if (isCart)
        itemsHtml += "<div class='cart'><div class='cartBack'></div><span>Оплатить</span></div>";

    // itemsHtml += "</div>";

    return itemsHtml;
}

function buildCategoriesHtml(items, selectedCategory, isCart) {

    console.log(items)

    let categoriesHtml = "";

    // categoriesHtml += "<div class='shop-categories'>";
    // for (let i = 0; i < Object.keys(state.items).length; i++) {
    //     categoriesHtml += ("<div onclick='includeHTML()'>" + Object.keys(state.items)[i] + "</div>");
    // }
    // categoriesHtml += "</div>";

    categoriesHtml += "<div class='categories'>";
    for (let i = 0; i < items.length; i++) {
        categoriesHtml += ("<div class='" + (items[i] !== selectedCategory ? 'category' : 'selectedCategory') + "' onclick='buildCategoryItems(this)'>" + items[i] + "</div>");
    }
    categoriesHtml += "</div>";

    return categoriesHtml;
}