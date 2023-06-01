async function getLogin() {
    return await fetch('/loggedIn').then(
		result =>  result.json()
	).catch(
		error => console.error('Error:', error)
	);
}

/*Favorite button aanspreken*/
const favButton = document.querySelector('.favbutton');

favButton.addEventListener('click', async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const place_id = urlParams.get("id");
	const user_id = await getLogin();
/*Sends an HTTP POST request to the server with the current page URL as the payload*/
  fetch('/saveFavourite', {
    method: 'POST',
    body: JSON.stringify({place_id, user_id}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to save favorite');
    }
    alert('Page saved as favorite!');
  })
  .catch(error => {
    console.error(error);
    alert('Failed to save favorite');

  });
});

async function getPlace() {
	const urlParams = new URLSearchParams(window.location.search);
	const place_id = urlParams.get("id");
	return fetch("/getplace", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			place_id
		})
	}).then(
		result => result.json()
	).catch(
		err => console.error('Error:', err)
	)
}

function share() {
	if (navigator.share) {
		navigator.share({
			title: document.title,
			url: window.location.href
		})
			.then(() => console.log('Shared successfully'))
			.catch(error => console.error('Error sharing:', error));
	} else {
		console.warn('Web Share API not supported');
	}
}

window.addEventListener('DOMContentLoaded', async function () {
	let place = await getPlace();
	var map = L.map('map').setView([place.latitude, place.longitude], 13);
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
	var marker = L.marker([place.latitude, place.longitude]).addTo(map);
	console.log(place);
	document.querySelector('h1').textContent = place.name;
	document.querySelector('.description').textContent = place.description;
	document.querySelector('.address').textContent = place.address;
});

let share_button = document.getElementById("share-button")
share_button.addEventListener("click", share);
