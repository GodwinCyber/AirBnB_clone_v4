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
  //api
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  //api
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function(data) {
      $('.places').empty();
      data.forEach(function(place) {
        const Artcl = $('<article>');
        const BlockTitle = $('<div>').addClass('title_box');
        BlockTitle.append($('<h2>').text(place.name));
        BlockTitle.append($('<div>').addClass('price_by_night').text('$' + place.price_by_night));
        const Info = $('<div>').addClass('information');
        Info.append($('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')));
        Info.append($('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '')));
        Info.append($('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')));
        const Discr = $('<div>').addClass('description').html(place.Discr);
        Artcl.append(BlockTitle);
        Artcl.append(Info);
        Artcl.append(Discr);
        $('.places').append(Artcl);
      });
    }
  });
  //button clicked
  $('button').click(function() {
    fetchPlaces(Object.keys(selectedAmenities));
  });
});
