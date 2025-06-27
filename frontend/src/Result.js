import React from 'react';
import './App.css';
import { Divider, List, ListItem, ListItemButton, Dialog,CssBaseline, CircularProgress} from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './utils/theme.js';
import { useEffect, useState } from 'react';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
let allRestaurants = [];
function Result(props){
    const restaurants = props.results;
    const [resultsOpen, setResultsOpen] = useState(false);
    const [theRestauraunt, setTheRestauraunt] = useState(null);
    const [openFoundNone, setFoundNone] = useState(false);
    useEffect(()=>{
        document.body.scrollTo({ top: 0 });
        setTheRestauraunt(null);
        if(restaurants != null){
            if(restaurants.length === 0){
                console.log('didnt find anythingm');
                setFoundNone(true);
            }else{
                pickRestauraunt();
            }
        }
    },[restaurants]);
    const pickRestauraunt = () =>{
        props.spawnConfetti();
        if(allRestaurants.length<1){
            allRestaurants = [...props.results];
        }
        let randomRestaurant = allRestaurants[Math.floor(Math.random() * allRestaurants.length)];
        allRestaurants.splice(allRestaurants.indexOf(randomRestaurant),1);
        setTheRestauraunt(randomRestaurant);
    }
    const handleResultsClose = ()=>{
        setResultsOpen(false);
    }
    const handleResultsOpen = ()=>{
        setResultsOpen(true);
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
                            • {theRestauraunt.price} • {theRestauraunt.rating}★ ({theRestauraunt.review_count} reviews) • 
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${props.latitude},${props.longitude}&destination=${theRestauraunt.coordinates.latitude},${theRestauraunt.coordinates.longitude}`}>{Math.round((theRestauraunt.distance/1609)*10)/10} mi away</a>
                        </div>
                        <div className="optionButtons">
                            
                            <div className="resultsButton" onClick={()=>{handleResultsOpen()}}>            
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
                    <Dialog
                        open={resultsOpen}
                        onClose = {handleResultsClose}
                        hideBackdrop={true}
                        
                    >   
                        <List style={{width:"100%"}}>
                        <Divider/>
                        {
                            restaurants.map((restaurant)=>{
                                return(
                                    <div> 
                                        <ListItem className="listItemStyle">
                                            <ListItemButton
                                             onClick = {(event)=>{
                                                window.location.href=restaurant.url;
                                             }}
                                             className ="listItemName" 
                                             disableRipple >
                                                {restaurant.name}
                                            </ListItemButton>
                                            <div>
                                                {restaurant.price} • {restaurant.rating}★ ({restaurant.review_count} reviews) •
                                                <a href={`https://www.google.com/maps/dir/?api=1&origin=${props.latitude},${props.longitude}&destination=${restaurant.coordinates.latitude},${restaurant.coordinates.longitude}`}> {Math.round((restaurant.distance/1609)*10)/10} mi away</a>
                                            </div>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                )
                            })
                        }
                        </List>
                        
                </Dialog>
                </div>
            : openFoundNone ? 
                <div style={{display:"flex", textAlign:"center",flexDirection:'column',justifyContent:"center",alignItems:"center",height:props.windowheight}}>
                    <div>
                        could not find anything :( 
                    </div>
                    <div>
                        click on the icon in the top left to return.
                    </div>
                    <div>
                        (is your search radius in the ocean or antarctica or something ?)
                    </div>
                    <br/>
                    <i>
                        (is the place even open ?)
                    </i>
                    
                </div>

            :    
                <div style={{display:'flex',justifyContent:"center",alignItems:"center", zIndex:"100",minHeight:"600px"}} key ="loading">
                    <CircularProgress color="secondary" />
                </div>
            }

                {/* <Zoom in={resultsOpen}> */}

                {/* </Zoom> */}
            
            </ThemeProvider>
        </div>
    )
}
export default Result;