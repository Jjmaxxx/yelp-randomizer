import React, { useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
let animationFrame;
let spawnConfetti;
const Canvas = forwardRef((props,ref) => {
  const canvasRef = useRef(null);
  let confetti = [];
  let draw = (ctx)=>{
    // ctx.fillStyle = 'rgba(255,255,255)';
    ctx.clearRect(0,0,props.windowwidth,props.windowheight);
    for(let i=0;i<confetti.length;i++){
        confetti[i].update();
      }
  }
  
  //useEffect runs with component is actually mounted so canvas doesnt return null
  useEffect(()=>{
    let canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    canvas.width = props.windowwidth;
    canvas.height = props.windowheight;
    window.cancelAnimationFrame(animationFrame);
    const render = () =>{
      draw(ctx);
      animationFrame = window.requestAnimationFrame(render);
    }
    render()
    class Confetti{
        constructor(x,y,xMove){
            this.x=x;
            this.y=y;
            this.xVelocity = Math.random()*xMove;
            this.yVelocity = Math.random()* (-((canvas.height/150)*2)-(-((canvas.height/120)*2))) +(-((canvas.height/120)*2));
            this.tilt = Math.ceil(Math.random()* (10-(-10)) +(-10));
            this.length= Math.ceil(Math.random()* (10-(4)) +(4))
            this.rgb = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
            this.lineWidth = Math.floor(Math.random()* (5-(2)) +2)
            this.maxYVelocity = Math.random()* (4-(3)) +(3);
            this.ang=0;
            this.rotationSpeed = Math.random()*(0.03-(-0.03))+(-0.03);
        }
        update(){
            ctx.save();
            this.ang+=this.rotationSpeed;
            
            this.x+=this.xVelocity;
            this.y+=this.yVelocity;
            
            if (this.yVelocity < 0){
                this.yVelocity+=0.2;
                this.xVelocity= this.xVelocity/1.01;
            }else if(this.yVelocity<this.maxYVelocity){
                this.yVelocity+=0.1;
                this.xVelocity= this.xVelocity/1.1;
            }
            // this.yVelocity+=0.2;
            // this.xVelocity= this.xVelocity/1.01;
            ctx.beginPath();
            
            ctx.moveTo(this.x,this.y);
            ctx.translate(this.x, this.y);
            ctx.rotate(this.ang);
            ctx.translate(-this.x, -this.y);
            ctx.lineTo(this.x+this.tilt,this.y+this.length);
            ctx.lineWidth = this.lineWidth;
            if(this.y>canvas.height+500){
              confetti.splice(0,1);
            }
            ctx.strokeStyle= `rgb(
                ${this.rgb[0]},
                ${this.rgb[1]},
                ${this.rgb[2]}
            )`;
            ctx.stroke();
            ctx.restore();
        }
    }
    let numOfConfetti = Math.floor(canvas.width/10);
    spawnConfetti= ()=>{
        if(confetti.length < 1500){
            for(let i=0;i<numOfConfetti;i++){
                confetti.push(new Confetti(0, canvas.height*0.5,canvas.width/100))
                confetti.push(new Confetti(canvas.width, canvas.height*0.5,-canvas.width/100))
            }
        }
    }
    //
  },[props.windowwidth,props.windowheight])
  useImperativeHandle(ref,()=>({
    getConfetti(){
        spawnConfetti();
    }
  }));
  return <canvas ref={canvasRef} {...props}/>
});

export default Canvas