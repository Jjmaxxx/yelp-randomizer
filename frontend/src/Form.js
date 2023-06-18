import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
function Form(props){
    useEffect(()=>{
        console.log("form page")
    });
    return(
        <div className='Home' style={{width:props.windowwidth,height:props.windowheight}}>
            <div>yo whats up</div>
        </div>
    )
}
export default Form;