function getcity(city, callback)
{
	//var host = 'http://weather7.apiary-mock.com/api/' + city;
    var host = 'http://10.54.71.69/weather.php?r=weather/find&city=' + city;
	           // по окончанию загрузки страницы


        $.ajax({
            dataType: "jsonp",
            url:      host,
            async:      false,
            jsonp:      false,
            jsonpCallback: "callback",
            success:  function(data)
            {
                callback(data);
            },
            error: function(data)
            {
                console.error(err);
            }
        });
}