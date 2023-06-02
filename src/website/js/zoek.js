'use strict'
async function searchPlaces(query, category, address) {
	return fetch("/search", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			q: query, category, address,
		})
	}).then(
		result => result.json()
	).catch(
		err => console.error('Error:', err)
	)
}

async function createPlaces(places)
{
	var contentContainer = document.getElementById('contentContainer');
	contentContainer.innerHTML = ''

	for (let place of places) {
		console.log("logging")
		console.log(place)
		var anchorElement = document.createElement('a');
		var postElement = document.createElement('div');
		var imageElement = document.createElement('img');
		let fileURL = `images/places/${place.place_id}`;
		let imageExist = await fetch (fileURL, { method: 'HEAD' })
			.then(response => {
				return response.ok; // Returns true if the file exists, false otherwise
			})
			.catch(() => {
				return false; // Error occurred, file does not exist
			});

		if (imageExist) 
			imageElement.src = fileURL;
		else
			imageElement.src = 'images/fallbackfoto.png';
		anchorElement.href = `plekpagina.html?id=${place.place_id}`
		imageElement.classList.add('post-image');
		postElement.classList.add('post');
		postElement.textContent = place.name;

		postElement.appendChild(imageElement);
		contentContainer.appendChild(anchorElement);
		anchorElement.appendChild(postElement);
	}
}

async function findNearestPlace(position) {
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;

	const data = {
		latitude: latitude,
		longitude: longitude
	};

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	let places =  await fetch('/search-coordinates', requestOptions)
		.then(
			response => response.json()
		)
		.catch(
			err => console.error('Error:', err)
		)
	createPlaces(places);
}

window.addEventListener('DOMContentLoaded', async function () {
	const urlParams = new URLSearchParams(window.location.search);
	const query = urlParams.get("q");
	const category = urlParams.get("category");
	const address = urlParams.get("address");
	document.getElementById('zoek-query').value = query;
	document.getElementById('zoek-category').value = category;
	document.getElementById('zoek-address').value = address;
	let places = await searchPlaces(query, category, address);
	createPlaces(places)
});

function handleError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
	}
}

const submitBtn = document.getElementById('submit-btn');
submitBtn.addEventListener('click', function(event) {
	event.preventDefault();

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(findNearestPlace, handleError);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
});
