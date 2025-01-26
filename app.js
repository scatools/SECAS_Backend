const express = require('express');
const ExpressError = require('./expressError');
const db = require('./db');
// const db_user = require('./db_user');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// Get the future urbanization data
app.post('/data/future', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,futv2_me,futv2_sd,futv2_mn,futv2_mx,futv2_mi,futv2_1,futv2_2,futv2_3,futv2_4,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM futv2
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 4326), ST_SetSRID(futv2.geom, 4326))`,
			[req.body.data]
		);

		return res.json({
			length: results.rows.length,
			data: results.rows,
			rawData: results
		});
	} catch (e) {
		next(e);
		console.error(e); 
	}
});

app.post('/data/current/aesfh', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,aesfh_me,aesfh_sd,aesfh_mn,aesfh_mx,aesfh_mi,aesfh_0_25,aesfh_0_5,aesfh_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM aesfh
			WHERE gid=ANY($1)`,
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

app.post('/data/current/amifh', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,amifh_me,amifh_sd,amifh_mn,amifh_mx,amifh_mi,amifh_0_25,amifh_0_5,amifh_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM amifh
			WHERE gid=ANY($1)`,
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

app.post('/data/current/amrpa', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,amrpa_me,amrpa_sd,amrpa_mn,amrpa_mx,amrpa_mi,amrpa_0,amrpa_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM amrpa
			WHERE gid=ANY($1)`,
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

app.post('/data/current/cshcd', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,cshcd_me,cshcd_sd,cshcd_mn,cshcd_mx,cshcd_mi,cshcd_0,cshcd_0_25,cshcd_0_5,cshcd_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM cshcd
			WHERE gid=ANY($1)`,
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

app.post('/data/current/egcpb', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,egcpb_me,egcpb_sd,egcpb_mn,egcpb_mx,egcpb_mi,egcpb_0_2,egcpb_0_4,egcpb_0_6,egcpb_0_8,egcpb_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM egcpb
			WHERE gid=ANY($1)`,
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

app.post('/data/current/eqapk', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,eqapk_me,eqapk_sd,eqapk_mn,eqapk_mx,eqapk_mi,eqapk_0_5,eqapk_0_75,eqapk_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM eqapk
			WHERE gid=ANY($1)`,
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

app.post('/data/current/estcc', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,estcc_me,estcc_sd,estcc_mn,estcc_mx,estcc_mi,estcc_0,estcc_0_25,estcc_0_5,estcc_0_75,estcc_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM estcc
			WHERE gid=ANY($1)`,
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

app.post('/data/current/firef', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,firef_me,firef_sd,firef_mn,firef_mx,firef_mi,firef_0,firef_0_5,firef_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM firef
			WHERE gid=ANY($1)`,
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

app.post('/data/current/gmgfc', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,gmgfc_me,gmgfc_sd,gmgfc_mn,gmgfc_mx,gmgfc_mi,gmgfc_0,gmgfc_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM gmgfc
			WHERE gid=ANY($1)`,
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

app.post('/data/current/gppgr', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,gppgr_me,gppgr_sd,gppgr_mn,gppgr_mx,gppgr_mi,gppgr_0_2,gppgr_0_4,gppgr_0_6,gppgr_0_8,gppgr_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM gppgr
			WHERE gid=ANY($1)`,
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

app.post('/data/current/grntr', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,grntr_me,grntr_sd,grntr_mn,grntr_mx,grntr_mi,grntr_0,grntr_0_25,grntr_0_5,grntr_0_75,grntr_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM grntr
			WHERE gid=ANY($1)`,
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

app.post('/data/current/grsav', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,grsav_me,grsav_sd,grsav_mn,grsav_mx,grsav_mi,grsav_0,grsav_0_15,grsav_0_3,grsav_0_45,grsav_0.6,grsav_0.75,grsav_0.9,grsav_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM grsav
			WHERE gid=ANY($1)`,
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

app.post('/data/current/ihabc', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,ihabc_me,ihabc_sd,ihabc_mn,ihabc_mx,ihabc_mi,ihabc_0,ihabc_0_75,ihabc_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM ihabc
			WHERE gid=ANY($1)`,
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

app.post('/data/current/impas', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,impas_me,impas_sd,impas_mn,impas_mx,impas_mi,impas_0,impas_0_5,impas_0_75,impas_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM impas
			WHERE gid=ANY($1)`,
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

app.post('/data/current/isegr', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,isegr_me,isegr_sd,isegr_mn,isegr_mx,isegr_mi,isegr_0,isegr_0_25,isegr_0_5,isegr_0_75,isegr_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM isegr
			WHERE gid=ANY($1)`,
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

app.post('/data/current/lscdn', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,lscdn_me,lscdn_sd,lscdn_mn,lscdn_mx,lscdn_mi,lscdn_0_1,lscdn_0_2,lscdn_0_4,lscdn_0_6,lscdn_0_8,lscdn_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM lscdn
			WHERE gid=ANY($1)`,
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

app.post('/data/current/mavbp', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,mavbp_me,mavbp_sd,mavbp_mn,mavbp_mx,mavbp_mi,mavbp_0,mavbp_0_1,mavbp_0_2,mavbp_0_3,mavbp_0_4,mavbp_0_5,mavbp_0_6,mavbp_0_7,mavbp_0_8,mavbp_0_9,mavbp_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM mavbp
			WHERE gid=ANY($1)`,
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

app.post('/data/current/mavbr', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,mavbr_me,mavbr_sd,mavbr_mn,mavbr_mx,mavbr_mi,mavbr_0,mavbr_0_1,mavbr_0_2,mavbr_0_3,mavbr_0_4,mavbr_0_5,mavbr_0_6,mavbr_0_7,mavbr_0_8,mavbr_0_9,mavbr_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM mavbr
			WHERE gid=ANY($1)`,
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

app.post('/data/current/netcx', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,netcx_me,netcx_sd,netcx_mn,netcx_mx,netcx_mi,netcx_0_25,netcx_0_5,netcx_0_75,netcx_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM netcx
			WHERE gid=ANY($1)`,
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

app.post('/data/current/nlcfp', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,nlcfp_me,nlcfp_sd,nlcfp_mn,nlcfp_mx,nlcfp_mi,nlcfp_0_25,nlcfp_0_5,nlcfp_0_75,nlcfp_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM nlcfp
			WHERE gid=ANY($1)`,
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

app.post('/data/current/persu', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,persu_me,persu_sd,persu_mn,persu_mx,persu_mi,persu_0_5,persu_0_7,persu_0_9,persu_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM persu
			WHERE gid=ANY($1)`,
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

app.post('/data/current/playa', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,playa_me,playa_sd,playa_mn,playa_mx,playa_mi,playa_0,playa_0_5,playa_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM playa
			WHERE gid=ANY($1)`,
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

app.post('/data/current/rescs', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,rescs_me,rescs_sd,rescs_mn,rescs_mx,rescs_mi,rescs_0_1,rescs_0_25,rescs_0_4,rescs_0_55,rescs_0_7,rescs_0_85,rescs_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM rescs
			WHERE gid=ANY($1)`,
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

app.post('/data/current/rests', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,rests_me,rests_sd,rests_mn,rests_mx,rests_mi,rests_0,rests_0_25,rests_0_4,rests_0_55,rests_0_7,rests_0_85,rests_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM rests
			WHERE gid=ANY($1)`,
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

app.post('/data/current/safbb', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,safbb_me,safbb_sd,safbb_mn,safbb_mx,safbb_mi,safbb_0,safbb_0_2,safbb_0_4,safbb_0_6,safbb_0_8,safbb_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM safbb
			WHERE gid=ANY($1)`,
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

app.post('/data/current/saffb', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,saffb_me,saffb_sd,saffb_mn,saffb_mx,saffb_mi,saffb_0,saffb_0_5,saffb_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM saffb
			WHERE gid=ANY($1)`,
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

app.post('/data/current/saluh', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,saluh_me,saluh_sd,saluh_mn,saluh_mx,saluh_mi,saluh_0,saluh_0_5,saluh_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM saluh
			WHERE gid=ANY($1)`,
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

app.post('/data/current/samfs', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,samfs_me,samfs_sd,samfs_mn,samfs_mx,samfs_mi,samfs_0,samfs_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM samfs
			WHERE gid=ANY($1)`,
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

app.post('/data/current/stcwi', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,stcwi_me,stcwi_sd,stcwi_mn,stcwi_mx,stcwi_mi,stcwi_0,stcwi_0_5,stcwi_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM stcwi
			WHERE gid=ANY($1)`,
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

app.post('/data/current/urbps', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,urbps_me,urbps_sd,urbps_mn,urbps_mx,urbps_mi,urbps_0_25,urbps_0_5,urbps_0_75,urbps_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM urbps
			WHERE gid=ANY($1)`,
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

app.post('/data/current/wcofw', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,wcofw_me,wcofw_sd,wcofw_mn,wcofw_mx,wcofw_mi,wcofw_0,wcofw_0_2,wcofw_0_4,wcofw_0_6,wcofw_0_8,wcofw_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM wcofw
			WHERE gid=ANY($1)`,
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

app.post('/data/current/wcopb', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,wcopb_me,wcopb_sd,wcopb_mn,wcopb_mx,wcopb_mi,wcopb_0,wcopb_0_5,wcopb_0_6,wcopb_0_7,wcopb_0_8,wcopb_0_9,wcopb_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM wcopb
			WHERE gid=ANY($1)`,
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

app.post('/data/current/wgcmd', async function(req, res, next) {
	try {
		const results = await db.query(
			`SELECT gid,wgcmd_me,wgcmd_sd,wgcmd_mn,wgcmd_mx,wgcmd_mi,wgcmd_0,wgcmd_0_1,wgcmd_0_2,wgcmd_0_3,wgcmd_0_4,wgcmd_0_5,wgcmd_0_6,wgcmd_0_7,wgcmd_0_8,wgcmd_0_9,wgcmd_1,ST_AsGeoJSON(ST_SetSRID(geom, 4326)) AS geometry
			FROM wgcmd
			WHERE gid=ANY($1)`,
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

// app.get('/report', async function(req, res, next){
// 	try{
// 		return res.download('./report_template.html');
// 	} catch(e) {
// 		next(e);
// 	}
// })

// Three user-related endpoints: get & post & delete

// app.post('/register', async function(req, res, next){
// 	try{
// 		var salt = bcrypt.genSaltSync(12);
// 		var hashed_password = bcrypt.hashSync(req.body.password, salt);
// 		const result = await db_user.query(
// 			`INSERT INTO users(username, password, email, first_name, last_name, is_admin)
// 			VALUES ($1, $2, $3, $4, $5, $6)`,
// 			[
// 				req.body.username,
// 				hashed_password,
// 				req.body.email,
// 				req.body.first_name,
// 				req.body.last_name,
// 				req.body.is_admin
// 			]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// })

// app.post('/login', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`SELECT password
// 			FROM users
// 			WHERE username = $1`,
// 			[req.body.username]
// 		);
// 		var validLogin = false;
// 		if (result.rows.length !== 0) {
// 			validLogin = bcrypt.compareSync(req.body.password, result.rows[0].password);
// 		};
// 		return res.json({
// 			credentials: result.rows,
// 			validLogin: validLogin
// 		});
// 	} catch(e) {
// 		next(e);
// 	}
// })

// app.post('/user', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`SELECT username, email, first_name, last_name, is_admin
// 			FROM users
// 			WHERE username = $1`,
// 			[req.body.username]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// })

// app.post('/user/shapefile', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`SELECT file_name, geometry
// 			FROM user_shapefile
// 			WHERE username = $1`,
// 			[req.body.username]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/user/report', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`SELECT report_name, script
// 			FROM user_report
// 			WHERE username = $1`,
// 			[req.body.username]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/update/information', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`UPDATE users
// 			SET email = $2, first_name = $3, last_name = $4
// 			WHERE username = $1`,
// 			[
// 				req.body.username,
// 				req.body.email,
// 				req.body.first_name,
// 				req.body.last_name
// 			]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/update/password', async function(req, res, next){
// 	try{
// 		var salt = bcrypt.genSaltSync(12);
// 		var hashed_password = bcrypt.hashSync(req.body.password, salt);
// 		const result = await db_user.query(
// 			`UPDATE users
// 			SET password = $2
// 			WHERE username = $1`,
// 			[
// 				req.body.username,
// 				hashed_password
// 			]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/save/shapefile', async function(req, res, next){
// 	try{
// 		const maxID = await db_user.query(
// 			`SELECT MAX(file_id) AS max_id
// 			FROM user_shapefile`
// 		);
// 		var new_id = 1;
// 		if (maxID.rows[0].max_id) {
// 			new_id = maxID.rows[0].max_id + 1;
// 		}
// 		const result = await db_user.query(
// 			`INSERT INTO user_shapefile(file_id, file_name, geometry, username)
// 			VALUES ($1, $2, $3, $4)`,
// 			[
// 				new_id,
// 				req.body.file_name,
// 				req.body.geometry,
// 				req.body.username
// 			]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/save/report', async function(req, res, next){
// 	try{
// 		const maxID = await db_user.query(
// 			`SELECT MAX(report_id) AS max_id
// 			FROM user_report`
// 		);
// 		var new_id = 1;
// 		if (maxID.rows[0].max_id) {
// 			new_id = maxID.rows[0].max_id + 1;
// 		}
// 		const result = await db_user.query(
// 			`INSERT INTO user_report(report_id, report_name, script, username)
// 			VALUES ($1, $2, $3, $4)`,
// 			[
// 				new_id,
// 				req.body.report_name,
// 				req.body.script,
// 				req.body.username
// 			]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/delete/shapefile', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`DELETE FROM user_shapefile
// 			WHERE file_name = $1`,
// 			[ req.body.file_name ]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

// app.post('/delete/report', async function(req, res, next){
// 	try{
// 		const result = await db_user.query(
// 			`DELETE FROM user_report
// 			WHERE report_name = $1`,
// 			[ req.body.report_name ]
// 		);
// 		return res.json(result);
// 	} catch(e) {
// 		next(e);
// 	}
// });

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
