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
});
