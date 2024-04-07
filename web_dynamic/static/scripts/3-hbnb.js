$(document).ready(function() {
  const selectedAmenities = {};

  $('.amenities input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  // Request to the status API
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Request to the places_search API
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(data) {
      $('.places').empty();
      data.forEach(function(place) {
        const article = $('<article>');

        const titleBox = $('<div>').addClass('title_box');
        titleBox.append($('<h2>').text(place.name));
        titleBox.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));

        const information = $('<div>').addClass('information');
        information.append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
        information.append($('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
        information.append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));

        const description = $('<div>').addClass('description').html(place.description);

        article.append(titleBox);
        article.append(information);
        article.append(description);

        $('.places').append(article);
      });
    }
  });
});
