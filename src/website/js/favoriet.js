'use strict'

async function getPlaces() {
	const urlParams = new URLSearchParams(window.location.search);
	const user_id = urlParams.get("id");
	return fetch("/favourite", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user_id
		})
	}).then(
		result => result.json()
	).catch(
		err => console.error('Error:', err)
	)
}

window.addEventListener('DOMContentLoaded', async function() {
<<<<<<< HEAD
  var contentContainer = document.getElementById('contentContainer');
  // var isLoading = false;
  // var page = 1;
  
  // async function fetchData(page) {
  //   isLoading = true;
        
      let places = await getPlaces();
 
	  for (let place of places) {
		  console.log(place)
		  var anchorElement = document.createElement('a');
		  var postElement = document.createElement('div');
		  var imageElement = document.createElement('img');
      var buttonElement = document.createElement('button');

      buttonElement.addEventListener("click", async function (){
        
      })
		  imageElement.src = `images/places/${place.place_id}`;
		  imageElement.classList.add('post-image');
		  postElement.classList.add('post');
		  postElement.textContent = place.name;
=======
	var contentContainer = document.getElementById('contentContainer');
	let places = await getPlaces();
	if (!places)
		return

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
>>>>>>> 44e7cedbdead13f830f95338c64f69d60119690e

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
