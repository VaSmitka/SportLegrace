import React, { useState, useContext } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import SetUpContext from "../setUpContext";

function Workout() {
  const [ work, setWork ] = useState(false);
  const [ timeCounter, setTimeCounter ] = useState(0);
  const [ exerciseCounter, setExerciseCounter ] = useState(-1);
  const { getWorkTime, getExerciseTime, getWorkSchedule } = useContext(SetUpContext);

  const url = "/sound/beeb.mp3";
  const audio = new Audio(url);
  const workSchedule = getWorkSchedule();

  const convertToSeconds = ( strTime ) => {
    const divideTime = strTime.split(':');
    return divideTime[0] * 60 + divideTime[1] * 1;
  }

  const workTimeSec = convertToSeconds(getWorkTime());
  const exerciseTimeSec = convertToSeconds(getExerciseTime());


  const workoutManager = () => {  
    if (!work) {
      setWork(true);
      setExerciseCounter(0);
      audio.play();
    } else {
      setWork(false);
      setExerciseCounter(-1);
    }
  }

  return (
    <main>
      <CountdownCircleTimer
        isPlaying={work}
        duration={exerciseTimeSec}
        onComplete={() => {
          setExerciseCounter(exerciseCounter => (workSchedule.length === exerciseCounter+1) ? 0 : exerciseCounter + 1);
          setTimeCounter(timeCounter => timeCounter + exerciseTimeSec);
          
          audio.play();

          if (timeCounter <= workTimeSec) {
            return [true, 0];
          } else {
            return [false, 0];
          }
        }}
        colors={[
          ['#545C38', 0.33],
          ['#8FA834', 0.33],
          ['#BBDB44', 0.33],
        ]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
      <div className="displayText">{(exerciseCounter >= 0) ? workSchedule[exerciseCounter] : "Tak jdeme na to!"}</div>
      <button onClick={() => workoutManager()}>{ (!work) ? "Start" : "Stop"}</button>
    </main>
  );
}

export default Workout;