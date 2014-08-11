var map;

DG.then(function () {
    map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 13,
        "fullscreenControl" : false,
        "zoomControl" : false
    });

    //DG.marker([54.93454, 82.78009]).addTo(map);
    DG.marker([54.93454, 82.99982]).addTo(map);

    var temp = map.getBounds();
    var a = temp.getNorthWest(); // Левая верхняя точка
    var b = temp.getSouthEast(); // Правая нижняя точка
    });