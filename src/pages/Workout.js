import React, { useState, useContext } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import SetUpContext from "../setUpContext";

function Workout() {
  const [ work, setWork ] = useState(false);
  const [ timeCounter, setTimeCounter ] = useState(0);
  const [ exerciseCounter, setExerciseCounter ] = useState(-1);
  const [ isPause, setIsPause ] = useState(false);
  const [key, setKey] = useState(0);
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
      setExerciseCounter(0);
      audio.play();
    } else {
      setExerciseCounter(-1);
    }

    setWork(work => !work);
    setTimeCounter(0);
    setKey(prevKey => prevKey + 1)
  }

  const workoutPause = () => {
    setWork(work => !work);
    setIsPause(isPause => !isPause);
  }

  return (
    <main>
      <CountdownCircleTimer
        isPlaying={work}
        duration={exerciseTimeSec}
        key={key}
        onComplete={() => {
          
          audio.play();

          if (timeCounter+exerciseTimeSec < workTimeSec) {
            setExerciseCounter(exerciseCounter => (workSchedule.length === exerciseCounter+1) ? 0 : exerciseCounter + 1);
            setTimeCounter(timeCounter => timeCounter + exerciseTimeSec);
            return [true, 0];
          } else {
            setWork(false);
            setExerciseCounter(-1);
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
      <div className="displayText">{
        (exerciseCounter >= 0) ? 
          `${workSchedule[exerciseCounter]} (${exerciseCounter+1}/${timeCounter/exerciseTimeSec+1})` : 
          "Tak jdeme na to!"
        }</div>
        <div className="control">
          {work && <button onClick={() => workoutPause()}>Pause</button>}
          {isPause ? 
            <button onClick={() => workoutPause()}>Continue workout</button> :
            <button onClick={() => workoutManager()}>{ (!work) ? "Start" : "Reset"}</button> }          
        </div>
    </main>
  );
}

export default Workout;