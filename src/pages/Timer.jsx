import { React, useState, useEffect } from 'react';
import sound from '../assets/iphone_alarm.mp3';


var song = new Audio(sound);



export default function Timer() {
    const [base, setBase] = useState(0);
    const [current, setCurrent] = useState(Date.now());
    const [runner, setRunner] = useState(Date.now());
    const [running, setRunning] = useState(false);
    const [add, setAdd] = useState(true);
    const [shouldPlay, setShouldPlay] = useState(false);

    function reset() {
        song.currentTime = 0;
        song.pause();
        setBase(0);
        setCurrent(Date.now());
        setRunner(Date.now());
        setRunning(false);
        setShouldPlay(false);
    }
    function activate() {
        song.pause();
        song.currentTime = 0;
        setCurrent(Date.now());
        setRunner(Date.now());
        setRunning(true);
        setShouldPlay(true);
    }
    function softReset() {
        setRunning(false);
        setBase(0);
        setCurrent(Date.now());
        setRunner(Date.now());
    }
    useEffect(() => {
        if (base-(runner-current) <= 0) {
            softReset();
        }
        let interval;
        if (running) {
          interval = setInterval(() => {
            setRunner(Date.now());
            
          }, 10);
        } else if (!running) {
            if (shouldPlay) {
                song.play();
            }
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running, base, current, runner, shouldPlay]);

    function switchAdd() {
        if (add) {
            document.getElementById("hilite").style.color = "red";
            setAdd(false);
            
        } else {
            document.getElementById("hilite").style.color = "green";
            setAdd(true);
        }

    }
    function changeBase(num) {
        if (add) {
            setBase(base+num)
        } else {
            if (base-num >= 0) {
                setBase(base-num)
            } else {
                alert("can't go into negatives");
            }
        }
    }





    function getTime() {
        var time = [0,0,0,0];
        let temp = base-(runner-current);
        time[0] = ("0"+Math.floor(temp/3.6e+6)).slice(-2);
        temp %= 3.6e+6;
        time[1] = ("0"+Math.floor(temp/60000)).slice(-2);
        temp %= 60000;
        time[2] = ("0"+Math.floor(temp/1000)).slice(-2);
        temp %= 1000;
        time[3] = ("00"+temp.toString()).slice(-3,-1);
        return time;
    }
    var split = getTime();
    return (
        <>
            <div className="clockBox" >
            <div className="time" id="hello" onClick={() => activate()}>
            <span>{split[0]}:</span>
            <span>{split[1]}:</span>
            <span>{split[2]}:</span>
            <span>{split[3]}</span>
            </div>
            <div className="clockButtons">
                <p className="date" onClick={() => reset()}>Reset</p>       
            </div>
            </div>
            <div className="timeMenu">
                <p className="navName green" id="hilite" onClick={() => switchAdd()}>+/-</p>
                <p className="navName" onClick={() => changeBase(1000)}>1s</p>
                <p className="navName" onClick={() => changeBase(5000)}>5s</p>
                <p className="navName" onClick={() => changeBase(10000)}>10s</p>
                <p className="navName" onClick={() => changeBase(30000)}>30s</p>
                <p className="navName" onClick={() => changeBase(60000)}>1m</p>
                <p className="navName" onClick={() => changeBase(300000)}>5m</p>
                <p className="navName" onClick={() => changeBase(600000)}>10m</p>
                <p className="navName" onClick={() => changeBase(1800000)}>30m</p>
                <p className="navName" onClick={() => changeBase(3600000)}>1h</p>

            </div>
        </>
        
  );
}