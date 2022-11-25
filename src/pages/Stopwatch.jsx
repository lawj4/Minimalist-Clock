import { React, useState, useEffect } from 'react';




export default function Stopwatch() {
    const [base, setBase] = useState(Date.now());
    const [current, setCurrent] = useState(Date.now());
    const [running, setRunning] = useState(false);

    function reset() {
        setBase(Date.now());
        setCurrent(Date.now());
        setRunning(false);
    }
    function activate() {
        setRunning(true);
    }

    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setCurrent(Date.now())
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);

    function getTime() {
        var time = [0,0,0,0];
        let temp = current-base;
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
        <div className="clockBox" >
        <div className="time" onClick={() => activate()}>
        <span>{split[0]}:</span>
        <span>{split[1]}:</span>
        <span>{split[2]}:</span>
        <span>{split[3]}</span>
        </div>
        <div className="clockButtons">
            <p className="date" onClick={() => reset()}>Reset</p>       
        </div>
        </div>
  );
}