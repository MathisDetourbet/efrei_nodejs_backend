const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM characters WHERE id=${id}', 
			{
				id: id
			})
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error; 
			})
	},

	getAll() {
		return DB.accessor.query('SELECT * FROM characters')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	getAllByClass(character_class) {
		return DB.accessor.query('SELECT * FROM characters WHERE class=${character_class}',
			{
				character_class: character_class
			})
			.then((characters) => {
				return characters;
			})
			.catch((error) => {
				throw error;
			})
	}, 

	create(name, class_name, user_id, position) {
		return DB.accessor.query(
			'INSERT INTO characters(name, class, user_id, position) VALUES(${name}, ${class_name}, ${user_id}, point(${positionX},${positionY}) ) RETURNING *',
			{
				name 		: name,
				class_name	: class_name,
				user_id		: user_id, 
				positionX 	: position.x,
				positionY	: position.y 
			})
			.then((result) => {
				return result;
			})
			.catch((error) => { 
				throw error;
			})
	},

	deleteById(id) {
		return DB.accessor.query(
			'DELETE FROM characters WHERE id=${id}',
			//'DELETE FROM characters WHERE id=13',
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

	updateById(id, name, class_name, user_id, position) {
		return DB.accessor.query(
			'UPDATE characters SET name=${name}, class=${class_name}, user_id=${user_id}, position=point(${positionX}, ${positionY})  WHERE id=${id} RETURNING *',
			{
				id			: id,
				name 		: name,
				class_name	: class_name,
				user_id		: user_id, 
				positionX 	: position.x,
				positionY	: position.y  
			})
			.then((character) => {
				return character;
			})
			.catch((error) => {
				throw error;
			})
	}
}