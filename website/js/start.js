`use strict`
document.getElementById("zoek").addEventListener("submit", function(event){
    event.preventDefault();

    let zoekwoord = document.getElementById("search").value

    console.log(zoekwoord)
    window.location.href = "searches.html?search=" + encodeURIComponent(zoekword.value);

})
