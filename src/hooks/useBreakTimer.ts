import { useState, useEffect } from 'react';

export const useBreakTimer = () => {
  const [timeUntilBreak, setTimeUntilBreak] = useState(18); // Start closer to break for demo
  const [shouldTakeBreak, setShouldTakeBreak] = useState(false);
  const [lastBreakTime, setLastBreakTime] = useState(Date.now());

  useEffect(() => {
    // Update every minute
    const timer = setInterval(() => {
      setTimeUntilBreak(prev => {
        if (prev <= 1) {
          setShouldTakeBreak(true);
          return 20; // Reset to 20 minutes
        }
        return prev - 1;
      });
    }, 60000); // Real minute intervals

    // For demo purposes, also update every 10 seconds to show countdown
    const demoTimer = setInterval(() => {
      setTimeUntilBreak(prev => {
        if (prev <= 0.1) {
          setShouldTakeBreak(true);
          return 20;
        }
        return Math.max(0, prev - 0.167); // Subtract ~10 seconds worth
      });
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(demoTimer);
    };
  }, []);

  const resetBreakTimer = () => {
    setTimeUntilBreak(20);
    setShouldTakeBreak(false);
    setLastBreakTime(Date.now());
  };

  const snoozeBreak = (minutes: number = 5) => {
    setTimeUntilBreak(minutes);
    setShouldTakeBreak(false);
  };

  return { 
    timeUntilBreak: Math.max(0, timeUntilBreak), 
    shouldTakeBreak, 
    resetBreakTimer,
    snoozeBreak,
    lastBreakTime 
  };
};