// This code is responsible for checking if the user is connected
// It will change the login button accordingly

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

async function func() {
	result = await getLogin();
	if (result)
	{
		loginElement.value = 'logout';
		formElement.method = 'GET';
		formElement.action = '/logout';
	}
}
func();
