'use strict'
async function getPlaces(query, category, adres) {

  return fetch("/search", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      category: category,
      adres: adres,
    })
  }).then(
    result => result.json()
  ).catch(
    err => console.error('Error:', err)
  )
}

window.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");
  const category = urlParams.get("category");
  const adres = urlParams.get("adres");
  document.getElementById('zoek').value = query;
  document.getElementById('zoek-category').value = category;
  var contentContainer = document.getElementById('contentContainer');
  // var isLoading = false;
  // var page = 1;

  // async function fetchData(page) {
  //   isLoading = true;

  let places = await getPlaces(query, category, adres);

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
