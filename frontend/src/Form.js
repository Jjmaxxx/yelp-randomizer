import React from 'react';
import './App.css';
import { MenuItem, Menu, Typography, TextField, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';import { useState, useEffect } from 'react';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import TapasIcon from '@mui/icons-material/Tapas';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import SetMealIcon from '@mui/icons-material/SetMeal';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
function Form(props){
    const [categoryMenu,setCategoryMenu] = React.useState(null);
    const [tags,setTags] = React.useState([]);
    const categoryOpen = Boolean(categoryMenu);
    useEffect(()=>{
        console.log("form page")
    });
    const categoryMenuOpen = (event)=>{
        setCategoryMenu(event.currentTarget);
    }
    const categoryMenuClose=(event)=>{
        setCategoryMenu(null);
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
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight}}>
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
                    <Divider/>
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
                                        <RamenDiningIcon style={{marginRight:"3px"}}/>
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
                        <div className="category">
                            Foods
                            <KeyboardArrowDownIcon/>
                        </div>
                        <TextField 
                            style={{marginBottom:"20px"}}
                            label="Input Custom Tag" 
                            variant="standard" 
                        />
                        {/* <p>Foods</p>
                        <p>Input Custom</p> */}
                    </div>
                </div>
                <div className="formAttributes">

                </div>
            </div>
        </div>
    )
}
export default Form;