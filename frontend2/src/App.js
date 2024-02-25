import React from "react";
import FrontPage from "./FrontPage.js";
import Form from "./Form.js";
import Result from "./Result.js";
import { useState, useEffect,useRef } from 'react';
import theme from './utils/theme.js';
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { AppBar, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import styles from './utils/styles.js';
import InfiniteLooping from "./InfiniteLooping.js";
import Confetti from './Confetti.js';
import photos from "./utils/nyphotos.js";
import { motion } from "framer-motion";


function App() {
  const style = styles;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [page, setPage] = useState("FrontPage");
  const [locationPerm, setLocationPerm] = useState(true);
  const [businessPictures, setBusinessPictures] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [lat, setLat ] = useState(40.730610);
  const [long, setLong] = useState(-73.935242);
  const confettiRef = useRef();
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(() => {
    
    if(businessPictures == null){
      setBusinessPictures(photos);
    }
    if(locationPerm){
      setLocationPerm(false);
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLat(latitude);
        setLong(longitude);
        // fetch("http://localhost:3001/message",{
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({latitude:lat,longitude:long})
        // })
        // .then((res) => res.json())
        // .then((data) => {setBusinessPictures(data.businesses);console.log(data.businesses)});
      });
    }
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [locationPerm,lat,long,businessPictures]);
  function changePage(page){
    setPage(page);
  }
  function setFormData(data,page){
    changePage(page);
    setLat(data.latitude);
    setLong(data.longitude);
    //https://server.yelpin.xyz/
    fetch("https://server.yelpin.xyz/search",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((results) => {
      setSearchResults(results.restauraunts);
      if(results.restauraunts!= null){
        setBusinessPictures(results.restauraunts);
      }
    }).catch(error => {alert(error)});
      
  }
  function spawnConfetti(){
    confettiRef.current.getConfetti();
  }
  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar style={{height:"80px",width:"100%"}}color="primary" position="sticky">
        <Toolbar sx={style.toolBar}>
          <img onClick={()=>{changePage("FrontPage");setSearchResults(null)}}style={{height:"48%",cursor:"pointer"}}src={require("./images/yelpin2.png")} alt={"yelpin"}/>
          
        </Toolbar>
      </AppBar>
      {
        page ==="FrontPage" &&
          <FrontPage 
            style={{minHeight:"400px"}}
            windowwidth={width} 
            windowheight={height-300} 
            changePage ={changePage}
          />
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
      {
        page === "Result" &&
        <div>
          <Confetti ref = {confettiRef} windowwidth={width} windowheight = {height} style={{position:'absolute', right:0}}/>
          <Result
            style={{minHeight:"400px"}} 
            windowwidth={width} 
            windowheight={height} 
            results = {searchResults}
            latitude = {lat} 
            longitude={long}
            changePage ={changePage}
            spawnConfetti={spawnConfetti}
            setSearchResults= {setSearchResults}
          />
          
        </div>
        
      }
      <div style={{height:"100%",display:"flex",width:"100%",padding:"0",marginTop:"30px"}}>
        <InfiniteLooping > 
          {
          businessPictures!==null && 
            businessPictures.map((image)=>{
              return(
                <motion.div
                  whileHover={{ scale: 1.10 }}
                  whileTap={{ scale: 0.8 }}
                >
                <a href = {image.url}>
                  <img src={`${image.image_url}`} width={"200vw"} height={"170vh"} alt={image.name} style={{borderRadius: "5px",marginLeft:"12.5px",marginRight:"12.5px"}}/>
                </a>
                </motion.div>
              ) 
              })
          }
        </InfiniteLooping>
      </div>
      {/* <Dialog>

      </Dialog> */}
      </ThemeProvider>
    </div>
  );
}

export default App;