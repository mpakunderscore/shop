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