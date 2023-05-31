'use strict'

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

        
       

       });
        
    }
}

func();