var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharactersDAO');

// GET /characters : renvoie tous les characters + 200
/* GET characters listing. */
router.get('/', function(req, res, next) {
	CharacterDAO.getAll()
	.then((characters) => {
		res.status(200)
		.json({
			status 		: 'success', 
			characters 	: characters
		}); 
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
	});
});

// GET /characters/id : renvoie le character avec l'id = id + 200 
router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id); 

	CharacterDAO.getById(id)
	.then((character) => {
		res.status(200)
		.json({
			status 		: 'success', 
			character 	: character[0]
		});  
	})
	.catch((error) => {
		res.status(500);
		res.send(error);
	});
}); 

// POST /characters : créer un character avec (name, class, user_id, point) + 200 + nouvel character
router.post('/', function(req, res, next) {
	var name 		= req.body.character.name;
	var class_name 	= req.body.character.class;
	var user_id 	= req.body.character.user_id;
	var position 	= req.body.character.position;

	console.log("Name : "+ name +" / class : "+class_name+" / user_id : "+user_id+ " / position : "+position.x); 

	if (name 		=== undefined || 
		class_name 	=== undefined || 
		user_id 	=== undefined || 
		position 	=== undefined ) {
		res.status(422); 
		res.send('name, class_name, user_id or position is not defined'); 
	} else {
		CharacterDAO.create(name, class_name, user_id, position)
		.then((result) =>{
			res.status(200)
			.json({
				status : 'success', 
				message : 'Inserted one character', 
				character : result[0]
			}); 
		})
		.catch((error) =>{
			console.log("HELLO", error);
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
