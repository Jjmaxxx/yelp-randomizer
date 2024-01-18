import React from 'react';
import './App.css';
import {Rating, FormControlLabel, Select, Popover, MenuItem, Menu, Typography, TextField, Divider,CssBaseline,Checkbox, Slider } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import {StarIcon, EmptyStarIcon}  from "./utils/Stars.js";
import theme from './utils/theme.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import BentoIcon from '@mui/icons-material/Bento';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import TapasIcon from '@mui/icons-material/Tapas';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import SetMealIcon from '@mui/icons-material/SetMeal';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import IcecreamIcon from '@mui/icons-material/Icecream';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import CakeIcon from '@mui/icons-material/Cake';
import { useMapEvents,MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
// let starRatings = ["./images/stars/0 star.png","./images/stars/1 star.png","./images/stars/2 star.png","./images/stars/3 star.png","./images/stars/4 star.png"];
const prices = ["$","$$","$$$","$$$$"];

function Form(props){
    const [mapKey, setMapKey] = useState(0);
    const [inputText,setInputText] = React.useState("");
    const [categoryMenu,setCategoryMenu] = React.useState(null);
    const [foodMenu,setFoodMenu] = React.useState(null);
    const [tags,setTags] = React.useState([]);
    const [size, setSize] = React.useState(8046.7); 
    const [latitude,setLatitude] = React.useState(0);
    const [longitude,setLongitude] = React.useState(0);
    const [anchorPop, setAnchorPop] = React.useState(null);
    const [priceStyle, setPriceStyle] = React.useState(["prices","prices","prices","prices"])
    const [sortBy, setSortBy]= React.useState("best_match");
    const [open,setOpen] = React.useState(true);
    const [ratings,setRatings] = React.useState(0);
    const categoryOpen = Boolean(categoryMenu);
    const foodOpen = Boolean(foodMenu);
    const openPop = Boolean(anchorPop);
    useEffect(()=>{
        setMapKey(props.latitude);
        setLatitude(props.latitude);
        setLongitude(props.longitude);
    },[props.latitude,props.longitude]);
    const categoryMenuOpen = (event)=>{
        setCategoryMenu(event.target);
    }
    const categoryMenuClose=(event)=>{
        setCategoryMenu(null);
    }
    const foodMenuOpen = (event)=>{
        setFoodMenu(event.target);
    }
    const foodMenuClose=(event)=>{
        setFoodMenu(null);
    }
    const openHelp = (event)=>{
        setAnchorPop(event.currentTarget);
    }
    const closeHelp = ()=>{
        setAnchorPop(null);
    }
    const handleSort = (event)=>{
        //console.log(event.target.value);
        switch(event.target.value){
            case "2":
                setSortBy("rating")
                break;
            case "3":
                setSortBy("review_count")
                break;
            case "4":
                setSortBy("distance")
                break;
            default:
                setSortBy("best_match")
        }     
    }
    const handleOpen = (event) =>{
        if(open){
            setOpen(false);
        }else{
            setOpen(true);
        }
    }
    const inputTag = (event) =>{
        //console.log(event);
        if(event.key === "Enter"){
            addTag(event.target.value);
            setInputText("");
        }
    }

    const addTag = (tag)=>{
        if(!tags.includes(tag)){
            let newArray = [...tags,tag];
            setTags(newArray);
        }
    }
    const removeTag = (tag)=>{
        //console.log(tag);
        let removeIndex = tags.indexOf(tag);
        let listOfTags = [...tags];
        listOfTags.splice(removeIndex,1);
        setTags(listOfTags);
    }
    const setMapSize = (event)=>{
        // console.log(event.target.value);
        let miles = event.target.value;
        let meters = miles * 1609.34;
        if(meters > 40000){
            meters = 40000;
        }
        setSize(meters);
    }   
    const MapEvents = () => {
        useMapEvents({
          click(e) {
            setLatitude(e.latlng.lat);
            setLongitude(e.latlng.lng);
          },
        });
        return false;
    }
    const changePrice = (index)=>{
        let priceStyles = priceStyle.map((price,i)=>{
            if(index === i){
                if(price=== "prices"){
                    return "priceSelected";
                }else{
                    return "prices";
                }
            }else{
                return price
            }
        })
        setPriceStyle(priceStyles);
    }
    return(
        <div className='Home' style={{width:props.windowwidth, minHeight:"400px"}}>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="formPage">
                <div className="formCategories">
                    <div className="formCategoriesTags">
                        <p style={{fontSize:"30px",marginRight:"10px"}}>Tags:</p>
                        <div className="formTags">
                            {
                                tags.map((tag)=>{
                                    return(
                                        <p onClick = {()=>{removeTag(tag)}}className="tag">{tag}</p>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Divider style={{marginBottom:"5px"}}/>
                    <div className="formCategoriesSelections">
                        
                        <div className="category" onClick = {categoryMenuOpen }onMouseOver={categoryMenuOpen}>
                            Cuisines
                            <KeyboardArrowDownIcon/>
                        </div>
                        <Menu
                            anchorEl={categoryMenu}
                            open={categoryOpen}
                            onClose={categoryMenuClose}
                            MenuListProps={{ onMouseLeave: ()=>{
                                //disabled for mobile
                                if(props.windowwidth > 768){
                                    categoryMenuClose()
                                }
                            }}}
                            disableRestoreFocus={true}
                            // onFocus={usePreventScrollOnFocus()}
                        >
                            <div className = "categoryMenu" onClick={categoryMenuClose} style={{width:"280px"}}>
                                <div className = "categoryColumn">
                                    <MenuItem onClick={()=>{addTag("Chinese")}}>
                                        <TakeoutDiningIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Chinese
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Japanese")}}>
                                        <BentoIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Japanese
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Mexican")}}>
                                        <TapasIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Mexican
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Thai")}}>
                                        <KebabDiningIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Thai
                                        </Typography>
                                    </MenuItem>
                                </div>
                                <div className = "categoryColumn">
                                    <MenuItem onClick={()=>{addTag("Indian")}}>
                                        <RiceBowlIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Indian
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Korean")}}>
                                        <SetMealIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Korean
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("American")}}>
                                        <FastfoodIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            American
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Italian")}}>
                                    <DinnerDiningIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Italian
                                        </Typography>
                                    </MenuItem>
                                </div>
                            </div>
                        </Menu>
                        <div className="category" onClick = {foodMenuOpen }onMouseOver={foodMenuOpen}>
                            Foods
                            <KeyboardArrowDownIcon/>
                        </div>
                        <Menu
                            anchorEl={foodMenu}
                            open={foodOpen}
                            onClose={foodMenuClose}
                            MenuListProps={{ onMouseLeave: ()=>{
                                //disabled for mobile
                                if(props.windowwidth > 768){
                                    foodMenuClose()
                                }
                            }}}
                            getContentAnchorEl={null}
                            disableRestoreFocus={true}
>
                            <div className = "categoryMenu" onClick={foodMenuClose} style={{width:"280px"}}>
                                <div className = "categoryColumn">
                                    <MenuItem onClick={()=>{addTag("Noodles")}}>
                                        <RamenDiningIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Noodles
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Pizza")}}>
                                        <LocalPizzaIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Pizza
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Burger")}}>
                                        <LunchDiningIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Burger
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Coffee")}}>
                                        <LocalCafeIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Coffee
                                        </Typography>
                                    </MenuItem>
                                </div>
                                <div className = "categoryColumn">
                                    <MenuItem onClick={()=>{addTag("Ice Cream")}}>
                                        <IcecreamIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Ice Cream
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Cake")}}>
                                        <CakeIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Cake
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Tea")}}>
                                        <EmojiFoodBeverageIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Tea
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={()=>{addTag("Soup")}}>
                                    <SoupKitchenIcon style={{marginRight:"3px"}}/>
                                        <Typography style={{fontFamily:"poppins",fontSize:"16px"}}>
                                            Soup
                                        </Typography>
                                    </MenuItem>
                                </div>
                            </div>
                        </Menu>
                        <TextField 
                            label="Input Custom Tag" 
                            variant="standard" 
                            color="primary"
                            value ={inputText}
                            onChange = {(e)=>(setInputText(e.target.value))}
                            onKeyDown = {inputTag}
                            placeholder="e.g. lunch, waffles"
                            inputProps={{style: {fontFamily:"poppins", width:"200px",fontSize:"20px"}}}
                        />
                        {/* <Checkbox 
                            icon={<ShuffleIcon />}
                            checkedIcon={<ShuffleOnIcon />} 
                            color="secondary"
                            disableRipple
                            style={{
                                transform: "scale(1.5)",
                                marginTop:"20px"
                            }}
                        /> */}
                        {/* <p>Foods</p>
                        <p>Input Custom</p> */}
                    </div>
                </div>
                <div className="formAttributes">
                    <div className ="mapContainer">
                        <div className="mapHeadingContainer">
                            <div className="mapTitle">Search Radius</div>
                            <div
                                onMouseEnter={openHelp}
                                onMouseLeave={closeHelp}
                            >
                                <HelpOutlineIcon 
                                    style={{marginLeft:'5px',marginTop:"7px"}} 
                                />
                            </div>
                            <Popover
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                color="secondary"
                                open={openPop}
                                anchorEl={anchorPop}
                                onClose={closeHelp}
                                disableRestoreFocus
                            >
                                Click to Move the Circle. Hold and Click to Move the Map.
                            </Popover>
                        </div>
                        {/* https://react-leaflet.js.org/docs/start-setup/ */}
                        <MapContainer 
                            key = {mapKey} 
                            zoom={10} 
                            center={[latitude, longitude]}  
                            doubleClickZoom = {false} 
                            style={{border:"2px red solid"}}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {/* each radius is a meter */}
                            <Circle center={[latitude, longitude]} radius={size} />
                            <MapEvents />
                            <Marker position={[props.latitude, props.longitude]}/>
                        </MapContainer>
                        <Slider 
                            color="secondary"
                            onChange={setMapSize}
                            step={0.1}
                            min={0.1}
                            max={25}
                            defaultValue={5}
                            style={{width:"350px",zIndex:"1000"}}
                            valueLabelDisplay="auto"
                            marks={[{value:0.1,label:"0.1 mi"},{value:25.0,label:"25.0 mi"},{value:12.5,label:"12.5 mi"}]}
                        />
                    </div>
                    {
                        props.windowwidth > 852 &&
                            <Divider 
                                orientation="vertical"
                                sx={{ height:"300px",borderRightWidth: 3, marginLeft:"25px",marginRight:"25px"}} 
                            />
                    }
                   
                    <div className="filterContainer">
                        <div className="filterTitle">
                            Filters
                        </div>
                        <div className="filters">
                            <div className="priceContainer">
                                <p style={{fontSize:'20px'}}>Price:</p>
                                {prices.map((price,index)=>{
                                    return(
                                            <p onClick= {()=>{changePrice(index)}} className = {priceStyle[index]}>
                                                {prices[index]}
                                            </p>
                                        )
                                    })
                                }
                            </div>
                            <div className='ratingsContainer'>
                                <p style={{fontSize:'20px',marginRight:"5px"}}>Ratings:</p>
                                <div className="ratings">
                                    <Rating
                                        onChange={(event,newVal)=>{setRatings(newVal)}}
                                        size="large"
                                        precision={0.5}
                                        emptyIcon={<EmptyStarIcon  />}
                                        icon={<StarIcon />}
                                        sx={{
                                            "& .MuiRating-icon": {
                                                width: '2rem',
                                            },
                                            display:"flex",
                                            gap:"3px"
                                          }}
                                    />
                                    <p>& up</p>
                                    {/* <FormControl fullWidth={true}>
                                    <Select
                                        defaultValue={0}
                                        sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                                        onChange={handleRatings}
                                    >
                                        {starRatings.map((image,index)=>{
                                            return(
                                                <MenuItem value={index}>
                                                    <div style={{display:"flex"}}>
                                                        <img src={require(`${ image}`)} width = "215px" height="40px"alt={image}/>
                                                        <p style={{marginLeft:"10px",fontSize:'13px',marginTop:"8px"}}>& up</p>
                                                    </div>
                                                    
                                                </MenuItem>
                                            )
                                        })} 
                                    </Select>
                                    </FormControl> */}
                                </div>
                                
                            </div>
                            <div className="filterSortOpenContainer">
                                <div className="sortContainer">
                                    <div>
                                        Sort By:
                                    </div>
                                    <Select
                                        native
                                        defaultValue={1}
                                        color="secondary"
                                        InputLabelProps={{
                                            style: { color: 'red' },
                                        }}
                                        onChange={handleSort}
                                        style={{fontSize:"18px"}}
                                    >
                                        <option value={1}>Best Match</option>
                                        <option value={2}>Ratings</option>
                                        <option value={3}>Review Count</option>
                                        <option value={4}>Distance</option>
                                    </Select>
                                </div>
                                <FormControlLabel
                                    value="top"
                                    control={
                                    <Checkbox 
                                        color="secondary"
                                        style={{
                                            transform: "scale(1.5)",
                                            fontSize:"25px"
                                        }}
                                        disableRipple
                                    />}
                                    label="Open?"
                                    labelPlacement="top"
                                    checked={open}
                                    onChange={handleOpen}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button">            
                    <motion.div
                        whileHover={{ scale: 1.10 }}
                        whileTap={{ scale: 0.8 }}
                        onClick = {()=>{
                            props.setFormData({
                                rating:ratings,
                                sortBy:sortBy,
                                open:open,
                                prices:priceStyle,
                                tags:tags, 
                                size:size,
                                latitude:latitude,
                                longitude:longitude
                            },
                            "Result"
                            )
                        }} 
                        sx={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            margin:"20px",
                        }}
                    > 
                    <div className='buttonText'>
                        Generate
                    </div>
                    </motion.div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}
export default Form;