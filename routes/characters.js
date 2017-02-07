var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO');

// GET /characters : renvoie tous les characters + 200
/* GET characters listing. */
router.get('/', function(req, res, next) {
	CharacterDAO.getAll()
	.then((characters) => {
		res.status(200); 
		res.send(characters);
	});
});

// GET /characters/id : renvoie le character avec l'id = id + 200 
router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id); 

	CharacterDAO.getById(id)
	.then((characters) => {
		res.status(200); 
		res.send(characters); 
	});
}); 

// POST /characters : créer un character avec (name, class, user_id, point) + 200 + nouvel character
router.post('/', function(req, res, next) {
	var name 		= req.body.name;
	var class_name 	= req.body.class_name;
	var user_id 	= req.body.user_id;
	var point 		= req.body.point;

	if (name 		=== undefined || 
		class_name 	=== undefined || 
		user_id 	=== undefined || 
		point 		=== undefined ) {
		res.status(422); 
		res.send('name, class_name, user_id or point is not defined'); 
	} else {
		CharacterDAO.create(name, class_name, user_id)
		.then((result) =>{
			res.status(200); 
			res.json(result); 
		})
		.catch((error) =>{
			res.status(500); 
			res.send(error); 
		})

	}
}); 

// DELETE /characters/id : supprime le character avec l'id + 200
router.delete('/:id', function(res, req, next) {
	var id = parseInt(req.params.id); 

	CharacterDAO.deleteById(id)
	.then(() => {
		res.status(200); 
		res.send('Character with id '+id+' deleted with success'); 
	})
	.catch((error) => {
		res.status(500); 
		res.send(error); 
	})
});

// PUT : /characters/id : modifie (name) + 200 + le character modifié
router.put('/:id', function(res, req, next) {
	var id 			= parseInt(req.params.id); 
	var name 		= req.body.name;

	if (name === undefined) {
		res.status(422); 
		res.send('Name is not defined'); 
	} else {
		CharacterDAO.upddateById(id, name)
		.then((character) => {
			res.status(200); 
			res.json(character); 
		})
		.catch((error) => {
			res.status(500); 
			res.send(error); 
		})
	}
});

module.exports = router;
