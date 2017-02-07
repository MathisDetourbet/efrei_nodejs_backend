var express = require('express');
var router = express.Router();
const CharacterDAO = require('../models/CharacterDAO');


/* GET users listing. */
router.get('/', function(req, res, next) {
	AlliancesDAO.getAll()
	.then((alliances) => {
		res.send(alliances);
	});
});

module.exports = router;
