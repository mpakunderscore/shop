function includeHTML(name) {

    let menu = document.getElementsByTagName('header')[0].getElementsByTagName('div');

    for (let i = 0; i < menu.length; i++) {

        if (menu[i] && menu[i].classList)
            menu[i].classList.remove('active');

        if (menu[i] && menu[i].getAttribute('onclick') === "includeHTML('"+ name +"')")
            menu[i].classList.add('active');
    }

    // console.log([1].classList.remove('active'));
    // console.log(document.getElementsByTagName('header')[0].childNodes[3].classList.add('active'));

    console.log('includeHTML: ' + name);

    var main, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    main = document.getElementsByTagName("main");
    /*make an HTTP request using the attribute value as the file name:*/

    elmnt = main[0];

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            // elmnt.removeAttribute("include-html");
            // includeHTML(name);
        }
    };
    xhttp.open("GET", '/html/' + name + '.html', true);
    xhttp.send();
    /*exit the function:*/
}