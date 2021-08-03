import "./App.css";
import React, { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [wage, setWage] = useState(0);

  return (
    <div className="App">
      <div className="formInfo">
        <label for="name">Name:</label>
        <input id="name" type="text" />

        <label for="age">Age:</label>
        <input id="age" type="number" />

        <label for="country">Country:</label>
        <input id="country" type="text" />

        <label for="role">Role:</label>
        <input id="role" type="text" />

        <label for="wage">Wage(Year):</label>
        <input id="wage" type="number" />

        <button type="submit">Add Employee</button>
      </div>
    </div>
  );
}

export default App;
