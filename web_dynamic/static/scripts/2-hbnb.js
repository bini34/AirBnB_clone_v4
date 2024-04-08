$(document).ready(function() {
    $('input[type="checkbox"]').change(function() {
        var amenitiesChecked = [];
        $('input[type="checkbox"]:checked').each(function() {
            amenitiesChecked.push($(this).data('id'));
        });
        $('div.amenities h4').text(amenitiesChecked.join(', '));
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});
