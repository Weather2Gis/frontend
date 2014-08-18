function getURL() {
    var u = new Url();
    u.query.a = "2";
    u.query.b = '3';
    console.log(u.toString());
    history.replaceState(1, "", "http://frontend/123123/1231231/13 ");
}



function setURL(center_longitude, center_latitude, zoom, city) {
    //getCenter()
    //getZoom()
    var newUrl = location.origin + '/center/' + center_longitude + ',' + center_latitude + '/zoom/' + zoom;

    if (city)
        newUrl += "/city/" + city;


    history.replaceState(1, "", newUrl);
}