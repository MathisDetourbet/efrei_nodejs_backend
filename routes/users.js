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
			res.status(200);
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
		res.status(200);
		res.send('User with id ' + id + 'deleted');
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
	})
});

router.put('/:id', function(req, res, next) {
	var id		 	= parseInt(req.params.id);
	var name 		= req.body.name;
	var email		= req.body.email; 
	var alliance_id	= req.body.alliance_id; 

	console.log("Name : "+name+" Email : "+email+" AllianceID : "+alliance_id); 

	if (name === undefined || email === undefined || alliance_id === undefined) {
		res.status(422);
		res.send('One or more textfield are undefined');

	} else {
		UserDAO.updateById(id, name, email, alliance_id)
		.then((user) => {
			res.status(200);
			res.json(user);
		})
		.catch((error) => {
			res.status(422);
			res.send(error);
		})
	}
})

module.exports = router;
