// This code is responsible for checking if the user is connected
// It will change the login and favorite button accordingly

let formElement = document.getElementById('login-form');
let loginElement = document.getElementById('login');
let result = null;

async function getLogin() {
    return await fetch('/loggedIn').then(
		result =>  result.json()
	).catch(
		error => console.error('Error:', error)
	);
}

async function main() {
	let user_id = await getLogin();
	if (user_id)
	{
		loginElement.value = 'logout';
		formElement.method = 'GET';
		formElement.action = '/logout';
		let buttonFavoriete = document.getElementById('favoriete');
		if (buttonFavoriete)
			buttonFavoriete.addEventListener("click", function(){
				window.location.href = "/favoriete.html" + `?id=${user_id}`
				console.log('click')
			});
		loginElement.className = 'logged-in'
	} else {
		let buttonFavoriete = document.getElementById('favoriete');
		if (buttonFavoriete)
			buttonFavoriete.addEventListener("click", function(){
				window.location.href = "/login.html";
				console.log('click')
			});
		loginElement.className = 'logged-out'
	}
}

main();
