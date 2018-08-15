let path = window.location.href.toString().split(window.location.host)[1];

function includeHTML(name) {

    selectMenu(name);

    console.log('path: ' + path);
    console.log('includeHTML: ' + name);

    var main, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    main = document.getElementsByTagName("main");
    /*make an HTTP request using the attribute value as the file name:*/

    elmnt = main[0];

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                elmnt.innerHTML = this.responseText;

                // document.title = name.toUpperCase();
                // let url = (name === "shop" ? "" : name);

                // console.log(name)

                if (name.startsWith('shop/')) {
                    window.history.pushState({"html": this.responseText, "pageTitle": name.toUpperCase()}, "", "/" + name);
                } else if (!path.startsWith("/" + name) && name !== 'shop') {
                    window.history.pushState({"html": this.responseText, "pageTitle": name.toUpperCase()}, "", "/" + name.replace('/', ''));
                } else if (name === 'shop') {
                    window.history.pushState({"html": this.responseText, "pageTitle": name.toUpperCase()}, "", "/");
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
        // document.title = e.state.pageTitle;
    }
};