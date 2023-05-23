`use strict`


document.getElementById("zoek").addEventListener("submit", function(event){
    event.preventDefault();

    let zoekword = document.getElementById("search")

    console.log(zoekword.value)

    
    
    window.location.href = "searches.html?search=" + encodeURIComponent(zoekword.value);

    /*fetch().then (response => {
        if (response.ok){
            return response.text();
        }else{
            throw new ("Error: " + response.status);
        }
    }).then(result => {
        console.log (result);
         window.location.href = "searches.html" + encodeURIComponent(result);
        console.log(result);
    }).catch(error =>{
        console.error(error);
    })*/

   

})
