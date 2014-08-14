DG.then(function () {
    var southWest = DG.latLng(80.179, 23.906),
        northEast = DG.latLng(39.096, 190.898),
        bounds = DG.latLngBounds(southWest, northEast);

    var map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 10,
        "fullscreenControl" : false,
        "zoomControl" : false,
        "minZoom" : 4,
        "maxZoom" : 12,
        "maxBounds" : bounds
    });


    // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('resize movestart viewreset', function (e) {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки

        var weather_data = provider(1, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1, function(data) {
            console.log(data);
        });
    });
});
