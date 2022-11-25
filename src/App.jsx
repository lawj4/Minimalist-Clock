import { React, useState } from 'react';
import Clock from "./pages/Clock.jsx";
import Timer from "./pages/Timer.jsx";
import MenuBar from "./MenuBar.jsx";
import Stopwatch from './pages/Stopwatch.jsx';
import Alarm from './pages/Alarm.jsx';
import Pomodoro from './pages/Pomodoro.jsx';
import Countdown from './pages/Countdown.jsx';


function selectPage(page) {
  if (page === 'clock') {
    return < Clock />;
  } else if (page === 'timer') {
    return <Timer />;
  } else if (page === 'stopwatch') {
    return <Stopwatch />;
  } else if (page === 'alarm') {
    return <Alarm />;;
  } else if (page === 'pomodoro') {
    return <Pomodoro />;
  } else if (page === 'countdown') {
    return <Countdown />;
  }
}

function App() {
  const [page, setPage] = useState('clock');
  function updatePage(entry) {
    setPage(entry);
  }
  return (
    <>
    <MenuBar val={page} updatePage={updatePage}/>
    {selectPage(page)}
    </>  
  );
}

export default App;