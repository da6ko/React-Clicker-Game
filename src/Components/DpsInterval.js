// DpsInterval.js
import React, { useEffect } from 'react';

const DpsInterval = ({ handleDpsAttack, monsterImages }) => {
  useEffect(() => {
    const dpsInterval = setInterval(() => {
      handleDpsAttack(monsterImages);
    }, 1000);

    return () => clearInterval(dpsInterval);
  }, [handleDpsAttack, monsterImages]);
  
  return null;
};

export default DpsInterval;
