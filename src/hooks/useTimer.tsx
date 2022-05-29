import {useRef, useState, useEffect} from 'react';

const useTimer = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    return () => {
      clearTimeout(interval.current);
    };
  }, []);

  const startTimer = (time: number, callback: () => void) => {
    setTotalTime(time);
    setTimeLeft(time);
    setIsTimerActive(true);
    interval.current = setTimeout(() => {
      callback();
    }, time);
  };

  return {totalTime, timeLeft, isTimerActive, startTimer};
};

export default useTimer;
