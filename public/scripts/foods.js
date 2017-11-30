

$(document).ready(function() {

  $("#addFood").on('click', function(e) {
    e.preventDefault();
    var signFood = {  nombreCasa: $('#nombreCasa').val(),
                      precio: $('#precio').val(),
                      status: $('#status').val(),
                    };
    var restaurantId = $('form').attr("data-rest-id");
    $.ajax({
      method: 'POST',
      url: `/api/restaurants/${restaurantId}/food`,
      data: signFood,
      success: onSuccess,
      error: onError
    });
    function onSuccess(signfood) {
      console.log('ya casi');
      console.log(status);
      console.log(signfood);
    };

    function onError(json) {
      $('#errorText').append('that food already exist, type something different you dummy!');
      console.log('ya dummy' + json);
    };
  });
});
