import './App.css';
import { useState,useEffect, useRef } from 'react';
import logo from "./dvd_logo.png"

function App() {

  const [leftPos,setLeftPos]=useState(0);
  const [topPos,setTopPos]=useState(0); 

  const [x,setX]=useState(2)
  const [y,setY]=useState(2)

  const [xwidth,setWidth]=useState(getWindowDimensions().width-200)
  const [yheight,setHeight]=useState(getWindowDimensions().height-100)

  const [randomrgb,setRGB]=useState([0,0,0])
  const ref=useRef(null)


  function getWindowDimensions(){
    const {innerWidth:width,innerHeight:height}=window;
    return {width,height}
  }

  function randomize(){
    let r,g,b;
    r=Math.floor(Math.random()*255)
    g=Math.floor(Math.random()*255)
    b=Math.floor(Math.random()*255)

    setRGB([r,g,b])
  }

  //create a listener for window resize
  useEffect(()=>{
    function handleResize(){
      setWidth(getWindowDimensions().width-200)
      setHeight(getWindowDimensions().height-100)
      setLeftPos(0)
      setTopPos(0)

      console.log(xwidth,yheight)
    }

    window.addEventListener('resize',handleResize)
    return()=>window.removeEventListener('resize',handleResize)
  },[])
  
  function move(){

    if(ref.current){
      let z=setInterval(()=>{
        
        setLeftPos((prevLeftPos)=>prevLeftPos+x)
        setTopPos((prevTopPos)=>prevTopPos+y)
        
        if(leftPos>=(xwidth-Math.abs(x)) || leftPos<=0){

          if(leftPos>=(xwidth-Math.abs(x))){
            setX(-2)
          }

          else{
            setX(2)
          }

          randomize()
        }
        if(topPos>=(yheight-Math.abs(y)) || topPos<=0){
          
          if(topPos>=(yheight-Math.abs(y))){
            setY(-2)
          }

          else{
            setY(2)
          }

          randomize()
        }
      },10)
      
      return()=>clearInterval(z)
    }
  }

  useEffect(move,[leftPos,topPos])

  return (
    <div className="App" ref={ref}>
      <img src={logo} className="dvd_logo" style={{top:`${topPos}px`,left:`${leftPos}px`,backgroundColor:`rgb(${randomrgb[0]},${randomrgb[1]},${randomrgb[2]})`}}/>
    </div>
  );
}
export default App;
