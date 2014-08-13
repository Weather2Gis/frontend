DG.then(function () {
    var map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 13,
        "fullscreenControl" : false,
        "zoomControl" : false
    });

    // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('resize movestart viewreset', function (e) {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки

        var weather_data = provider(1, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1);
    });
});
