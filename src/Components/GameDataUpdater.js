import React from 'react';

const GameDataUpdater = ({ gameData, updateGameData }) => {
  const handleSaveToDatabase = () => {
    updateGameData(gameData);
  };

  return (
    <div className="right-panel">
      <h1>Settings</h1>
      <br />
      <button onClick={handleSaveToDatabase}>Save to Database</button>
      <br />
      <p>Click Damage: {gameData.clickDamage}</p>
      <p>Damage Per Second: {gameData.dps}</p>
    </div>
  );
};

export default GameDataUpdater;
