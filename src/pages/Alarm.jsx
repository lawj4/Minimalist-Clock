/* eslint-disable */ 
import React, { useEffect, useState } from 'react';
import { FaMoon,FaSun } from "react-icons/fa";
import Dropdown from "../Dropdown.jsx"
import sound from '../assets/iphone_alarm.mp3';

var state = true;
function changeState() {
  state = state ? false : true;
  console.log(state);
}
function getMil(value){
  var mil = value.getMilliseconds().toString();
  var size = mil.length;
  if (size === 1) {
    return "0"+mil.substring(0,1);
  }
  return mil.substring(0,2);
}
function getSec(value){
  var sec = value.getSeconds();
  var size = sec.toString().length;
  if (size === 1) {
    return "0"+sec;
  }
  return sec;
}
function getMin(value){
  var min = value.getMinutes();
  var size = min.toString().length;
  if (size === 1) {
    return "0"+min;
  }
  return min;
}
function getHour(value){
  let hour = value.getHours();
  if (state) { //military
    if (hour.toString().length === 1) {
      return "0"+hour;
    }
    return hour;
  } else { //ampm
    if (hour > 0 && hour <= 12) {
      if (hour.toString().length === 1) {
        return "0"+hour;
      }
      return hour;
    } else if (hour > 12) {
      hour = hour - 12;
      if (hour.toString().length === 1) {
        return "0"+hour;
      }
      return hour;
    } else if (hour === 0) {
      return "12";
    }
  } 
}
function ending(value){
  if (state) {
    return ''; 
  }
  let hour = value.getHours();
  if (hour > 12) {
    return <FaMoon/>;
  }
  return <FaSun/>;
}

var song = new Audio(sound);

export default function Alarm(){
    const [value, setValue] = useState(new Date());
    const [targetHour, setTargetHour] = useState(0);
    const [targetMin, setTargetMin] = useState(0);
    const [shouldPlay, setShouldPlay] = useState(true);
    const [resetter, setResetter] = useState(false);

    function reset() {
        setResetter(true);
        var ddl = document.getElementById("minList");
        var ddr = document.getElementById("hourList");
        ddl.selectedIndex = "0";
        ddr.selectedIndex = "0";
        song.pause();
        setTargetHour(0);
        setTargetMin(0);
        setShouldPlay(false);
    }

    useEffect(() => {
        console.log(value.getHours(), targetHour, value.getMinutes(), targetMin, shouldPlay);
        if (shouldPlay && targetHour == value.getHours() && targetMin == value.getMinutes()) {
            setShouldPlay(false);
            song.play();
            console.log(value.getHours(), value.getMinutes());
            
        }
        
        
      }, [targetHour, targetMin, value, shouldPlay]);


    useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 10);

    return () => {
        clearInterval(interval);
    };
    }, []);
    return (
        <>
            <div className="clockBox">
            <p className="sky">{ending(value)}</p>
            <p onClick={changeState} className="time noselect" >{getHour(value)}:{getMin(value)}:{getSec(value)}:{getMil(value)}</p>
            <div className="clockButtons">
                <p className="date" onClick={() => reset()}>Reset</p>     
            </div>
            </div>
 
            <div className="timeMenu">
                <Dropdown
                    setTargetMin={setTargetMin}
                    setTargetHour={setTargetHour}
                    setShouldPlay={setShouldPlay}
                    resetter={resetter}
                    setResetter={setResetter}
                />   
            </div>
        </>
      
    );
  
  
}