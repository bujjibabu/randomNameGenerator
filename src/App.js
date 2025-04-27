import React, { useState } from "react";
import "./App.css";
import "./paper.css";

function App() {
  // State for storing the list of chitfund members and the randomly selected winner
  const [nameList, setNameList] = useState([]);
  const [newName, setNewName] = useState("");
  const [randomName, setRandomName] = useState("");  const [showConfirmation, setShowConfirmation] = useState(false);
  const [nameToDelete, setNameToDelete] = useState(null);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  // Function to handle adding a new name to the list
  const handleAddName = (e) => {
    e.preventDefault();
    if (newName.trim() !== "") {
      setNameList([...nameList, newName.trim()]);
      setNewName("");
    }
  };  // Function to select a random name from the list
  const generateRandomName = () => {
    // First, clear the current winner to reset animations
    setRandomName("");
    
    // Use setTimeout to allow React to process the state update
    setTimeout(() => {
      if (nameList.length > 0) {
        const randomIndex = Math.floor(Math.random() * nameList.length);
        setRandomName(nameList[randomIndex]);
        
        // Wait a short moment for the result to render, then scroll to it
        setTimeout(() => {
          const resultElement = document.querySelector('.result');
          if (resultElement) {
            resultElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }
        }, 100);
      } else {
        setRandomName("Please add members to the list first");
      }
    }, 50);
  };// Function to show the reset confirmation dialog
  const handleResetInitiate = () => {
    setShowResetConfirmation(true);
  };
  
  // Function to perform the actual reset after confirmation
  const resetAll = () => {
    setNameList([]);
    setRandomName("");
    setNewName("");
    setShowResetConfirmation(false);
  };
  
  // Function to cancel reset operation
  const handleCancelReset = () => {
    setShowResetConfirmation(false);
  };

  // Function to initiate the delete process with confirmation
  const handleDeleteInitiate = (index) => {
    setNameToDelete(index);
    setShowConfirmation(true);
  };

  // Function to confirm and delete the name
  const handleConfirmDelete = () => {
    if (nameToDelete !== null) {
      const updatedList = [...nameList];
      updatedList.splice(nameToDelete, 1);
      setNameList(updatedList);
      setShowConfirmation(false);
      setNameToDelete(null);
    }
  };

  // Function to cancel delete operation
  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setNameToDelete(null);
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
                <li key={index}>
                  <span>{name}</span>
                  <button
                    onClick={() => handleDeleteInitiate(index)}
                    className="delete-button"
                    aria-label="Delete member"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>{" "}
        <div className="random-section">
          <div className="button-container">
            <button onClick={generateRandomName} className="random-button">
              Select Prize Winner
            </button>            <button onClick={handleResetInitiate} className="reset-button">
              Reset All
            </button>
          </div>          {randomName && (
            <div className="result">
              <h2>
                Winner for{" "}
                {new Date().toLocaleString("default", { month: "long" })}{" "}
                {new Date().getFullYear()}:
              </h2>
              <div className="winner-container">
                <div className="trophy-left">
                  <i className="fas fa-trophy trophy-icon"></i>
                </div>
                <div className="random-name">{randomName}</div>
                <div className="trophy-right">
                  <i className="fas fa-trophy trophy-icon"></i>
                </div>
              </div>              <div className="confetti-container">
                {/* Paper confetti pieces */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`paper paper-${i}`}></div>
                ))}
                
                {/* Falling rupee coins animations */}
                {[...Array(3)].map((_, i) => (
                  <div key={`rupee-${i}`} className={`falling-coin rupee-${i}`}>
                    <span className="coin-symbol">₹</span>
                  </div>
                ))}
                
                {/* Falling dollar coins animations */}
                {[...Array(3)].map((_, i) => (
                  <div key={`dollar-${i}`} className={`falling-coin dollar-${i}`}>
                    <span className="coin-symbol">$</span>
                  </div>
                ))}
              </div>
            </div>
          )}</div>        {showConfirmation && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to remove this member?</p>
              <div className="confirmation-buttons">
                <button onClick={handleConfirmDelete} className="confirm-button">
                  Yes, Delete
                </button>
                <button onClick={handleCancelDelete} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        {showResetConfirmation && (
          <div className="confirmation-dialog">
            <div className="confirmation-content">
              <h3>Confirm Reset</h3>
              <p>Are you sure you want to clear all members and selections?</p>
              <div className="confirmation-buttons">
                <button onClick={resetAll} className="confirm-button">
                  Yes, Reset All
                </button>
                <button onClick={handleCancelReset} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
