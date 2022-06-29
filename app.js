const express = require('express');
const ExpressError = require('./expressError');
const db = require('./db');
const db_user = require('./db_user');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.post('/data/current', async function(req, res, next) {
	try {
		// Set 4326 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,site,species,fire,protected,carbon,forest,farming,landscape,resilience,blueprint
			ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM hex_mse_current
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 4326), ST_SetSRID(hex_mse_current.geom, 4326))`,
			[req.body.data]
		);

		return res.json({
			length: results.rows.length,
			data: results.rows
		});
	} catch (e) {
		next(e);
		console.error(e); 
	}
});

app.post('/data/future', async function(req, res, next) {
	try {
		// Set 4326 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,site,species,fire,protected,carbon,forest,farming,landscape,resilience,blueprint
			ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM hex_mse_future
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 4326), ST_SetSRID(hex_mse_future.geom, 4326))`,
			[req.body.data]
		);

		return res.json({
			length: results.rows.length,
			data: results.rows
		});
	} catch (e) {
		next(e);
		console.error(e); 
	}
});

app.get('/report', async function(req, res, next){
	try{
		return res.download('./report_template.html');
	} catch(e) {
		next(e);
	}
})

// Three user-related endpoints: get & post & delete

app.post('/register', async function(req, res, next){
	try{
		var salt = bcrypt.genSaltSync(12);
		var hashed_password = bcrypt.hashSync(req.body.password, salt);
		const result = await db_user.query(
			`INSERT INTO users(username, password, email, first_name, last_name, is_admin)
			VALUES ($1, $2, $3, $4, $5, $6)`,
			[
				req.body.username,
				hashed_password,
				req.body.email,
				req.body.first_name,
				req.body.last_name,
				req.body.is_admin
			]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
})

app.post('/login', async function(req, res, next){
	try{
		const result = await db_user.query(
			`SELECT password
			FROM users
			WHERE username = $1`,
			[req.body.username]
		);
		var validLogin = false;
		if (result.rows.length !== 0) {
			validLogin = bcrypt.compareSync(req.body.password, result.rows[0].password);
		};
		return res.json({
			credentials: result.rows,
			validLogin: validLogin
		});
	} catch(e) {
		next(e);
	}
})

app.post('/user', async function(req, res, next){
	try{
		const result = await db_user.query(
			`SELECT username, email, first_name, last_name, is_admin
			FROM users
			WHERE username = $1`,
			[req.body.username]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
})

app.post('/user/shapefile', async function(req, res, next){
	try{
		const result = await db_user.query(
			`SELECT file_name, geometry
			FROM user_shapefile
			WHERE username = $1`,
			[req.body.username]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/user/report', async function(req, res, next){
	try{
		const result = await db_user.query(
			`SELECT report_name, script
			FROM user_report
			WHERE username = $1`,
			[req.body.username]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/update/information', async function(req, res, next){
	try{
		const result = await db_user.query(
			`UPDATE users
			SET email = $2, first_name = $3, last_name = $4
			WHERE username = $1`,
			[
				req.body.username,
				req.body.email,
				req.body.first_name,
				req.body.last_name
			]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/update/password', async function(req, res, next){
	try{
		var salt = bcrypt.genSaltSync(12);
		var hashed_password = bcrypt.hashSync(req.body.password, salt);
		const result = await db_user.query(
			`UPDATE users
			SET password = $2
			WHERE username = $1`,
			[
				req.body.username,
				hashed_password
			]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/save/shapefile', async function(req, res, next){
	try{
		const maxID = await db_user.query(
			`SELECT MAX(file_id) AS max_id
			FROM user_shapefile`
		);
		var new_id = 1;
		if (maxID.rows[0].max_id) {
			new_id = maxID.rows[0].max_id + 1;
		}
		const result = await db_user.query(
			`INSERT INTO user_shapefile(file_id, file_name, geometry, username)
			VALUES ($1, $2, $3, $4)`,
			[
				new_id,
				req.body.file_name,
				req.body.geometry,
				req.body.username
			]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/save/report', async function(req, res, next){
	try{
		const maxID = await db_user.query(
			`SELECT MAX(report_id) AS max_id
			FROM user_report`
		);
		var new_id = 1;
		if (maxID.rows[0].max_id) {
			new_id = maxID.rows[0].max_id + 1;
		}
		const result = await db_user.query(
			`INSERT INTO user_report(report_id, report_name, script, username)
			VALUES ($1, $2, $3, $4)`,
			[
				new_id,
				req.body.report_name,
				req.body.script,
				req.body.username
			]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/delete/shapefile', async function(req, res, next){
	try{
		const result = await db_user.query(
			`DELETE FROM user_shapefile
			WHERE file_name = $1`,
			[ req.body.file_name ]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

app.post('/delete/report', async function(req, res, next){
	try{
		const result = await db_user.query(
			`DELETE FROM user_report
			WHERE report_name = $1`,
			[ req.body.report_name ]
		);
		return res.json(result);
	} catch(e) {
		next(e);
	}
});

/** general error handler */

app.use(function(req, res, next) {
	const err = new ExpressError('Not Found', 404);

	// pass err to the next middleware
	return next(err);
});

app.use(function(err, req, res, next) {
	// the default status is 500 Internal Server Error
	let status = err.status || 500;

	// set the status and alert the user
	return res.status(status).json({
		error: {
			message: err.message,
			status: status
		}
	});
});

module.exports = app;
