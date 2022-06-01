const { Client } = require("pg");

// For development on local server

// var db_user = new Client({
//   user: "postgres",
//   password: "password",
//   database: "user",
//   port: 5432,
//   host: "localhost"
// });

// For production on Heroku

// Need to specify ssl attribute
var db_user = new Client({
  // Need to set these config variables beforehand in Heroku environment settings
  // For more details, refer to https://devcenter.heroku.com/articles/config-vars
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: "d357fss3k147t7",
  port: 5432,
  host: "ec2-54-145-224-156.compute-1.amazonaws.com",
  ssl: { rejectUnauthorized: false }
}); 

db_user.connect();

module.exports = db_user;