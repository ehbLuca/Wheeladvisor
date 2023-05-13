const express = require('express');
const path = require('path');

let app = express();
let port = 3000;

app.get('/', (req, res) => {
	res.redirect('/index.html')
});

app.use('/', express.static(path.join(__dirname, 'website')))

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
