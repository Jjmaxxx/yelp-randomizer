import React from 'react';
import './App.css';
import {CssBaseline} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './utils/theme.js';
import { useEffect, useState,useRef } from 'react';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';import { motion } from "framer-motion";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Confetti from './Confetti.js';

function Result(props){
    const restaurants = props.results;
    const confettiRef = useRef();
    const [theRestauraunt, setTheRestauraunt] = useState(null);
    useEffect(()=>{
        pickRestauraunt();
    },[restaurants]);

    const pickRestauraunt = () =>{
        if(restaurants != null){
            if(confettiRef.current != null){
                confettiRef.current.getConfetti();
            }
            setTheRestauraunt(restaurants[Math.floor(Math.random() * restaurants.length)]);
        }
    }
    return(
        <div className='Home' style={{width:props.windowwidth, minHeight:"400px"}}>
            
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            {theRestauraunt !=null ?
                <div className= "resultsPage">
                    <div className="resultsContainer">
                        <div className="resultsTitle">
                            {theRestauraunt.name}
                        </div>
                        <div className="resultsImage">
                            <a href = {theRestauraunt.url}>
                                <img src={`${theRestauraunt.image_url}`} width={props.windowwidth*.75} height={props.windowwidth*.75} alt={theRestauraunt.name} style={{border:"2px solid red",borderRadius: "5px",maxWidth:"500px",maxHeight:"500px"}}/>
                            </a>
                        </div>
                        
                        <div className="resultsData">
                            {
                                theRestauraunt.categories.map((category,num)=>{
                                    
                                    return(
                                        <p style={{display:'flex',alignItems:'center',margin:"0",padding:"0"}}>
                                            {category.title}
                                            {theRestauraunt.categories.length-1 !== num &&
                                                <p style={{height:"100%",margin:"0",padding:"0"}}>,</p>
                                            }
                                        </p>
                                    )
                                })
                            }
                            • {theRestauraunt.price} • {theRestauraunt.rating} ({theRestauraunt.review_count} reviews) • 
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${props.latitude},${props.longitude}&destination=${theRestauraunt.coordinates.latitude},${theRestauraunt.coordinates.longitude}`}>{Math.round((theRestauraunt.distance/1609)*10)/10} mi away</a>
                        </div>
                        <div className="optionButtons">
                            
                            <div className="resultsButton">            
                                <VisibilityOutlinedIcon/>
                                <div className='resultsButtonText'>
                                    Show results
                                </div>
                            </div>
                            <div className="resultsButton" onClick={()=>{pickRestauraunt()}}>
                                <CasinoOutlinedIcon/>            
                                <div className='resultsButtonText'>
                                    Reroll
                                </div>
                            </div>
                            <div className="resultsButton" onClick={()=>{props.changePage("Form")}}>
                                <RestartAltOutlinedIcon/>
                                <div className='resultsButtonText'>
                                    Reset
                                </div>
                            </div>
                        </div>
                    </div>
                    <Confetti ref = {confettiRef} windowwidth={props.windowwidth} windowheight = {props.windowheight} style={{position:'absolute', right:0}}/>
                </div>
            :
                <div>
                    loading
                </div>
            }
            </ThemeProvider>
        </div>
    )
}
export default Result;