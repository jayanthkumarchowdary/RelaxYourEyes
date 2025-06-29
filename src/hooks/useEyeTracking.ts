import { useState, useEffect } from 'react';

export const useEyeTracking = () => {
  const [screenTime, setScreenTime] = useState(127); // Start with some realistic data
  const [blinkRate, setBlinkRate] = useState(18);
  const [eyeStrain, setEyeStrain] = useState(35);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let startTime = Date.now();
    let lastActiveTime = Date.now();

    // Track actual screen time
    const trackScreenTime = () => {
      const now = Date.now();
      if (document.hasFocus() && !document.hidden) {
        const timeDiff = (now - lastActiveTime) / 1000 / 60; // Convert to minutes
        if (timeDiff < 2) { // Only count if less than 2 minutes gap
          setScreenTime(prev => prev + timeDiff);
        }
        lastActiveTime = now;
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    // Update every 30 seconds for more real-time feel
    const timer = setInterval(() => {
      trackScreenTime();
      
      // Simulate eye strain based on continuous usage
      setEyeStrain(prev => {
        if (!isActive) return Math.max(0, prev - 1); // Reduce strain when not active
        
        const timeBasedIncrease = screenTime > 60 ? 0.5 : 0.2; // More strain after 1 hour
        const randomVariation = (Math.random() - 0.5) * 2;
        return Math.min(100, Math.max(0, prev + timeBasedIncrease + randomVariation));
      });
      
      // Simulate blink rate (decreases with strain)
      setBlinkRate(prev => {
        const strainEffect = eyeStrain > 50 ? -2 : 0;
        const randomVariation = (Math.random() - 0.5) * 3;
        return Math.max(8, Math.min(25, 18 + strainEffect + randomVariation));
      });
    }, 30000); // Update every 30 seconds

    // Track focus/blur events
    const handleFocus = () => {
      lastActiveTime = Date.now();
      setIsActive(true);
    };
    
    const handleBlur = () => setIsActive(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', trackScreenTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', trackScreenTime);
    };
  }, [screenTime, eyeStrain, isActive]);

  return { 
    screenTime: Math.round(screenTime), 
    blinkRate: Math.round(blinkRate), 
    eyeStrain: Math.round(eyeStrain),
    isActive 
  };
};