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

app.post('/data/current', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,site,species,fire,protected,carbon,forest,farming,landscape,resilience,blueprint,lightblue,darkblue,
			ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_mse_current
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_mse_current.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,site,species,fire,protected,carbon,forest,farming,landscape,resilience,blueprint,lightblue,darkblue,
			ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_mse_future
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_mse_future.geom, 5070))`,
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

app.post('/data/current/aesfh', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,aesfh_me,aesfh_sd,aesfh_mn,aesfh_mx,aesfh_mi,aesfh_0,aesfh_1,aesfh_2,aesfh_3,aesfh_4,aesfh_5,aesfh_6,aesfh_7,aesfh_8,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_aesfh
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_aesfh.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,amifh_me,amifh_sd,amifh_mn,amifh_mx,amifh_mi,amifh_0,amifh_1,amifh_2,amifh_3,amifh_4,amifh_5,amifh_6,amifh_7,amifh_8,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_amifh
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_amifh.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,cshcd_me,cshcd_sd,cshcd_mn,cshcd_mx,cshcd_mi,cshcd_0,cshcd_1,cshcd_2,cshcd_3,cshcd_4,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_cshcd
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_cshcd.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,egcpb_me,egcpb_sd,egcpb_mn,egcpb_mx,egcpb_mi,egcpb_0,egcpb_1,egcpb_2,egcpb_3,egcpb_4,egcpb_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_egcpb
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_egcpb.geom, 5070))`,
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

app.post('/data/current/eqapp', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,eqapp_me,eqapp_sd,eqapp_mn,eqapp_mx,eqapp_mi,eqapp_0,eqapp_1,eqapp_2,eqapp_3,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_eqapp
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_eqapp.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,estcc_me,estcc_sd,estcc_mn,estcc_mx,estcc_mi,estcc_0,estcc_1,estcc_2,estcc_3,estcc_4,estcc_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_estcc
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_estcc.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,firef_me,firef_sd,firef_mn,firef_mx,firef_mi,firef_0,firef_1,firef_2,firef_3,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_firef
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_firef.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,gmgfc_me,gmgfc_sd,gmgfc_mn,gmgfc_mx,gmgfc_mi,gmgfc_0,gmgfc_1,gmgfc_2,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_gmgfc
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_gmgfc.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,gppgr_me,gppgr_sd,gppgr_mn,gppgr_mx,gppgr_mi,gppgr_0,gppgr_1,gppgr_2,gppgr_3,gppgr_4,gppgr_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_gppgr
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_gppgr.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,grntr_me,grntr_sd,grntr_mn,grntr_mx,grntr_mi,grntr_0,grntr_1,grntr_2,grntr_3,grntr_4,grntr_5,grntr_6,grntr_7,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_grntr
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_grntr.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,ihabc_me,ihabc_sd,ihabc_mn,ihabc_mx,ihabc_mi,ihabc_0,ihabc_1,ihabc_2,ihabc_3,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_ihabc
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_ihabc.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,impas_me,impas_sd,impas_mn,impas_mx,impas_mi,impas_0,impas_1,impas_2,impas_3,impas_4,impas_5,impas_6,impas_7,impas_8,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_impas
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_impas.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,isegr_me,isegr_sd,isegr_mn,isegr_mx,isegr_mi,isegr_0,isegr_1,isegr_2,isegr_3,isegr_4,isegr_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_isegr
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_isegr.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,mavbp_me,mavbp_sd,mavbp_mn,mavbp_mx,mavbp_mi,mavbp_0,mavbp_1,mavbp_2,mavbp_3,mavbp_4,mavbp_5,mavbp_6,mavbp_7,mavbp_8,mavbp_9, mavbp_10,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_mavbp
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_mavbp.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,mavbr_me,mavbr_sd,mavbr_mn,mavbr_mx,mavbr_mi,mavbr_0,mavbr_1,mavbr_2,mavbr_3,mavbr_4,mavbr_5,mavbr_6,mavbr_7,mavbr_8,mavbr_9,mavbr_10,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_mavbr
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_mavbr.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,netcx_me,netcx_sd,netcx_mn,netcx_mx,netcx_mi,netcx_0,netcx_1,netcx_2,netcx_3,netcx_4,netcx_5,netcx_6,netcx_7,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_netcx
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_netcx.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,nlcfp_me,nlcfp_sd,nlcfp_mn,nlcfp_mx,nlcfp_mi,nlcfp_0,nlcfp_1,nlcfp_2,nlcfp_3,nlcfp_4,nlcfp_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_nlcfp
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_nlcfp.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,persu_me,persu_sd,persu_mn,persu_mx,persu_mi,persu_0,persu_1,persu_2,persu_3,persu_4,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_persu
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_persu.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,playa_me,playa_sd,playa_mn,playa_mx,playa_mi,playa_0,playa_1,playa_2,playa_3,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_playa
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_playa.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,rescs_me,rescs_sd,rescs_mn,rescs_mx,rescs_mi,rescs_0,rescs_1,rescs_2,rescs_3,rescs_4,rescs_5,rescs_6,rescs_7,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_rescs
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_rescs.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,rests_me,rests_sd,rests_mn,rests_mx,rests_mi,rests_0,rests_1,rests_2,rests_3,rests_4,rests_5,rests_6,rests_7,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_rests
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_rests.geom, 5070))`,
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

app.post('/data/current/saamr', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,saamr_me,saamr_sd,saamr_mn,saamr_mx,saamr_mi,saamr_0,saamr_1,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_saamr
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_saamr.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,safbb_me,safbb_sd,safbb_mn,safbb_mx,safbb_mi,safbb_0,safbb_1,safbb_2,safbb_3,safbb_4,safbb_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_safbb
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_safbb.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,saffb_me,saffb_sd,saffb_mn,saffb_mx,saffb_mi,saffb_0,saffb_1,saffb_2,saffb_3,saffb_4,saffb_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_saffb
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_saffb.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,saluh_me,saluh_sd,saluh_mn,saluh_mx,saluh_mi,saluh_0,saluh_1,saluh_2,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_saluh
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_saluh.geom, 5070))`,
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

