var partida = { location: 'Go Green, Aguas, Bogota' };
var colegio = { location: 'Colegio Italiano Leonardo Da Vinci, Bogota' };
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

	for (i = -1; i < n; i++) {
		dist += respuestaAPI.routes[0].legs[i+1].distance.value;
	}

	return dist;
}

function calcularPorcentajeParadas(n) {
	return Math.trunc((distParcial(n)/totDist())*100) + "%";
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 4.66421, lng: -74.07861 },
		zoom: 16
	})

	var directionsService = new google.maps.DirectionsService();
	//DirectionsRenderer initialized

	let request = {
		origin: partida.location,
		destination: colegio.location,
		travelMode: 'DRIVING',
		waypoints: paradas
	};

	directionsService.route(request, function (result, status) {
		console.log(result);
		respuestaAPI = result;

		printReport(0);
		printReport(1);
		printReport(2);
		printReport(3);
		printReport(4);
		
		if (status == 'OK') {
			//directionsRenderer.setDirections(result);
		}
	}
	)
};

function print(message)
{
	if(document.getElementById("mensaje").innerHTML === "")
		document.getElementById("mensaje").innerHTML = document.getElementById("mensaje").innerHTML + "<br/>" + message;
	else
		document.getElementById("mensaje").innerHTML = document.getElementById("mensaje").innerHTML + "<br/><br/>" + message;
}

function darNombreParada(n)
{
	return respuestaAPI.routes[0].legs[n].end_address;
}

function printReport(n)
{
	print("La distancia hasta " + darNombreParada(n) + " es " + distParcial(n)/1000 + "km (" + calcularPorcentajeParadas(n) + ")");
}