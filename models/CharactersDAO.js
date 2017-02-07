const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.query('SELECT * FROM characters WHERE id=${id}', 
			{
				id: id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {

			})

	},

	getAll() {
		return DB.query('SELECT * FROM characters')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(name, class_name, user_id, point) {
		return DB.query(
			'INSERT INTO characters(name, class_name, user_id, point) VALUES(${name}, ${class_name}, ${user_id}, ${point}) RETURNING *',
			{
				name 		: name,
				class_name	: class_name,
				user_id		: user_id, 
				point		: point
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	deleteById(id) {
		return DB.query(
			'DELETE FROM characters WHERE id=${id}',
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
			'UDPATE characters SET name=${name} WHERE id=${id}',
			{
				id		: id,
				name 	: name
			})
			.then((character) => {
				return character;
			})
			.catch((error) => {
				throw error;
			})
	}
}