$(document).ready(function() {
    $('input[type="checkbox"]').change(function() {
        var amenitiesChecked = [];
        $('input[type="checkbox"]:checked').each(function() {
            amenitiesChecked.push($(this).data('id'));
        });
        $('div.amenities h4').text(amenitiesChecked.join(', '));
    });
});
