// src/App.js
import React from "react";
import AccessRequestForm from "./components/AccessRequestForm";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Access Management Portal</h1>
      </header>
      <main>
        <AccessRequestForm />
      </main>
    </div>
  );
}

export default App;