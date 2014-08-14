function getCity(city, callback)
{
    var host = 'http://95.85.32.183/weather/getCC?city=' + city;

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
            callback("error");
        }
    });
}