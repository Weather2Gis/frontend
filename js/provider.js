/*
* Функция, которая по двум координатам и провайдеру возвращает
* JSON массов с данными погоды по каждой метеостанции
 */
function provider(provider_id, north_west_x, north_west_y, south_east_x, south_east_y, zoom, callback)
{
    var host = 'http://10.54.71.69/weather.php?r=weather/find&';
    var good_host = 'http://10.54.71.69?';
    var test_host = "http://weather7.apiary-mock.com/api/moscow";

    var good_url = good_host +
        'provider_id=' + provider_id + '&' +
        'north_west_x=' + north_west_x + '&' +
        'north_west_y=' + north_west_y + '&' +
        'south_east_x=' + south_east_x + '&' +
        'south_east_y=' + south_east_y + '&' +
        'zoom' + zoom;

    var url = host +
        'lon_top=' + north_west_x + '&' +
        'lat_top=' + north_west_y + '&' +
        'lon_bottom=' + south_east_x + '&' +
        'lat_bottom=' + south_east_y;

    $.ajax({
        dataType:       "jsonp",
        url:            test_host,
        async:          false,
        jsonp:          false,
        jsonpCallback:  "callback",
        success:  function(data)
        {
            callback(data);
        },
        error: function(data)
        {
            callback(data);
        }
    });

}