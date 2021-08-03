import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employees, setEmployees] = useState([]);

  const handleSubmit = () => {
    Axios.post("http://localhost:2727/create", {
      name: name,
      age: age,
      country: country,
      role: role,
      wage: wage
    }).then(data => {
      setEmployees([
        ...employees,
        {
          name: name,
          age: age,
          country: country,
          role: role,
          wage: wage
        }
      ]);
    });
  };

  const updateData = id => {
    Axios.put("http://localhost:2727/update", {
      id: id,
      wage: newWage
    }).then(data => {
      setEmployees(
        employees.map(elt => {
          return elt.id === id
            ? {
                id: elt.id,
                name: elt.name,
                country: elt.country,
                wage: elt.newWage,
                age: elt.age,
                role: elt.role
              }
            : elt;
        })
      );
      console.log("Updated Database");
    });
  };

  const deleteData = id => {
    console.log("in frontend delete func");
    Axios.delete(`http://localhost:2727/delete/${id}`).then(data => {
      setEmployees(
        employees.filter(elt => {
          return elt.id !== id;
        })
      );
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:2727/employees").then(res => {
      setEmployees(res.data);
    });
  };

  return (
    <>
      <div className="App">
        <h1>Human Resources Management System</h1>
        <br />
        <h4 class="subttt">Adding Employees</h4>

        <div class="form-group">
          <form>
            <label class="form-label" htmlFor="name">
              Full Name:
            </label>
            <input
              placeholder="Enter First and Last Name Here"
              rows="1"
              cols="47"
              required
              class="form-control"
              id="name"
              type="text"
              onChange={event => setName(event.target.value)}
            />
            <p></p>
            <label class="form-label" htmlFor="age">
              Age:
            </label>
            <input
              placeholder="Enter An Age Here"
              rows="1"
              cols="47"
              required
              class="form-control"
              id="age"
              type="number"
              onChange={event => setAge(event.target.value)}
            />
            <p></p>
            <label class="form-label" htmlFor="country">
              Country:
            </label>
            <input
              placeholder="Enter A Country Here"
              rows="1"
              cols="47"
              required
              class="form-control"
              id="country"
              type="text"
              onChange={event => setCountry(event.target.value)}
            />
            <p></p>
            <label class="form-label" htmlFor="role">
              Role:
            </label>
            <input
              placeholder="Enter Employee Position Here"
              rows="1"
              cols="47"
              required
              class="form-control"
              id="role"
              type="text"
              onChange={event => setRole(event.target.value)}
            />
            <p></p>
            <label class="form-label" htmlFor="wage">
              Yearly Wage:
            </label>
            <input
              placeholder="Enter Yearly Wage in USD Here"
              rows="1"
              cols="47"
              required
              class="form-control"
              id="wage"
              type="number"
              onChange={event => setWage(event.target.value)}
            />
            <br />
            <button
              class="btn btn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Add Employee
            </button>
          </form>
        </div>

        <br />
        <br />
        <br />

        <h4 class="subttt">Current Employees</h4>

        <button class="btn btn-primary" onClick={getEmployees}>
          {" "}
          Show Employees{" "}
        </button>

        {employees.map(value => {
          return (
            <>
              <br />
              <Card variant="outlined">
                <CardHeader
                  title={value.name}
                  subheader={value.role}
                ></CardHeader>
                <CardContent>
                  <div key={value.id}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Age: {value.age}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Country: {value.country}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Yearly Wage: ${value.wage}
                    </Typography>
                  </div>

                  <br />
                  <br />
                  <div>
                    <h4 class="ssm"> Changing Wages </h4>
                    <input
                      placeholder="Enter New Wage in USD Here"
                      rows="1"
                      required
                      class="form-control"
                      onChange={event => setNewWage(event.target.value)}
                      type="number"
                    />
                  </div>
                </CardContent>

                <CardActions>
                  <button
                    class="btn btn-secondary"
                    onClick={() => updateData(value.id)}
                  >
                    Update Wage
                  </button>

                  <button
                    class="btn btn-danger"
                    onClick={() => deleteData(value.id)}
                  >
                    Remove Employee
                  </button>
                </CardActions>
              </Card>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
