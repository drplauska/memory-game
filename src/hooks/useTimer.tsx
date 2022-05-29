import {useRef, useState, useEffect} from 'react';

const useTimer = (callback: () => void) => {
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    return () => {
      clearTimeout(interval.current);
    };
  }, []);

  useEffect(() => {
    if (!isTimerActive) {
      return;
    }
    if (timeLeft > 0) {
      interval.current = setTimeout(() => {
        setTimeLeft(currentTimeLeft => currentTimeLeft - 100); // this is not accurate
      }, 50);
      return;
    }
    setIsTimerActive(false);
    callback();
  }, [callback, isTimerActive, timeLeft]);

  const startTimer = (seconds: number) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsTimerActive(true);
  };

  return {totalTime, timeLeft, isTimerActive, startTimer};
};

export default useTimer;
