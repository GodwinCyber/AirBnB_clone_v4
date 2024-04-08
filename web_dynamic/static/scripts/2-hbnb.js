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
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
