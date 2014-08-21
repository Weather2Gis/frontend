function setSidebar(city, callback) {
    var host = 'http://localhost/frontend/?r=weather/forecast&city='+ city +'&=ya';

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
        error: function(data)
        {
            callback(data);
        }
    });
}



DG.then(function () {
    var markers = DG.featureGroup();
    var urlData = getUrlData();

    toggleMenu(getProviderCookie());

    var map = DG.map('map', {
        "fullscreenControl" :   false,
        "zoomControl" :         false,
        "minZoom" :             4,
        "maxZoom" :             14,
        "maxBounds" :           [[80.179, 23.906], [39.096, 190.898]]
    });

    map.on('load', function () { refreshData(); });

    if (urlData)
        map.setView(urlData.center, urlData.zoom);
    else
        map.setView([54.98, 82.89], 10);

    // Вешаем на собития перемещения карты, изменения зума и изменения размера окна подгрузку новых данных
    map.on('resize movestart viewreset', function () { refreshData(); });



    // Вешаем на событие «нажатие на кнопку поиска» обработчик
    // Получаем через API координаты по городу и перемещаем карту в это город
    $('.search__submit').bind('click', function() {
        var city = $(".search__input").val();

        getCity(city, function(data) {
            map.panTo(DG.latLng(data[0].latitude, data[0].longitude));
            map.setZoom(11);
            refreshData();
        });
    });

    $(".search__input").keypress(function(event) {
        if( event.keyCode == 13 ) {
            var city = $(".search__input").val();

            if (city != '') {
                getCity(city, function(data) {
                    map.panTo(DG.latLng(data[0].latitude, data[0].longitude));
                    map.setZoom(11);
                    refreshData();
                });
            }
        }
    });

    $('.selectors__button').click(function() {
        var provider = this.id;

        toggleMenu(provider);

        setProviderCookie(provider);
        refreshData();
    });




    function refreshData() {
        var current_map_position = map.getBounds();
        var north_west = current_map_position.getNorthWest(); // Получаем координаты левой верхней точки
        var south_east = current_map_position.getSouthEast(); // Получаем координаты правой нижней точки
        var center_latitude = map.getCenter().lat;
        var center_longitude = map.getCenter().lng;
        var zoom = map.getZoom();

        setURL(center_latitude, center_longitude, zoom);

        var selectedProvider = $('._selected').attr('id') || getProviderCookie() || "ya";

        provider(markers, selectedProvider, north_west.lng, north_west.lat, south_east.lng, south_east.lat, 1, function(data, markers) {
            var coordinates = [];
            var myDivIcons = [];
            var old_markers = $.extend(true, {}, markers);
            var newMarkers = new DG.LayerGroup();
            newMarkers.clearLayers();

            var deletedMarkers = new DG.LayerGroup();
            deletedMarkers.clearLayers();

            var addedMarkers = new DG.LayerGroup();
            addedMarkers.clearLayers();

            markers.clearLayers();

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

                DG.marker(coordinates, {icon: myDivIcons[id = ws_data.temp+50]}).addTo(markers).on('click', function() {
                    $('#cards_city').empty().append($('#template_box_city').clone().html().replace("%city%", ws_data.city));
                    $('#cards').empty();
                    setSidebar(ws_data.city, function(data) {
                        for(i=0; i<4; i++) {
                            $('#cards').append($('#template_box').clone().html()
                                .replace("%partofday%", data[i].partofday)
                                .replace("%temp%", data[i].temp)
                                .replace("%humidity%", data[i].humidity)
                                .replace("%pressure%", data[i].pressure)
                                .replace("%wind_speed%", data[i].wind_speed));
                        }
                    });
                });
            });

            /*$.each(markers.getLayers(), function(m_num, m_data) {
                var coord = m_data.getLatLng();
                $.each(old_markers.getLayers(), function(om_num, om_data) {
                    if ( m_data.getLatLng().equals(om_data.getLatLng()) ) {
                        newMarkers.addLayer(m_data); // Тут маркерые, которые уже есть на экране
                    }
                });
            });

            $.each(markers.getLayers(), function(m_num, m_data) {

             var flag_add = true;

             $.each(newMarkers.getLayers(), function(n_num, n_data) {
             if ( m_data.getLatLng().equals(n_data.getLatLng()) ) {
             flag_add = false;
             }
             });

             if (flag_add) {
             addedMarkers.addLayer(m_data);
             }

             });

//            console.log(newMarkers.getLayers());
//            console.log(markers.getLayers());

            if ( newMarkers.getLayers() != false) {
                //console.log(newMarkers.getLayers());
                $.each(newMarkers.getLayers(), function(n_num, n_data) {
                    var flag_deleted = true;

                    $.each(markers.getLayers(), function(m_num, m_data) {
                        if ( n_data.getLatLng().equals(m_data.getLatLng()) ) {
                            flag_deleted = false;
                        }
                    });

                    if (flag_deleted) {
                        deletedMarkers.addLayer(n_data);
                    }

                });
            }
            else {
                $.each(markers.getLayers(), function(m_num, m_data) {
                    deletedMarkers.addLayer(m_data);
                });
            }*/




            /*
             addLayer( <ILayer> layer )	this	Добавляет указанный слой в группу.
             removeLayer( <ILayer> layer | <String> id )	this	Удаляет указанный слой из группы.
             hasLayer( <ILayer> layer )
             */
            //console.log(deletedMarkers.getLayers());

            //console.log("  ");

            markers.addTo(map);
        });
    }


    function toggleMenu(provider) {
        $('._selected').toggleClass('_selected');
        $('#' + provider).toggleClass('_selected');
    }

});
