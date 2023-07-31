import React from "react";
import FrontPage from "./FrontPage.js";
import Form from "./Form.js"
import { useState, useEffect } from 'react';
import theme from './utils/theme.js';
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { AppBar, Toolbar, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from './utils/styles.js';
import InfiniteLooping from "./InfiniteLooping.js";
import { motion } from "framer-motion";

let staticPhotos = ["./images/stockphoto1.jpg","./images/stockphoto2.jpg","./images/stockphoto3.jpg","./images/stockphoto4.jpg","./images/stockphoto5.png"];

function App() {
  const style = styles;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [page, setPage] = useState("FrontPage")
  const [businessPictures, setBusinessPictures] = useState(null);
  const [lat, setLat ] = useState(0);
  const [long, setLong] = useState(0);
  const [data,setData] = useState(null);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLat(latitude);
      setLong(longitude);
      console.log("latitude: " + latitude + " longitude: "+longitude);
      fetch("http://localhost:3001/message",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({latitude:latitude,longitude:longitude})
      })
      .then((res) => res.json())
      .then((data) => {setBusinessPictures(data.businesses)});
    });
    if(data !== null){
      fetch("http://localhost:3001/search",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((results) => console.log(results.body));
    }
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [data]);
  
  function changePage(page){
    setPage(page);
  }
  function setFormData(data){
    console.log(JSON.stringify(data));
    setData(data);

  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar style={{height:"80px",width:"100%"}}color="primary" position="sticky">
        <Toolbar sx={style.toolBar}>
          <img style={{height:"70%"}}src={require("./images/yelpin.png")} alt={"yelpin"}/>
        </Toolbar>
      </AppBar>
      {
        page ==="FrontPage" &&
          <FrontPage style={{minHeight:"400px"}}windowwidth={width} windowheight={height-300} changePage ={changePage}/>
        }
      {
        page ==="Form" &&
          <Form 
            style={{minHeight:"400px"}} 
            windowwidth={width} 
            windowheight={height} 
            latitude = {lat} 
            longitude={long}
            setFormData={setFormData}
          />
      }
      <div style={{height:"100%",display:"flex",width:"100%",padding:"0",marginTop:"30px"}}>
        <InfiniteLooping > 
          {
            businessPictures===null ? 
            (()=>{staticPhotos.map((src)=>{
              return(<img src={require(`${ src}`)} width={"100%"} height={"784px"} alt={src}></img>) 
            })})
          :
          businessPictures.map((image)=>{
            return(
              <motion.div
                whileHover={{ scale: 1.10 }}
                whileTap={{ scale: 0.8 }}
              >
              <a href = {image.url}>
                <img src={`${image.image_url}`} width={"225px"} height={"175px"} alt={image.name} style={{borderRadius: "5px",marginLeft:"12.5px",marginRight:"12.5px"}}/>
              </a>
              </motion.div>
            ) 
            })
          }
        </InfiniteLooping>
      </div>
      </ThemeProvider>
    </div>
  );
}

export default App;