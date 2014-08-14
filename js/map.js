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

    var markers = DG.featureGroup();

    // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('resize movestart viewreset', function (e) {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки

        provider(markers, 1, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1, function(data, markers) {
            markers.clearLayers();

            var coordinates = [];
            coordinates[0] = 54.98 + Math.random();
            coordinates[1] = 82.89 + Math.random();
            DG.marker(coordinates).addTo(markers);

            markers.addTo(map);
        });
    });
});
