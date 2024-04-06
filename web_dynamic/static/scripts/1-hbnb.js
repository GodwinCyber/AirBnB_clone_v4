$(document).ready(function() {
  const selected_Amenities = {};
  $('.amenities input[type="checkbox"]').change(function() {
    const amenity_Id = $(this).data('id');
    const amenity_Name = $(this).data('name');
    if (this.checked) {
      selected_Amenities[amenity_Id] = amenity_Name;
    } else {
      delete selected_Amenities[amenity_Id];
    }
    const amenities_List = Object.values(selected_Amenities).join(', ');
    $('.amenities h4').text(amenities_List);
  });
});
