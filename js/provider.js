/*
 * Функция возвращает в функцию callback данные в json, которые получены через API
 * Возвращает массиов с данными погоды по каждой метеостанции
 * Передаем провайдера, две координаты и зум
 * Если что-то пойдет не так, то вернет undefined
 * В host должна быть ссылка на метод API
 */
function provider(markers, provider_id, north_west_x, north_west_y, south_east_x, south_east_y, zoom, callback)
{
    /*/
    var host = 'http://95.85.32.183/10.54.71.69/weather/find?';

    var url = host +
        'provider_id=' + provider_id + '&' +
        'north_west_x=' + north_west_x + '&' +
        'north_west_y=' + north_west_y + '&' +
        'south_east_x=' + south_east_x + '&' +
        'south_east_y=' + south_east_y + '&' +
        'zoom' + zoom;
    /**/

    var host = 'http://localhost/backend/?r=weather/find&'

    var url = host +
        'pr=' + provider_id + '&' +
        'lon_top=' + north_west_x + '&' +
        'lat_top=' + north_west_y + '&' +
        'lon_bottom=' + south_east_x + '&' +
        'lat_bottom=' + south_east_y + '&' +
        'zoom' + zoom;

    $.ajax({
        dataType:       "jsonp",
        url:            url,
        async:          false,
        jsonp:          false,
        jsonpCallback:  "callback",
        success:  function(data)
        {
            callback(data,markers);
        },
        error: function(data)
        {
            callback(data, markers);
        }
    });

}