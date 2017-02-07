const DB = require('../models/Database');

module.exports = {
	getById(id) {
		return DB.query('SELECT * FROM users WHERE id=${id}', 
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
		return DB.query('SELECT * FROM users')
			.then((result) => {
				return result;
			})
			.catch((error) => {
				throw error;
			})
	},

	create(username, email) {
		return DB.query(
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
		return DB.query(
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

	updateById(id, username, email) {
		return DB.query(
			'UDPATE users SET username=${username}, email=${email} WHERE id=${id}',
			{
				id		: id,
				username: username,
				email	: email
			})
			.then((user) => {
				return user;
			})
			.catch((error) => {
				throw error;
			})
	}
}