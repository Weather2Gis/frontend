function getcity(city, callback)
{
	var test_host = 'http://weather7.apiary-mock.com/api/' + city;
	           // по окончанию загрузки страницы


        $.ajax({
            dataType: "jsonp",
            url:      test_host,
            async:      false,
            jsonp:      false,
            jsonpCallback: "callback",
            success:  function(data)
            {
                callback(data);
            },
            error: function(data)
            {
                callback(err);
            }
        });
}