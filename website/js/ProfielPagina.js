console.log("Test");

/*Favorite button aanspreken*/
const favButton = document.querySelector('.favbutton');

favButton.addEventListener('click', () => {
/*Sends an HTTP POST request to the server with the current page URL as the payload*/
  fetch('/favorites', {
    method: 'POST',
    body: JSON.stringify({url: window.location.href}),
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






