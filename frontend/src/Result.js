import React from 'react';
import './App.css';
import {CssBaseline} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './utils/theme.js';
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
function Result(props){
    const restaurants = props.results;
    const [theRestauraunt, setTheRestauraunt] = useState(null);
    useEffect(()=>{
        pickRestauraunt();
    },[restaurants]);

    const pickRestauraunt = () =>{
        if(restaurants != null){
            console.log(restaurants);
            setTheRestauraunt(restaurants[Math.floor(Math.random() * restaurants.length)]);
            console.log(theRestauraunt);
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
                                            {theRestauraunt.categories.length-1 != num &&
                                                <p>,</p>
                                            }
                                        </p>
                                    )
                                })
                            }
                            | {theRestauraunt.price} | {theRestauraunt.rating} ({theRestauraunt.review_count} reviews)
                        </div>
                    </div>
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