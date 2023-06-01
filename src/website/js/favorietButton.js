'use strict'
// cheack if users are connected before sending to the favoriete page

let buttonFavoriete = document.getElementById('favoriete');
let user_id = null;

async function getLogin(){
    return await fetch('/loggedIn').then(
		result =>  result.json()
	).catch(
		error => console.error('Error:', error)
	);
}


async function func() {
    user_id = await getLogin();
    if(user_id)
    {

       buttonFavoriete.addEventListener("click", function(){

        window.location.href = "/favoriete.html" +  `?id=${user_id}`
        console.log('click')

       });
        
    }
}
func();

