const { Pool } = require("pg");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config(); 
const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL == "true" ? true : false,
});

app.get("/user", (req, res) => {
  const q = `SELECT * FROM users WHERE username='${req.query.username}'`;
  pool.query(q, (error, results) => {
    if (error) {
      console.log(error);
    } else res.status(200).json(results.rows);
  });
});

app.get("/userSecure", (req, res) => {
  const username = req.query.username;
  pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      res.status(200).json(results.rows);
    }
  );
});

app.get("/profile", (req, res) => {
  const authorized = req.query["isAuth"] == "true";
  const secure = req.query["secureAccess"] == "true";
  const id = req.query["id"];
  if (secure) {
    if (!authorized || (authorized && id != 5)) {
      res.status(200).send({ message: "Nemate pristup ovoj lokaciji" });
      return;
    }
  }
  pool.query(
    "SELECT * FROM users WHERE user_id=$1 LIMIT 1",
    [id],
    (error, results) => {
      if (results.rowCount == 0) {
        res.status(200).send({ message: "Korisnik nije pronađen" });
        return;
      }
      if (error) {
        console.log(error);
      } else res.status(200).json(results.rows);
    }
  );
});
