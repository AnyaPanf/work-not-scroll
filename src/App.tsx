import './App.css';
import { useState, useEffect, useRef } from 'react';

export const App = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [elapseTime, setElapsedTime] = useState<number>(0);
  const intervalIdRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }
    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  const handleStart = (): void => {
    setIsRunning(true)
    startTimeRef.current = Date.now() - elapseTime;
    setIsDisabled(!isDisabled);
  }

  const handlePause = (): void => {
    setIsRunning(false);
    setIsDisabled(!isDisabled);
  }

  const handleReset = (): void => {
    setElapsedTime(0);
    setIsRunning(false);
    setIsDisabled(true);
  }

  const formateTime = () => {
    let hours = String(Math.floor(elapseTime / (1000 * 60 * 60))).padStart(2, '0');
    let minutes = String(Math.floor(elapseTime / (1000 * 60) % 60)).padStart(2, '0');
    let seconds = String(Math.floor(elapseTime / (1000) % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`
  }

  return (
    <>
      <div className='container'>
        <p className='saved'>Today I saved</p>
        <h1 className='timer'>{formateTime()}</h1>
        <div className='btns'>
          <button className='startBtn'
            onClick={handleStart}
            disabled={!isDisabled}>Let's work!</button>
          <button className='pauseBtn'
            onClick={handlePause}
            disabled={isDisabled}>Ok, break</button>
          <button className='resetBtn'
            onClick={handleReset}
            disabled={isDisabled}>Start over</button>
        </div>
      </div>
    </>
  )
};