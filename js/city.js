function provider(city){
	var city;
	var host = 'http://10.54.71.69/weather.php?r=weather/find&city='; 
	           // по окончанию загрузки страницы

    //??????//$.ajax("/plusOne.php",{},onAjaxSuccess);

    $.ajax({
        dataType: "jsonp",
        url:      "http://10.54.71.69/weather.php?r=weather/find&city=" + city,
        success:  function(data)
        {
            x=data.longitude;
            y=data.latitude;
           // Тут как-то возвращаем массив с данными.
        }
  		});
});