app.post('/data/current/samaf', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,samaf_me,samaf_sd,samaf_mn,samaf_mx,samaf_mi,samaf_0,samaf_1,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_samaf
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_samaf.geom, 5070))`,
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

app.post('/data/current/stcwl', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,stcwl_me,stcwl_sd,stcwl_mn,stcwl_mx,stcwl_mi,stcwl_0,stcwl_1,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_stcwl
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_stcwl.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,urbps_me,urbps_sd,urbps_mn,urbps_mx,urbps_mi,urbps_0,urbps_1,urbps_2,urbps_3,urbps_4,urbps_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_urbps
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_urbps.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,wcofw_me,wcofw_sd,wcofw_mn,wcofw_mx,wcofw_mi,wcofw_0,wcofw_1,wcofw_2,wcofw_3,wcofw_4,wcofw_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_wcofw
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_wcofw.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,wcopb_me,wcopb_sd,wcopb_mn,wcopb_mx,wcopb_mi,wcopb_0,wcopb_1,wcopb_2,wcopb_3,wcopb_4,wcopb_5,wcopb_6,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_wcopb
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_wcopb.geom, 5070))`,
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
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,wgcmd_me,wgcmd_sd,wgcmd_mn,wgcmd_mx,wgcmd_mi,wgcmd_0,wgcmd_1,wgcmd_2,wgcmd_3,wgcmd_4,wgcmd_5,wgcmd_6,wgcmd_7,wgcmd_8,wgcmd_9,wgcmd_10,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_wgcmd
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_wgcmd.geom, 5070))`,
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

app.post('/data/current/wvias', async function(req, res, next) {
	try {
		// Set 5070 as the SRID for both geometries to avoid operations on mixed projections
		const results = await db.query(
			`SELECT gid,wvias_me,wvias_sd,wvias_mn,wvias_mx,wvias_mi,wvias_0,wvias_1,wvias_2,wvias_3,wvias_4,wvias_5,ST_AsGeoJSON(ST_SetSRID(geom, 5070)) AS geometry
			FROM hex_secas_db_wvias
			WHERE ST_Intersects(ST_SetSRID(ST_GeomFromGeoJSON($1), 5070), ST_SetSRID(hex_secas_db_wvias.geom, 5070))`,
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
