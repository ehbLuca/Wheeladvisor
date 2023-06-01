'use strict'
async function getPlaces(query, category, address) {

	return fetch("/search", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query, category, address,
		})
	}).then(
		result => result.json()
	).catch(
		err => console.error('Error:', err)
	)
}

window.addEventListener('DOMContentLoaded', async function () {
	const urlParams = new URLSearchParams(window.location.search);
	const query = urlParams.get("q");
	const category = urlParams.get("category");
	const address = urlParams.get("address");
	document.getElementById('zoek-query').value = query;
	document.getElementById('zoek-category').value = category;
	document.getElementById('zoek-address').value = address;
	var contentContainer = document.getElementById('contentContainer');

	let places = await getPlaces(query, category, address);

	for (let place of places) {
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
});

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
	console.log('click')
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async (position) => {

			const response = await fetch('/search-coordinates', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ coordinate: position.coords })
			});
			const data = await response.json();
		});
	}
})
