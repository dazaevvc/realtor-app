$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/api/restaurants',
    dataType: 'json',
    data: '',
    success: onSuccess,
    error: onError
  });
});

function onSuccess(data) {
  console.log(data);
  for (var i = 0; i < data.length ; i++) {
     for (var x = 0; x < data[i].foodLeft.length ; x++) {
       $('#main').append('<div class = "foodLeft1">Casa en '+data[i].foodLeft[x].nombreCasa+' en $'+data[i].foodLeft[x].precio+' pesos en estado de '+data[i].foodLeft[x].status+'</div>');
    };

  };
}

  function onError(data) {
  console.log('ya dummy');
};
