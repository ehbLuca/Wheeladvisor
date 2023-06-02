`strict use`

async function getPlaces() {
	const urlParams = new URLSearchParams(window.location.search);
	const user_id = urlParams.get("id");
	return fetch("/mostFavorite", {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		},
	}).then(
		result => result.json()
	)
}



window.addEventListener('DOMContentLoaded', async function() {
	var contentContainer = document.getElementById('contentContainer');

	let place = await getPlaces();

	console.log(place)
		
		var anchorElement = document.createElement('a');
		var titelElement = document.createElement('h3');
		
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
		titelElement.innerText = "Aanbeveling";


		
		postElement.appendChild(titelElement);
		postElement.appendChild(imageElement);
		contentContainer.appendChild(anchorElement);
		anchorElement.appendChild(postElement);
	
});

    
    



