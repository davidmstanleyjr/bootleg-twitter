const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Bootleg Tweets!'
	});
});

function isValidMew(mew) {
	return mew.name && mew.name.toString().trim() !== '' && mew.content && mew.content.toString().trim() !== '';
}

app.post('/mews', (req, res) => {
	if (isValidMew(req.body)) {
		//this gets inserted into a database.
	} else {
		res.status(422);
		res.json({
			message: 'Name and Content are required.'
		});
	}
});

app.listen(5000, () => {
	console.log('Listening on http://localhost:5000');
});
