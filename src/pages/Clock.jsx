import React, { useEffect, useState } from 'react';
import { FaMoon,FaSun } from "react-icons/fa";


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
function getDay(value){
  const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return dayNames[value.getDay()];
}
function getMonth(value){
  const monthNames = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  return monthNames[value.getMonth()];
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


function MainClock(){
    const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 10);

    return () => {
      clearInterval(interval);
    };
  }, []);
    return (
      
      <div className="clockBox">
        <p className="sky">{ending(value)}</p>
        <p onClick={changeState} className="time noselect" >{getHour(value)}:{getMin(value)}:{getSec(value)}:{getMil(value)}</p>
        <div className="clockButtons" onClick={() => alert("function tbd")}>
          <p className="date">{getDay(value)} - {getMonth(value)} {value.getDate()}, {value.getFullYear()}</p>
        </div>
      </div>
    );
  
  
}

export default MainClock;