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
		$('#realtor').append('<div class = "nombre keys"><br>'+data[i].nombre+'</div>');
		$('#realtor').append('<div class = "compañia keys">'+data[i].compañia+'</div>');
		$('#realtor').append('<div class = "telefono keys">'+data[i].telefono+'</div>');
		$('#realtor').append('<div class = "email keys">'+data[i].email+'</div><br>');

		var restUrlId = data[i]._id;
		$('#realtor').append(`<button class="foodButton" type="submit"><a data-id="${restUrlId}" href="/brokers/${restUrlId}/food">Agregar Propiedades</a></button><br>`);

		$('#realtor').append('<div class = "foodHeader keys">Listings: <br></div>');
		$('#realtor').append('<div class = "listings-test"></div>');


			for (var x = 0; x < data[i].foodLeft.length ; x++) {
				$('#realtor').append('<div class = "foodLeft"><div>'+data[i].foodLeft[x].nombreCasa+'</div><div>'+data[i].foodLeft[x].status+'</div><div>$'+data[i].foodLeft[x].precio+'</div>');
		};
	};
};

function onError(data) {
	console.log('ya dummy');
};
