/*
 * Функция, которая вытаскивает из url параметры center и zoom
 * Работает только с валидным url заданным функцией setURL
 * если не указать zoom или center пока не работает ;(
 */
function getUrlData() {

    var zoom, center = {};
    var path = location.pathname.replace(',', "%2C"); // Получаем ссылку после домена

    var regularExpressions =
        '.*?' + 	                            // Не считываем «/center/»
        '([+-]?\\d*\\.\\d+)(?![-+0-9\\.])' +    // Считываем первую координату
        '.*?' +	                                // Не считываем «%2C»
        '([+-]?\\d*\\.\\d+)(?![-+0-9\\.])' +	// Считываем сторую координату
        '.*?' +	                                // Не считываем «/zoom/»
        '(\\d+)';	                            // Считываем zoom

    var url_data = new RegExp(regularExpressions,["i"]).exec(path);

    if (url_data != null) {
        center[0]   = url_data[1];
        center[1]   = url_data[2];
        zoom        = url_data[3];
    } else {
        return undefined;
    }

    return { 'center': [center[0], center[1]], 'zoom': zoom };

}


/*
 * Функция, которая устанавливает url с параметрами center и zoom
 * если передан город, то устанавливаем и его
 * Работает через History API
 */
function setURL(center_longitude, center_latitude, zoom, city) {

    var newUrl = location.origin + '/center/' + center_longitude + '%2C' + center_latitude + '/zoom/' + zoom;

    if (city)
        newUrl += "/city/" + city;


    history.replaceState(1, "", newUrl);

}