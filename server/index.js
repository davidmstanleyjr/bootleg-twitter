const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/meower');
const mews = db.get('mews');

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

		const mew = {
			name: req.body.name.toString(),
			content: req.body.content.toString(),
			created: new Date()
		};

		mews.insert(mew).then((createdMew) => {
			res.json(createdMew);
		});
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
