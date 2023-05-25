const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchPlaces();
});
//Event Listener die 'searchPlaces' gaat aanspreken wanneer button wordt geklikt. 


async function searchPlaces() {

  const searchInput = document.getElementById('searchInput');
  const categoryInput = document.getElementById('categoryInput');
  const resultsContainer = document.getElementById('resultsContainer');

  const query = searchInput.value;
  const category = categoryInput.value;

  const response = await fetch(`/search?query=${query}&category=${category}`);
  const results = await response.json();

  resultsContainer.innerHTML = '';

//Gaat asynchrone HTTP-request zenden naar database met zoek queries als parameters
//Gaat resultaat assignen aan parameter 'response'

}
