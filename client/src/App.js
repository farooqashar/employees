import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employees, setEmployees] = useState([]);

  const handleSubmit = () => {

    Axios.post("http://localhost:2727/create", 
    {
      name: name,
      age: age,
      country: country,
      role: role, 
      wage: wage
    }
    )
    .then(data => {
      setEmployees([...employees,{
      name: name,
      age: age,
      country: country,
      role: role, 
      wage: wage
    }])
    });

  };

  const updateData = (id) => {
    Axios.put("http://localhost:2727/update", {
      id: id, 
      wage: newWage
    })
    .then(data => {
      setEmployees(employees.map((elt) => {
        return elt.id === id ? {id: elt.id, name: elt.name, country: elt.country, wage: elt.newWage, age: elt.age, role: elt.role} : elt
      }))
      console.log("Updated Database");
    });
  };

  const deleteData = (id) => {
    console.log("in frontend delete func");
    Axios.delete(`http://localhost:2727/delete/${id}`)
    .then(data => {
      setEmployees(employees.filter((elt) => {return elt.id !== id}));
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:2727/employees")
    .then(res => {
      setEmployees(res.data);
    })
  }; 

  return (
    <>
    <div className="App">

      <h1>Human Resources Management System</h1>
        <br />
      <h4 class="subttt">Adding Employees</h4>

      <div class="form-group">
      <form>
        <label class="form-label" htmlFor="name">Name:</label>
        <input placeholder="Enter A Name Here" rows = "1" cols = "47" required class="form-control" id="name" type="text" onChange={(event) => setName(event.target.value)}/>
        <p></p>
        <label class="form-label" htmlFor="age">Age:</label>
        <input placeholder="Enter An Age Here" rows = "1" cols = "47" required class="form-control" id="age" type="number" onChange={(event) => setAge(event.target.value)} />
<p></p>
        <label class="form-label" htmlFor="country">Country:</label>
        <input placeholder="Enter A Country Here" rows = "1" cols = "47" required class="form-control" id="country" type="text" onChange={(event) => setCountry(event.target.value)} />
<p></p>
        <label class="form-label" htmlFor="role">Role:</label>
        <input placeholder="Enter Employee Position Here" rows = "1" cols = "47" required class="form-control" id="role" type="text" onChange={(event) => setRole(event.target.value)}/>
<p></p>
        <label class="form-label" htmlFor="wage">Yearly Wage:</label>
        <input placeholder="Enter Yearly Wage in USD Here" rows = "1" cols = "47" required class="form-control" id="wage" type="number" onChange={(event) => setWage(event.target.value)}/>
        <br />
        <button class="btn btn-primary" onClick = {handleSubmit} type="submit">Add Employee</button>
       </form>
      </div>


        <br />
        <br />

      <h4 class="subttt">Current Employees</h4>

      <button class="btn btn-primary" onClick={getEmployees}> Show Employees </button>

      {employees.map(
        (value) => {
          return (
            <div key={value.id}>
              {value.name}
              {value.country}
              {value.role}
              {value.age}
              <div>
                <input onChange={(event) => setNewWage(event.target.value)} type="text" placeholder="Change Wage"/>
                <button onClick = {() => updateData(value.id)}>Update</button>

                <button onClick = {() => deleteData(value.id)}>Delete</button>
              </div>
            </div>
          )
        }

      )}
    </div>
    </>
  );
}

export default App;
