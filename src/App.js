import './App.css';
import { useState,useEffect, useRef } from 'react';
import logo from "./dvd_logo.png"

function App() {

  const [leftPos,setLeftPos]=useState(0);
  const [topPos,setTopPos]=useState(0); 

  const [x,setX]=useState(2)
  const [y,setY]=useState(2)

  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)

  const [randomrgb,setRGB]=useState([255,255,255])
  const ref=useRef(null)

  function randomize(){
    let r,g,b;
    r=Math.floor(Math.random()*255)
    g=Math.floor(Math.random()*255)
    b=Math.floor(Math.random()*255)

    setRGB([r,g,b])
  }

  useEffect(()=>{
    if(ref.current){
      let h,w;
      h=ref.current.clientHeight-100
      w=ref.current.clientWidth-200

      console.log(height)

      setHeight(h);
      setWidth(w);
    }
  },[height,width])
  
  function move(){

    if(ref.current){
      let z=setInterval(()=>{
        
        if(leftPos>=width){
          setX(-2)
          randomize()
        }

        else if(leftPos<=0){
          setX(2)
          randomize()
        }

        setLeftPos(leftPos+x)

        if(topPos>=height){
          setY(-2)
          randomize()
        }

        else if(topPos<=0){
          setY(2)
          randomize()
        }

        setTopPos(topPos+y)

      },10)
      
      return()=>clearInterval(z)
    }
  }

  useEffect(move,[leftPos])

  return (
    <div className="App" ref={ref}>
      <img src={logo} className="dvd_logo" style={{top:`${topPos}px`,left:`${leftPos}px`,backgroundColor:`rgb(${randomrgb[0]},${randomrgb[1]},${randomrgb[2]})`}}/>
    </div>
  );
}
export default App;
