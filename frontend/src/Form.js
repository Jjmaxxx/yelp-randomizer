import React from 'react';
import './App.css';
import { IconButton, Popover, MenuItem, Menu, Typography, TextField, Divider,CssBaseline,Checkbox, Slider } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import theme from './utils/theme.js';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from 'react';
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
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import CakeIcon from '@mui/icons-material/Cake';
import { useMapEvents,MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet';
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
    const categoryOpen = Boolean(categoryMenu);
    const foodOpen = Boolean(foodMenu);
    const openPop = Boolean(anchorPop);
    useEffect(()=>{
        setMapKey(props.latitude);
        setLatitude(props.latitude);
        setLongitude(props.longitude);
    },[props.latitude,props.longitude]);
    const categoryMenuOpen = (event)=>{
        setCategoryMenu(event.currentTarget);
    }
    const categoryMenuClose=(event)=>{
        setCategoryMenu(null);
    }
    const foodMenuOpen = (event)=>{
        setFoodMenu(event.currentTarget);
    }
    const foodMenuClose=(event)=>{
        setFoodMenu(null);
    }
    const openHelp = (event)=>{
        setAnchorPop(event.target);
    }
    const closeHelp = ()=>{
        setAnchorPop(null);
    }
    const inputTag = (event) =>{
        console.log(event);
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
        console.log(tag);
        let removeIndex = tags.indexOf(tag);
        let listOfTags = [...tags];
        listOfTags.splice(removeIndex,1);
        setTags(listOfTags);
    }
    const setMapSize = (event)=>{
        // console.log(event.target.value);
        setSize(event.target.value * 1609.34);
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
                            onMouseLeave={categoryMenuClose}
                            MenuListProps={{ onMouseLeave: categoryMenuClose }}
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
                            onMouseLeave={foodMenuClose}
                            MenuListProps={{ onMouseLeave: foodMenuClose }}
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
                        <Checkbox 
                            icon={<ShuffleIcon />}
                            checkedIcon={<ShuffleOnIcon />} 
                            color="secondary"
                            disableRipple
                            style={{
                                transform: "scale(1.5)",
                                marginTop:"20px"
                            }}
                        />
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
                                    width:"350px",
                                    height:"300px"
                                }}
                                color="secondary"
                                open={openPop}
                                anchorEl={anchorPop}
                                anchorOrigin={{
                                    vertical: -75,
                                    horizontal: 'left',
                                }}
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
                            max={50}
                            defaultValue={5}
                            style={{width:"300px",zIndex:"1000"}}
                            valueLabelDisplay="auto"
                            marks={[{value:0.1,label:"0.1 mi"},{value:25.0,label:"25.0 mi"},{value:50.0,label:"50.0 mi"}]}
                        />
                    </div>
                    <Divider 
                        orientation="vertical"
                        sx={{ height:"300px",borderRightWidth: 3, }} 
                    />
                    <div className="filterContainer">
                        <div className="filterTitle">
                            Filters
                        </div>
                        <div className="filters">
                            <div className="priceContainer">
                                <p style={{fontSize:'15px'}}>Price:</p>
                                <p className="prices">$</p>
                                <p className="prices">$$</p>
                                <p className="prices">$$$</p>
                                <p className="prices">$$$$</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ThemeProvider>
        </div>
    )
}
export default Form;