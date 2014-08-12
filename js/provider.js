$(document).ready(function() {

});

function provider(provider_id, north_west_x, north_west_y, south_east_x, south_east_y, zoom)
{
    var url = 'http://backend/api/getJson?' +
       'provider_id=' + provider_id + '&' +
       'north_west_x=' + north_west_x + '&' +
       'north_west_y=' + north_west_y + '&' +
       'south_east_x=' + south_east_x + '&' +
       'south_east_y=' + south_east_y + '&' +
       'zoom=' + zoom;

    $.ajax({
        dataType: "json",
        url:      url,
        success:  function(data)
        {
            alert(data);
            /*
            $.each(data, function(num, provider)
            {

            });
            */
        }
    });
}