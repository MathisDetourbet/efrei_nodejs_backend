const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.query('SELECT * FROM alliances WHERE id=${id}', 
			{
				id: id
			})
			.then(result => {
				return result;
			})
			.catch((error) => {

			})
	},

	getAll() {
		return DB.query('SELECT * FROM alliances')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(username, email) {
		return DB.query(
			'INSERT INTO alliances(name) VALUES(${name}) RETURNING *',
			{
				name: name
			})
			.then((alliance) => {
				return alliance;
			})
			.catch((error) => {
				throw error;
			})
	},

	deleteById(id) {
		return DB.query(
			'DELETE FROM alliances WHERE id=${id}',
			{
				id: id
			})
			.then(() => {
				return;
			})
			.catch((error) => {
				throw error;
			})
	},

	updateById(id, name) {
		return DB.query(
			'UDPATE alliances SET name=${name} WHERE id=${id}',
			{
				id	: id,
				name: name
			})
			.then((alliance) => {
				return alliance;
			})
			.catch((error) => {
				throw error;
			})
	}
}