'use strict'
async function getPlaces() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q","category","coordinate");
  return fetch("/search", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      q: query,
      category: category,
      coordinate: coordinate,
    })
  }).then(
    result => result.json()
  ).catch(
    err => console.error('Error:', err)
  )
}

window.addEventListener('DOMContentLoaded', async function () {
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

    imageElement.src = `images/places/${place.place_id}`;
    imageElement.classList.add('post-image');
    postElement.classList.add('post');
    postElement.textContent = place.name;

    postElement.appendChild(imageElement);
    contentContainer.appendChild(anchorElement);
    anchorElement.appendChild(postElement);
  }



  /*
  async function searchPlaces() {
    const searchInput = document.getElementById('searchInput');
    const categoryInput = document.getElementById('categoryInput');
    const minRatingInput = document.getElementById('minRatingInput');
    const resultsContainer = document.getElementById('resultsContainer');

    const query = searchInput.value;
    const category = categoryInput.value;
    const minRating = minRatingInput.value;

    const response = await fetch(`/search?query=${place.name}&category=${categories.name}&minRating=${reviews.rating}`);
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
  }*/




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
