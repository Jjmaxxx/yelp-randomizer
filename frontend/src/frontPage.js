import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InfiniteLooping from "./InfiniteLooping.js";
import { Card, CardActions, Button } from "@mui/material";
let staticPhotos = ["./images/stockphoto1.jpg","./images/stockphoto2.jpg","./images/stockphoto3.jpg","./images/stockphoto4.jpg","./images/stockphoto5.png"];
function FrontPage(props){
    const [images,setImages] = useState([]);
    useEffect(()=>{
        setImages(props.pictures);
        console.log("front page")
    },[props.pictures]);
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Card sx={{width:"100%",margin:"20px",height:props.windowheight-300,marginTop:"10px",display:"flex",minHeight:"400px",minWidth:props.windowwidth}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <h1 style={{fontSize:"50px",fontFamily:"poppins,Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0"}}>Don't know where to eat?</h1>
                        <h1 style={{fontSize:"50px",fontFamily:"poppins,Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0"}}>Let this website decide!</h1>
                        <Button onClick = {()=>{props.changePage("Form")}} sx={{paddingLeft: "20px",paddingRight: "20px",margin:"20px"}}><SearchIcon/>Start</Button>
                    </div>   
                </Card>
            </div>
            <div style={{display:"flex",width:"100%",alignItems:"center",marginTop:"15px",padding:"0"}}>
                <InfiniteLooping>
                    {
                        images===null ? 
                            (()=>{staticPhotos.map((src)=>{
                                return(<img src={require(`${ src}`)} width={"100%"} height={"784px"} alt={src}></img>) 
                            })})

                        :
                        images.map((image)=>{
                            return(
                                <a href = {image.url}>
                                    <img src={`${image.image_url}`} width={"184px"} height={"150px"} alt={image.name} style={{borderRadius: "5px",marginLeft:"12.5px",marginRight:"12.5px"}}/>
                                </a>
                            ) 
                        })
                    }
                </InfiniteLooping>
            </div>
        </div>
    )
}
export default FrontPage;