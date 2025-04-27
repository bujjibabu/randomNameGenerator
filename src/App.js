import React, { useState } from "react";
import "./App.css";

function App() {
  // State for storing the list of chitfund members and the randomly selected winner
  const [nameList, setNameList] = useState([]);
  const [newName, setNewName] = useState("");
  const [randomName, setRandomName] = useState("");

  // Function to handle adding a new name to the list
  const handleAddName = (e) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      setNameList([...nameList, newName.trim()]);
      setNewName("");
    }
  };
  // Function to select a random name from the list
  const generateRandomName = () => {
    if (nameList.length > 0) {
      const randomIndex = Math.floor(Math.random() * nameList.length);
      setRandomName(nameList[randomIndex]);
    } else {
      setRandomName("Please add members to the list first");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rani Mitra Chits</h1>
        <h2 className="subtitle">Member Selection System</h2>

        <div className="name-form">
          <form onSubmit={handleAddName}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter member name"
              className="name-input"
            />
            <button type="submit" className="add-button">
              Add Member
            </button>
          </form>
        </div>

        <div className="names-container">
          <h3>Chitfund Members:</h3>
          {nameList.length === 0 ? (
            <p>No members added yet</p>
          ) : (
            <ul className="name-list">
              {nameList.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="random-section">
          <button onClick={generateRandomName} className="random-button">
            Select Prize Winner
          </button>          {randomName && (
            <div className="result">
              <h2>Winner for {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}:</h2>
              <div className="random-name">{randomName}</div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
