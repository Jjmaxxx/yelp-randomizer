import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardActions, Button } from "@mui/material";
import { motion } from "framer-motion";
function FrontPage(props){
    // const [images,setImages] = useState([]);
    useEffect(()=>{
        console.log("front page")
    },[]);
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight, minHeight:"400px"}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Card sx={{width:"100%",margin:"20px",height:props.windowheight,marginTop:"10px",display:"flex",minHeight:"400px",minWidth:props.windowwidth}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <h1 style={{fontSize:"55px",margin:"0"}}>Don't know where to eat?</h1>
                        <h1 style={{fontSize:"55px",margin:"0"}}>Let this website decide!</h1>
                        {/* button code :/ */}
                        <div style={{color:"white",fontSize:"30px",fontWeight:"1000 ",borderRadius:"5px",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:'red', minWidth:"130px",minHeight:"60px"}}>            
                            <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.8 }}
                                onClick = {()=>{props.changePage("Form")}} 
                                sx={{
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    margin:"20px",
                                }}
                            > 
                            <div style={{fontFamily:"Roboto",display:"flex",alignItems:"center",justifyContent:"center",userSelect: "none"}}>
                                <SearchIcon fontSize="large"/>
                                Start
                            </div>
                            </motion.div>
                        </div> 
                    </div>   
                </Card>
            </div>
        </div>
    )
}
export default FrontPage;