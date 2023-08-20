import React from 'react';
import './App.css';
import {CssBaseline, CircularProgress} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './utils/theme.js';
import { useEffect, useState } from 'react';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Result(props){
    const restaurants = props.results;
    const [theRestauraunt, setTheRestauraunt] = useState(null);
    useEffect(()=>{
        setTheRestauraunt(null);
        if(restaurants != null){
            pickRestauraunt();
        }
    },[restaurants]);
    const pickRestauraunt = () =>{
        props.spawnConfetti();
        setTheRestauraunt(restaurants[Math.floor(Math.random() * restaurants.length)]);
    }
    return(
        <div className='Home' style={{width:props.windowwidth, minHeight:"600px"}}>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            {theRestauraunt !=null ?
                <div key ="restaurant" className= "resultsPage">
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
                            <div className="resultsButton" onClick={()=>{props.setSearchResults(null);props.changePage("Form")}}>
                                <RestartAltOutlinedIcon/>
                                <div className='resultsButtonText'>
                                    Reset
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            :
                <div style={{display:'flex',justifyContent:"center",alignItems:"center", zIndex:"100",minHeight:"600px"}} key ="loading">
                    <CircularProgress color="secondary" />
                </div>
            }
            </ThemeProvider>
        </div>
    )
}
export default Result;