import './App.css';
import { useState,useEffect } from 'react';

function App() {

  const [leftPos,setLeftPos]=useState(0);
  const [topPos,setTopPos]=useState(10);  

  function move(){

    let x=setInterval(()=>{
      setLeftPos(leftPos+10)
      setTopPos(topPos+10)
    },1000)
    
    return()=>clearInterval(x)
  }

  useEffect(move,[leftPos])

  return (
    <div className="App">
      <div className="dvd_logo" style={{top:`${topPos}px`,left:`${leftPos}px`}}>
      </div>
    </div>
  );
}
export default App;
