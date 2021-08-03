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
        return elt.id == id ? {id: elt.id, name: elt.name, country: elt.country, wage: elt.newWage, age: elt.age, role: elt.role} : elt
      }))
      console.log("Updated Database");
    });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:2727/delete/${id}`);
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

      <div className="formInfo">
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" onChange={(event) => setName(event.target.value)}/>

        <label htmlFor="age">Age:</label>
        <input id="age" type="number" onChange={(event) => setAge(event.target.value)} />

        <label htmlFor="country">Country:</label>
        <input id="country" type="text" onChange={(event) => setCountry(event.target.value)} />

        <label htmlFor="role">Role:</label>
        <input id="role" type="text" onChange={(event) => setRole(event.target.value)}/>

        <label htmlFor="wage">Wage(Year):</label>
        <input id="wage" type="number" onChange={(event) => setWage(event.target.value)}/>

        <button onClick = {handleSubmit} type="submit">Add Employee</button>
      </div>
      ------
      <button onClick={getEmployees}> Show Employees </button>

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
