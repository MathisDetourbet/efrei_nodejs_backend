var express = require('express');
var router = express.Router();
const AlliancesDAO = require('../models/AlliancesDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	AlliancesDAO.getAll()
	.then((alliances) => {
		res.status(200);
		res.send(alliances);
	})
	.catch((error) => {
		res.status(500); 
		res.send(error); 
	})
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	AlliancesDAO.getById(id)
	.then((alliance) => {
		res.status(200);
		res.send(alliance);
	})
	.catch((error) => {
		res.status(500); 
		res.send(error); 
	})
});

router.get('/:id/users', function(req, res, next) {
	var id = parseInt(req.params.id); 

	AlliancesDAO.getUsersByAlliance(id)
	.then((users) => {
		res.status(200);
		res.send(users);
	})
	.catch((error) => {
		res.status(500); 
		res.send(error); 
	})
});

<<<<<<< HEAD
router.get('/:id/characters/:class', function(req, res, next) {
	var id = parseInt(req.params.id);
	var character_class = req.params.class;

	AlliancesDAO.getUsersByAllianceIdByClass(id, character_class)
	.then((users) => {
		res.status(200);
		res.send(users);
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
=======
router.get('/:id/characters', function(req, res, next) {
	var id = parseInt(req.params.id); 

	AlliancesDAO.getCharactersByAlliance(id)
	.then((characters) =>{
		res.send(characters);
	})
	.catch((error) => {
		res.status(500); 
		res.send(error); 
>>>>>>> baa0c97098cbcb8488efc4245bd5602ca09b8433
	})
});

router.post('/', function(req, res, next) {
	var name = req.body.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined.');

	} else {
		AlliancesDAO.create(name)
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
	
	AlliancesDAO.deleteById(id)
	.then(() => {
		res.status(200);
		res.send('Alliance with id ' + id + 'deleted');
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
	})
});

router.put('/:id', function(req, res, next) {
	var id = parseInt(req.body.id);
	var name = req.body.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined');

	} else {
		AlliancesDAO.updateById(id, name)
		.then((alliance) => {
			res.status(200);
			res.json(alliance);
		})
		.catch((error) => {
			res.status(422);
			res.send(error);
		})
	}
})

module.exports = router;
