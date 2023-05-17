const express = require('express');
const path = require('path');

let app = express();
let port = 3000;

app.get('/', (req, res) => {
	res.redirect('/index.html')
});

app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, 'website')))

// route for logging in
// expects an email and password
app.post('/login', async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let result = await loginUser([email, password])
	if (result)
	{
		res.redirect('/login.html');
	} else {
		res.redirect('/login-error.html')
	}
});

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
