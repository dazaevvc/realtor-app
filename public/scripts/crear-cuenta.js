
$(document).ready(function() {

  $("#addRest").on('click', function(e) {

    e.preventDefault();
    var signRest = {  nombre: $('#nombre').val(),
                      compañia: $('#compañia').val(),
                      telefono: $('#telefono').val(),
                      email: $('#email').val(),
                  };
    $.ajax({
      method: 'POST',
      url: '/api/restaurants',
      data: signRest,
      success: onSuccess,
      error: onError
    });
  });
});

function onSuccess(signRest) {
	console.log(signRest);
  $(signRest).val('');
};

function onError(json) {
  $('#errorText').append('Error: Usuario ya existe.');
};
