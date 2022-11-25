import { React } from 'react';



export default function MenuBar(prop) {

    return (
    <>
        <div className="navMenu">
            <p className="navName" onClick={() => prop.updatePage('clock')}>clock</p>
            <p className="navName" onClick={() => prop.updatePage('timer')}>timer</p>
            <p className="navName" onClick={() => prop.updatePage('stopwatch')}>stopwatch</p>
            <p className="navName" onClick={() => prop.updatePage('alarm')}> alarm</p>
            <p className="navName" onClick={() => prop.updatePage('pomodoro')}>pomodoro</p>
            <p className="navName" onClick={() => prop.updatePage('countdown')}>countdown</p>
        </div>
    </>
    
    )
}






