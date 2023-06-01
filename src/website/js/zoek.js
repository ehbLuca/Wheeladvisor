'use strict'
async function getPlaces() {
	const urlParams = new URLSearchParams(window.location.search);
	const query = urlParams.get("q");
	return fetch("/search", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			q: query
		})
	}).then(
		result => result.json()
	).catch(
		err => console.error('Error:', err)
	)
}

window.addEventListener('DOMContentLoaded', async function() {
	var contentContainer = document.getElementById('contentContainer');

	let places = await getPlaces();

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

  const submitBtn = document.getElementById('submit-btn');

  submitBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = { latitude, longitude };
      });
    }
  });

  console.log(coordinates);
  


  // isLoading = false;
  // page++;
  // }

  // function isScrollAtBottom() {
  // var windowHeight = window.innerHeight;
  // var documentHeight = document.documentElement.scrollHeight;
  // var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // return (windowHeight + 50 + scrollTop >= documentHeight);
  // }

  // window.addEventListener('scroll', function() {
  // if (!isLoading && isScrollAtBottom()) {
  // fetchData(page);
  // }
  // });

  // // Initial data fetching
  // fetchData(page);
});
