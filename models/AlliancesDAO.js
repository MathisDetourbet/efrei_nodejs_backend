const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM alliances WHERE id=${id}', 
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
		return DB.accessor.query('SELECT * FROM alliances')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(username, email) {
		return DB.accessor.query(
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
		return DB.accessor.query(
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
		return DB.accessor.query(
			'UPDATE alliances SET name=${name} WHERE id=${id}',
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
	}, 

	getUsersByAlliance(alliance_id) { 
		return DB.accessor.query(
			'SELECT * FROM users WHERE alliance_id=${alliance_id}', 
			{
				alliance_id : alliance_id
			})
			.then((users) => {
				return users; 
			})
			.catch((error) => {
				throw error; 
			})
	}, 

	//TO FINISH
	getCharactersByAlliance(alliance_id) { 
		return DB.accessor.query(
			'SELECT * FROM users WHERE alliance_id=${alliance_id}', 
			{
				alliance_id : alliance_id
			})
			.then((users) => {
				return users; 
			})
			.catch((error) => {
				throw error; 
			})
	},

	getUsersByAllianceIdByClass(alliance_id, character_class) {
		return DB.accessor.query(
			'SELECT * FROM users WHERE alliance_id=${alliance_id} AND class=${character_class}',
			{
				alliance_id 	: alliance_id,
				character_class	: character_class
			})
			.then((users) => {
				return users;
			})
			.catch((error) => {
				throw error;
			}
		)
	}
}