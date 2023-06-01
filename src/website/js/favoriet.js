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

      buttonElement.addEventListener("click", async () => {
		const urlParams = new URLSearchParams (this.window.location.search);
		const place_id = urlParams.get("place_id");
		const user_id = await getLogin();
		const result = user_id;

		if (result){

			buttonElement.action = '/deleteFavorite/user_id/:userId/place_id/:place_id';
			buttonElement.style.display = 'none';
		}
     
      })

		  imageElement.src = `images/places/${place.place_id}`;
		  imageElement.classList.add('post-image');
		  postElement.classList.add('post');
		  postElement.textContent = place.name;


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
