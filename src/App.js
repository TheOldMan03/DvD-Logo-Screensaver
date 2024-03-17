import './App.css';
import { useState,useEffect, useRef } from 'react';

function App() {

  const [leftPos,setLeftPos]=useState(0);
  const [topPos,setTopPos]=useState(0); 

  const [x,setX]=useState(1)
  const [y,setY]=useState(1)

  const [width,setWidth]=useState(0)
  const [height,setHeight]=useState(0)

  const ref=useRef(null)

  useEffect(()=>{
    if(ref.current){
      let h,w;
      h=ref.current.clientHeight
      w=ref.current.clientWidth

      setHeight(h);
      setWidth(w);
    }
  },[])
  
  function move(){

    if(ref.current){
      let z=setInterval(()=>{
        
        if(leftPos>=width){
          setX(-1)
        }

        else if(leftPos<=0){
          setX(1)
        }

        setLeftPos(leftPos+x)

        if(topPos>=height){
          setY(-1)
        }

        else if(topPos<=0){
          setY(1)
        }

        setTopPos(topPos+y)

      },12)
      
      return()=>clearInterval(z)
    }
  }

  useEffect(move,[leftPos])

  return (
    <div className="App" ref={ref}>
      <div className="dvd_logo" style={{top:`${topPos}px`,left:`${leftPos}px`}}>
      </div>
    </div>
  );
}
export default App;
