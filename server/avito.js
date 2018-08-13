
items = document.getElementsByClassName('profile-public-item');

console.log(items.length)

for (let i = 0; i < items.length; i++) {

    let string = i + '/(1)/';

    string = string + items[i].getElementsByClassName('profile-public-item-title')[0].innerText;
    if (items[i].getElementsByClassName('profile-public-item-image')[0].getElementsByTagName('img').length > 0) {
        string = string + '/(2)/' + items[i].getElementsByClassName('profile-public-item-image')[0].getElementsByTagName('img')[0].getAttribute('src')
    }

    string = string + '/(3)/' + items[i].getElementsByClassName('profile-public-item-price')[0].innerText;

    console.log(string);
}