DG.then(function () {

    var markers = DG.featureGroup();

    var map = DG.map('map', {
        "center":               [54.98, 82.89],
        "zoom":                 10,
        "fullscreenControl" :   false,
        "zoomControl" :         false,
        "minZoom" :             4,
        "maxZoom" :             12,
        "maxBounds" :           DG.latLngBounds(DG.latLng(80.179, 23.906), DG.latLng(39.096, 190.898))
    });

    /*var markers = DG.featureGroup(), markers_1 = DG.featureGroup(),
     coordinates_1 = [], coordinates = [];

     for (i = 0; i < 100; i++) {
     coordinates[0] = 54.98 + Math.random();
     coordinates[1] = 82.89 + Math.random();
     DG.marker(coordinates).addTo(markers);
     }

     var new_data, old_data;

     var markers_old = DG.featureGroup(),
     markers_1 = DG.featureGroup(),
     coordinates_1 = [],
     coordinates = [];

     DG.marker(coordinates).addTo(markers_old);
     markers_old.removeFrom(map);

     markers.addTo(map);

     document.getElementById("hide").onclick = hideMarkers;
     document.getElementById("show").onclick = showMarkers;
     $.each(data, function(ws_num, ws_data) {
     // Вот тут добавляем маркеры на слой и добавляем их к карте
     });
     map.fitBounds(markers.getBounds());*/



    // Вешаем на событие «нажатие на кнопку поиска» обработчик
    // Получаем через API координаты по городу и перемещаем карту в это город
    $('.search__submit').bind('click', function() {
        var city = $(".search__input").val();

        getCity(city, function(data) {
            map.panTo(DG.latLng(data.latitude, data.longitude));
            map.setZoom(11);
        });
    });

    $('.search__input').bind('submit', function() {
        var city = $(".search__input").val();

        getCity(city, function(data) {
            map.panTo(DG.latLng(data.latitude, data.longitude));
            map.setZoom(11);
        });
    });



    // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('load resize movestart viewreset', function () {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки

        provider(markers, 1, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1, function(data, markers) {
            var coordinates = [];
            markers.clearLayers();

            $.each(data, function(ws_num, ws_data) {
                coordinates[0] = ws_data.latitude;
                coordinates[1] = ws_data.longitude;
                //console.log(ws_data);
                DG.marker(coordinates).addTo(markers).bindPopup('<div class="cardWeather__city">' + ws_data.city + '</div>' +
                    '<div class="cardWeather__temp">' + ws_data.temp + '</div>' +
                    '<div class="cardWeather__info">Влажность: ' + ws_data.humidity +
                    '<br>Давление: ' + ws_data.pressure +
                    '<br>Скорость ветра: '+ ws_data.wind_speed + 'м.с' +
                     '<br>Направление ветра: ' + ws_data.wind_deg + '</div>').bindLabel(ws_data.temp, {
                    'static': false
                });
            });

            markers.addTo(map);
        });
    });

});
