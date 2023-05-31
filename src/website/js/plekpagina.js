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
