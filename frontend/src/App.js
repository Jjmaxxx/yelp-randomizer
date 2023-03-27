import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3001/message",{
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({message:"Hello from frontend"})
    })
      .then((res) => res.json())
      .then((data) => setData(data.message));
    
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;