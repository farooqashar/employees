const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  const { name, age, country, role, wage } = req.body;

  db.query('INSERT INTO employees (name, age, country, role, wage) VALUES (?,?,?,?,?)', [name, age, country, role, wage], 
  (err, result) => {
      if (err) {
          console.error(err);
      } else {
          res.send("Database Updated");
      }
  } 

  );

});

app.listen(process.env.PORT || 2727, (req, res) => {
  console.log("Listening on PORT");
});
