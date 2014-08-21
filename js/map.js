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

            markers.clearLayers();

            $.each(data, function(ws_num, ws_data) {
                coordinates[0] = ws_data.latitude;
                coordinates[1] = ws_data.longitude;

                id = ws_data.temp+50;

                //Функция для преобразования из RGB в HEX
                function toHex(c){
                    var hex = c.toString(16);
                    return hex.length == 1 ? "0" + hex : hex;
                }

                //Динамическое изменение цвета маркера в зависимости от температуры
                var RGB = function(t)
                {
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
                    return [r, g, b];
                };

                //Инверсия цвета текста отображаемой на маркере температуры
                var invTextColor = function(r, g, b){
                    return "#" + toHex(Math.abs(r-255)) + toHex(Math.abs(g-255)) + toHex(Math.abs(b-255));
                };

                myDivIcons[id] = DG.divIcon({
                    iconSize: [30, 30],
                    className: '',
                    html: '<div id="triangle" class="clickable" style="border-top: 40px solid rgb('+
                        $rgb[0] + ',' + $rgb[1] + ',' + $rgb[2] + '); ' +
                        'color:'+invTextColor($rgb[0],$rgb[1],$rgb[2])+';" tabindex="0">'+
                        '<div id="circle" style="background: rgb('+
                        $rgb[0] + ',' + $rgb[1] + ',' + $rgb[2] + ');"></div>' +'<div class="marker__temp">'+ ws_data.temp + '&deg;</div></div>'
                });


                DG.marker(coordinates, {icon: myDivIcons[id]}).addTo(markers).on('click', function() {
                    $('#card__city').empty().append($('#template_box_city').clone().html().replace("%city%", ws_data.city));
                    $('#card__weather').empty();

                    setSidebar(ws_data.city, selectedProvider,function(data) {
                        for(i=0; i<4; i++) {
                            $('#template_box').children().attr("id", "box-" + i);
                            $('#card__weather').append($('#template_box').clone().html()
                                .replace("%partofday%", partOfDay[data[i].partofday])
                                .replace("%temp%", data[i].temp)
                                .replace("%humidity%", data[i].humidity)
                                .replace("%pressure%", data[i].pressure)
                                .replace("%wind_speed%", data[i].wind_speed));

                            $('#box-' + i + '>.card__icon>img').attr('src', '/frontend/src/card/' + typeWeather[data[i].precipitation]);
                            $('#box-' + i + ' .wind_deg').attr('src', '/frontend/src/card/' + windDeg[data[i].wind_deg]);
                        }
                    });

                });
            });

            markers.addTo(map);
        });
    }



    function toggleMenu(provider) {
        $('._selected').toggleClass('_selected');
        $('#' + provider).toggleClass('_selected');
    }



    function setSidebar(city, provider, callback) {

        var host = 'http://localhost/backend/?r=weather/forecast&city='+ city +'&pr=' + provider;

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

});
