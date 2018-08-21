function translate(text) {

    let translation = {};
    translation['Элементы питания'] = 'cells';
    translation['Готовые аккумуляторы'] = 'batteries';
    translation['BMS платы и компоненты'] = 'bms';
    translation['Комплектующие для электротранспорта'] = 'components';
    translation['Корзина'] = 'cart';
    translation[''] = '';

    // console.log(Object.keys(translation))

    if (Object.keys(translation).includes(text))

        return translation[text];

    else
        return text;
}