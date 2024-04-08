$(document).ready(function() {
  const selected_Amenities = {};
  $('.amenities input[type="checkbox"]').change(function() {
    if (this.checked) {
      selected_Amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete selected_Amenities[$(this).data('id')];
    }
    const amenities_List = Object.values(selected_Amenities).join(', ');
    $('.amenities h4').text(amenities_List);
  });
  $('.locations input[type="checkbox"]').change(function() {
    if (this.checked) {
      selectedLocations[$(this).data('id')] = $(this).data('name');
    } else {
      delete selectedLocations[$(this).data('id')];
    }
    updateLocationsH4();
  });

  //api
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  //fetchselected filters
  function PlacesFilters() {
    const Filter = {
      amenities: Object.keys(selectedAmenities),
      states: Object.keys(selectedLocations).filter(id => id.startsWith('st')),
      cities: Object.keys(selectedLocations).filter(id => id.startsWith('ci'))
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(Filter),
      success: function(data) {
        $('.places').empty();
        data.forEach(function(place) {
          const Articl = $('<article>');
          $('.places').append(Articl);
        });
      }
    });
    function placerevi(data){
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/review/',
        type: 'GET',
        success: function(users) {
          let userdict = {};
          $(users).each (index, user)
            dictionaruser[user.id] = user;
        }
      });
    }
  }

  //selected filters
  $('button').click(PlacesFilters);
});
