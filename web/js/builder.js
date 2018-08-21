let path = window.location.href.toString().split(window.location.host)[1];

function includeHTML(name) {

    selectMenu(name);

    console.log('path: ' + path);
    console.log('includeHTML: ' + name);

    let main, elmnt, xhttp;
    /*loop through a collection of all HTML elements:*/
    main = document.getElementsByTagName("main");
    /*make an HTTP request using the attribute value as the file name:*/

    elmnt = main[0];

    if (name === 'shop') {
        buildShop();
        window.history.pushState({"html": document.getElementsByTagName("main")[0].innerHTML, "pageTitle": name.toUpperCase(), "name": name}, "", "/");
        return;
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                //TODO add function call to state

                elmnt.innerHTML = this.responseText;

                if (name.startsWith('shop/')) {

                    buildShopItems();
                    window.history.pushState({"html": document.getElementsByTagName("main")[0].innerHTML, "pageTitle": name.toUpperCase(), "name": name}, "", "/" + name);

                } else if (!path.startsWith("/" + name) && name !== 'shop') {

                    if (name.startsWith("cart"))
                        buildCartItems();

                    window.history.pushState({"html": document.getElementsByTagName("main")[0].innerHTML, "pageTitle": name.toUpperCase(), "name": name}, "", "/" + name.replace('/', ''));
                }

            }
            if (this.status == 404) {
                elmnt.innerHTML = "<div class='block'><div class='title'>Page not found</div></div>";
            }
            /*remove the attribute, and call this function once more:*/
            // elmnt.removeAttribute("include-html");
            // includeHTML(name);
        }
    };
    xhttp.open("GET", '/html/' + name + '.html', true);
    // .substring(0, name.length -1)
    xhttp.send();
    /*exit the function:*/
}

if (path === '/')
    path = 'shop';
else
    path = path.substring(0, path.length - 1).replace('/', '');

includeHTML(path);

function selectMenu(name) {

    let menu = Array.prototype.slice.apply(document.getElementsByClassName('menu')[0].getElementsByTagName('div'));
    menu = menu.concat(Array.prototype.slice.apply(document.getElementsByClassName('menu')[1].getElementsByTagName('div')))
    menu = menu.concat(Array.prototype.slice.apply(document.getElementById('top').getElementsByTagName('div')))

    for (let i = 0; i < menu.length; i++) {

        if (menu[i] && menu[i].classList)
            menu[i].classList.remove('active');

        if (menu[i] && menu[i].hasAttribute('onclick') && name.startsWith(menu[i].getAttribute('onclick').replace("includeHTML('", "").replace("')", "")))
            menu[i].classList.add('active');
    }
}

window.onpopstate = function(e) {

    if (e.state){
        document.getElementsByTagName("main")[0].innerHTML = e.state.html;
        selectMenu(e.state.name);
        // document.title = e.state.pageTitle;
    }
};