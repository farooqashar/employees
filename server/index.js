const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
console.log(req.body);

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

app.get("/employees", (req,res) => {
    db.query('SELECT * from employees', (err, result) => {
        if (err) {
            console.error(err);
        } else {
            res.send(result);
        }
    });

});


app.listen(2727, (req, res) => {
  console.log("Listening on PORT");
});
