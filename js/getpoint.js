DG.then(function () {
    var map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 13,
        "fullscreenControl" : false,
        "zoomControl" : false
    });
    $('.button_search').click(function(){

        var longitude = longitude;
        var latitude = latitude;
        var city = $("#findcity").val();
        getcity(city, function(data) {
//            console.log(data);
            map.panTo(DG.latLng(data[0].latitude, data[0].longitude));
            map.setZoom(11);
        })
    });
});
