/*
 * Функция возвращает в функцию callback данные в json, которые получены через API
 * Возвращает массиов с данными погоды по каждой метиостанции
 * Передаем провайдера, две координаты и зум
 * Если что-то пойдет не так, то вернет undefined
 * В host должна быть ссылка на метод API
 */
function provider(markers, provider_id, north_west_x, north_west_y, south_east_x, south_east_y, zoom, callback)
{

    /*/
    var host = 'http://95.85.32.183/weather/find?';

    var url = host +
        'provider_id=' + provider_id + '&' +
        'north_west_x=' + north_west_x + '&' +
        'north_west_y=' + north_west_y + '&' +
        'south_east_x=' + south_east_x + '&' +
        'south_east_y=' + south_east_y + '&' +
        'zoom' + zoom;
    /**/

    host = 'http://localhost/backend/?r=weather/find&lon_top=82.560544&lat_top=55.174534&lon_bottom=83.318972&lat_bottom=54.843024'

    url = host +
        'provider_id=' + provider_id + '&' +
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