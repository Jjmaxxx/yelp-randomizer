import React from "react";
import FrontPage from "./frontPage.js";
import { useState, useEffect } from 'react';
import theme from './utils/theme.js';
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { AppBar, Toolbar, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from './utils/styles.js';
function App() {
  const style = styles;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [businessPictures, setBusinessPictures] = useState(null);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("latitude: " + latitude + " longitude: "+longitude);
      fetch("http://localhost:3001/message",{
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({latitude:latitude,longitude:longitude})
      })
      .then((res) => res.json())
      .then((data) => {setBusinessPictures(data.businesses);console.log(data.businesses)});
      // work with this information however you'd like!
    });
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar style={{height:"72px",width:"100%"}}color="primary" position="sticky">
        <Toolbar sx={style.toolBar}>
            <img style={{height:"70%"}}src={require("./images/yelpin.png")} alt={"yelpin"}/>
        </Toolbar>
      </AppBar>
      <FrontPage windowwidth={width} windowheight={height} pictures = {businessPictures}/>
      </ThemeProvider>
    </div>
  );
}

export default App;