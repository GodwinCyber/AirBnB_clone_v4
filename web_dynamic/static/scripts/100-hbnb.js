$(document).ready(function() {
  const selectedAmenities = {};
  const selectedLocations = {};

  function updateLocationsH4() {
    const locationsList = Object.values(selectedLocations).join(', ');
    $('.locations h4').text(locationsList);
  }

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

  $('.locations input[type="checkbox"]').change(function() {
    const locationId = $(this).data('id');
    const locationName = $(this).data('name');

    if (this.checked) {
      selectedLocations[locationId] = locationName;
    } else {
      delete selectedLocations[locationId];
    }

    updateLocationsH4();
  });

  // Request to the status API
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Function to fetch places with the selected filters
  function fetchPlacesWithFilters() {
    const filters = {
      amenities: Object.keys(selectedAmenities),
      states: Object.keys(selectedLocations).filter(id => id.startsWith('st')),
      cities: Object.keys(selectedLocations).filter(id => id.startsWith('ci'))
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(filters),
      success: function(data) {
        $('.places').empty();
        data.forEach(function(place) {
          const article = $('<article>');

          // ... code to create and append the article for each place ...

          $('.places').append(article);
        });
      }
    });
  }

  // When the button is clicked, make a POST request with the selected filters
  $('button').click(fetchPlacesWithFilters);
});
