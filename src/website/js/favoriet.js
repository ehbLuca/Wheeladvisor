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


// to controle if user is logged in for deleting place from favourite
async function getLogin() {
    return await fetch('/loggedIn').then(
		result =>  result.json()
	).catch(
		error => console.error('Error:', error)
	);
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
		// desing for delete button
			var deleteElement = document.createElement('a');
     	  var buttonElement = document.createElement('button');
		  buttonElement.value = 'delete';
	  
		  let place_id = place.place_id;
		  let user_id = await getLogin();
		if (user_id){

			deleteElement.href = `/deleteFavorite/user_id/${user_id}/place_id/${place_id}`;
		}
     
		console.log(user_id, place_id);
 

		 
		  imageElement.classList.add('post-image');
		  postElement.classList.add('post');
		  postElement.textContent = place.name;
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

		
		postElement.appendChild(anchorElement);
		postElement.appendChild(deleteElement);
		deleteElement.appendChild(buttonElement);
		anchorElement.appendChild(imageElement);
		contentContainer.appendChild(postElement);
	}
});
