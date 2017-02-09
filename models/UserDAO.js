const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.accessor.query('SELECT * FROM users WHERE id=${id}', 
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
		return DB.accessor.query('SELECT * FROM users')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(username, email) {
		return DB.accessor.query(
			'INSERT INTO users(name, email) VALUES(${username}, ${email}) RETURNING *',
			{
				username: username,
				email	: email
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
			'DELETE FROM users WHERE id=${id}',
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

	updateById(id, name, email, alliance_id) {
		return DB.accessor.query(
			'UPDATE users SET name=${name}, email=${email}, alliance_id=${alliance_id} WHERE id=${id} RETURNING *',
			{
				id			: id,
				name		: name,
				email		: email, 
				alliance_id : alliance_id
			})
			.then((user) => {
				return user;
			})
			.catch((error) => {
				throw error;
			})
	}
}