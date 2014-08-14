/*
* Функция, которая по двум координатам и провайдеру возвращает
* JSON массов с данными погоды по каждой метеостанции
 */
function provider(markers, provider_id, north_west_x, north_west_y, south_east_x, south_east_y, zoom, callback)
{
    var host = 'http://95.85.32.183/weather/find?';

    var url = host +
        'provider_id=' + provider_id + '&' +
        'north_west_x=' + north_west_x + '&' +
        'north_west_y=' + north_west_y + '&' +
        'south_east_x=' + south_east_x + '&' +
        'south_east_y=' + south_east_y + '&' +
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