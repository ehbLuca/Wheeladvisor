const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  searchPlaces();
});
//Event Listener die 'searchPlaces' gaat aanspreken wanneer button wordt geklikt. 

async function searchPlaces() {
  const searchInput = document.getElementById('searchInput');
  const categoryInput = document.getElementById('categoryInput');
  const minRatingInput = document.getElementById('minRatingInput');
  const resultsContainer = document.getElementById('resultsContainer');
 
  const query = searchInput.value;
  const category = categoryInput.value;
  const minRating = minRatingInput.value;
 
  const response = await fetch(`/search?query=${query}&category=${category}&minRating=${minRating}`);
  const results = await response.json();
 
  resultsContainer.innerHTML = '';

  //Gaat asynchrone HTTP-request zenden naar database met zoek queries als parameters
  //Gaat resultaat assignen aan parameter 'response'

  if (results.length === 0) {
    resultsContainer.innerHTML = 'No results found.';
  } else {
    results.forEach(result => {
      const item = document.createElement('li');
      item.innerText = `${result.name} - ${result.category}`;
      resultsContainer.appendChild(item);
    });
  }
 //Gaat 'No results found' tonen als geen resultaten worden terug gegeven
 //Anders wordt lijst resultaten vertoont
}

