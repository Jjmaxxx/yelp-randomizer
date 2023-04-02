import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardActions, Button } from "@mui/material";
// let staticPhotos = ["./images/stockphoto1.jpg","./images/stockphoto2.jpg","./images/stockphoto3.jpg","./images/stockphoto4.jpg","./images/stockphoto5.png"];
function FrontPage(props){
    const [images,setImages] = useState([]);
    useEffect(()=>{
        setImages(props.pictures);
    },[props.pictures]);
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight}}>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Card sx={{width:"100%",margin:"20px",height:props.windowheight-200,marginTop:"10px",display:"flex"}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"10px"}}>
                        <h1 style={{fontSize:"50px",fontFamily:"poppins,Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0"}}>Don't know where to eat?</h1>
                        <h1 style={{fontSize:"50px",fontFamily:"poppins,Helvetica Neue, Helvetica, Arial, sans-serif",margin:"0"}}>Let this website decide!</h1>
                        <Button sx={{paddingLeft: "20px",paddingRight: "20px",margin:"20px"}}><SearchIcon/>Start</Button>
                    </div>   
                </Card>
            </div>
            <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center"}}>
                {
                    images===null ? 
                        (()=>{return(<p>no photos</p>)})
                        // staticPhotos.map((src)=>{
                        //     return(<img src={require(`${ src}`)} width={"100%"} height={"784px"} alt={src}></img>) 
                        // })
                    :
                    images.map((image)=>{
                        return(<img src={`${image.image_url}`} width={"202px"} height={"207.5px"} alt={image.name} style={{transition:"opacity 0.5s",opacity:"1"}}></img>) 
                    })
                }
            </div>
        </div>
    )
}
export default FrontPage;