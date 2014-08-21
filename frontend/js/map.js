DG.then(function () {

    var markers = DG.featureGroup();
    var zoom_url, center_url;
    //getUrlData();

    var map = DG.map('map', {
        "center":               [54.98, 82.89],
        "zoom":                 10,
        "fullscreenControl" :   false,
        "zoomControl" :         false,
        "minZoom" :             4,
        "maxZoom" :             12,
        "maxBounds" :           DG.latLngBounds(DG.latLng(80.179, 23.906), DG.latLng(39.096, 190.898))
    });



    // Вешаем на событие «нажатие на кнопку поиска» обработчик
    // Получаем через API координаты по городу и перемещаем карту в это город
    $('.search__submit').bind('click', function() {
        var city = $(".search__input").val();

        getCity(city, function(data) {
            map.panTo(DG.latLng(data[0].latitude, data[0].longitude));
            map.setZoom(11);
        });
    });

    $('.search__input').bind('submit', function() {
        var city = $(".search__input").val();

        getCity(city, function(data) {
            map.panTo(DG.latLng(data[0].latitude, data[0].longitude));
            map.setZoom(11);
        });
    });


        // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('load resize movestart viewreset', function () {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки.

        provider(markers, 1, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1, function(data, markers) {
            var coordinates = [];

            markers.clearLayers();

            var myDivIcons = [];
            $.each(data, function(ws_num, ws_data) {
                coordinates[0] = ws_data.latitude;
                coordinates[1] = ws_data.longitude;

                function toHex(c){
                    var hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }

                var HEX = function(t){
                    t = t + 50;
                    var tone = 240;
                    var step = tone/20;
                    var r = tone;
                    var g = 0;
                    var b = tone;

                    for(i=0; i<t; i++){
                        if(r <= tone && g == 0 && b == tone) r-=step;
                        if(r == 0 && g <= tone && b == tone) g+=step;
                        if(r == 0 && g == tone && b >= 0) b-=step;
                        if(r <= tone && g == tone && b == 0) r+=step;
                        if(r == tone && g >= 0 && b == 0) g-=step;
                    }

                    return toHex(r) + toHex(g) + toHex(b);
                };

                myDivIcons[id = ws_data.temp+50] = DG.divIcon({
                    iconSize: [30, 30],
                    className: '',
                    html: '<div class="marker clickable cluster" style="border-top: 40px solid '+ '#'+ HEX(parseInt(ws_data.temp)) +';" tabindex="0">'+
                    '<div class="marker__temp">' + ws_data.temp + '&deg;</div></div>'
                });

                //console.log(ws_data);
                DG.marker(coordinates,{icon: myDivIcons[id = ws_data.temp+50]}).addTo(markers).bindPopup('<div class="cardWeather__city">' + ws_data.city + '</div>' +
                    '<div class="cardWeather__temp">' + ws_data.temp + '</div>' +
                    '<div class="cardWeather__info">Влажность: ' + ws_data.humidity +
                    '<br>Давление: ' + ws_data.pressure +
                    '<br>Скорость ветра: '+ ws_data.wind_speed + 'м.с' +
                    '<br>Направление ветра: ' + ws_data.wind_deg + '</div>');
            });

            markers.addTo(map);
        });
    });

});