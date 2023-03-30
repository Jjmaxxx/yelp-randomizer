import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
let staticPhotos = ["./images/stockphoto1.jpg","./images/stockphoto2.jpg","./images/stockphoto3.jpg","./images/stockphoto4.jpg","./images/stockphoto5.png"];
function FrontPage(props){
    const [images,setImages] = useState([]);
    useEffect(()=>{
        setImages(props.pictures);
    },[props.pictures]);
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight}}>
            <div>
                {
                    images===null ? 
                        staticPhotos.map((src)=>{
                            return(<img src={require(`${ src}`)} width={"800px"} height={"100%"} alt={src}></img>) 
                        })
                    :
                    images.map((image)=>{
                        return(<img src={`${image.image_url}`} width={"800px"} height={"100%"} alt={image.name} style={{transition:"opacity 0.5s",opacity:"1"}}></img>) 
                    })
                }
            </div>
        </div>
    )
}
export default FrontPage;