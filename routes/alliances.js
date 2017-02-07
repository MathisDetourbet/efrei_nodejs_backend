var express = require('express');
var router = express.Router();
const AlliancesDAO = require('../models/AlliancesDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	AlliancesDAO.getAll()
	.then((alliances) => {
		res.send(alliances);
	});
});

router.get('/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	
	AlliancesDAO.getById(id)
	.then((alliance) => {
		res.send(alliance);
	});
});

router.post('/', function(req, res, next) {
	var name = req.body.name;

	if (name === undefined) {
		res.status(422);
		res.send('Name is undefined.');

	} else {
		AlliancesDAO.create(name)
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
	
	AlliancesDAO.deleteById(id)
	.then(() => {
		res.status(201);
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
			res.status(201);
			res.json(alliance);
		})
		.catch((error) => {
			res.status(422);
			res.send(error);
		})
	}
})

module.exports = router;
