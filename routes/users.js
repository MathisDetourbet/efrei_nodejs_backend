var express = require('express');
var router = express.Router();
const UserDAO = require('../models/UserDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	UserDAO.getAll()
	.then((users) => {
		res.send(users);
	});
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	UserDAO.getById(id)
	.then((user) => {
		res.send(user);
	});
});

router.post('/', function(req, res, next) {
	var username 	= req.body.username;
	var email		= req.body.email;

	if ((username === undefined) || (email === undefined)) {
		res.status(422);
		res.send('username or email is invalid.');

	} else {
		UserDAO.create(username, email)
		.then((result) => {
			res.status(201);
			res.json(result);
		})
		.catch((error) => {
			res.status(500);
			res.send(error);
		})
	}
});

router.delete('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	UserDAO.deleteById(id)
	.then(() => {
		res.status(201);
		res.send('User with id ' + id + 'deleted');
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
	})
});

router.put('/:id', function(req, res, next) {
	var idParams 	= parseInt(req.params.id);
	var idBody		= parseInt(req.body.id);
	var name 		= req.body.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined');

	} else if (idParams !== idBody) {
		res.status(422);
		res.send('Param ID is not equal to the body ID.');

	} else {
		UserDAO.updateById(id, username, email)
		.then((user) => {
			res.status(201);
			res.json(user);
		})
		.catch((error) => {
			res.status(422);
			res.send(error);
		})
	}
})

module.exports = router;
