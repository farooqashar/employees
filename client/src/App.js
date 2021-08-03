import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [wage, setWage] = useState(0);

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
      console.log("Adding Employee Request 200");
    });


  };

  return (
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
      <hr /> 
      
    </div>
  );
}

export default App;
