var partida = [{ location: 'Go Green, Aguas, Bogota' }];
var colegio = [{ location: 'Colegio Italiano Leonardo Da Vinci, Bogota' }];
var paradas = [
	{ location: "Parque Nacional Enrique Olaya Herrera, Bogota" },
	{ location: "Parque Gernika, Bogota" },
	{ location: "Basílica Menor Nuestra Señora de Lourdes, Bogota" },
	{ location: "Carulla Calle 102, Bogota" }
];
var respuestaAPI;

function totDist() {
	var dist = 0;

	for (i = 0; i < respuestaAPI.routes[0].legs.length; i++) {
		dist += respuestaAPI.routes[0].legs[i].distance.value;
	}

	return dist;
}

function distParcial(n) {
	var dist = 0;

	for (i = 0; i < n + 1; i++) {
		dist += respuestaAPI.routes[0].legs[i].distance.value;
	}
	var response = 'La distancia desde el parqueadero hasta ' + respuestaAPI.routes[0].legs[n].end_address + ' es ' + (dist / 1000) + 'km';

	return response;
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 4.66421, lng: -74.07861 },
		zoom: 16
	}
	)

	var directionsService = new google.maps.DirectionsService();
	//DirectionsRenderer initialized

	let request = {
		origin: partida[0].location,
		destination: colegio[0].location,
		travelMode: 'DRIVING',
		waypoints: paradas
	};

	directionsService.route(request, function (result, status) {
		console.log(result);
		respuestaAPI = result;
		console.log(totDist());
		console.log(distParcial(0));
		document.getElementById("mensaje").innerHTML = distParcial(0);
		if (status == 'OK') {
			//directionsRenderer.setDirections(result);
		}
	}
	)
};
