$(document).ready(function() {
    let amenitiesChecked = {};
     $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            amenitiesChecked[$(this).data('id')] = $(this).data('name');
        } else {
            delete amenitiesChecked[$(this).data('id')];
        }
        let amenitiesList = Object.values(amenitiesChecked).join(', ');
        $('div.amenities h4').text(amenitiesList);
     })
     $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        }
        else {
            $('#api_status').removeClass('available');
        }
     })

      $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify({}), function(data) {
        $('.places').empty();
        $.each(data, function(index, place) {
            var article = '<article>';
            article += '<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>';
            article += '<div class="information">';
            article += '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>';
            article += '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>';
            article += '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>';
            article += '</div>';
            article += '<div class="description">' + place.description + '</div>';
            article += '</article>';
            $('.places').append(article);
        });
    }, 'json');

        $('button').click(function() {
        $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify({ amenities: Object.keys(amenitiesChecked) }), function(data) {
            $('.places').empty();
            $.each(data, function(index, place) {
                var article = '<article>';
                article += '<div class="title_box"><h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div></div>';
                article += '<div class="information">';
                article += '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>';
                article += '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>';
                article += '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>';
                article += '</div>';
                article += '<div class="description">' + place.description + '</div>';
                article += '</article>';
                $('.places').append(article);
            });
        }, 'json');
    });
})
