/*
 * Функция возвращает в функцию callback данные в json, которые получены через API
 * Получает координаты передаваемого города
 * Если что-то пойдет не так, то вернет undefined
 * В host должна быть ссылка на метод API
 */
function getCity(city, callback)
{

    var host = 'http://95.85.32.183/weather/getCC?city=' + city;

    host = 'http://localhost/backend/?r=weather/find&pr=ya&city=' + city;

    $.ajax({
        dataType:       "jsonp",
        url:            host,
        async:          false,
        jsonp:          false,
        jsonpCallback:  "callback",
        success:  function(data)
        {
            callback(data);
        },
        error: function()
        {
            callback(undefined);
        }
    });

}