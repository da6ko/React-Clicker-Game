import React, { useState, useEffect } from "react";
import "./ClickerGame.css";

const ClickerGame = () => {
  const [coins, setCoins] = useState(0);
  const [monsterHP, setMonsterHP] = useState(10);
  const [clickDamage, setClickDamage] = useState(1);
  const [dps, setDps] = useState(0); 
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [dpsUpgradeCost, setDpsUpgradeCost] = useState(20); 

  const handleMonsterClick = () => {
    setMonsterHP((prevHP) => {
      const newHP = prevHP - clickDamage;
      console.log(newHP);
      if (newHP <= 0) {
        setCoins((prevCoins) => prevCoins + 10);
        return 10;
      }
      return newHP;
    });
  };

  const handleUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prevCoins) => prevCoins - upgradeCost);
      setClickDamage((prevDamage) => prevDamage + 1);
      setUpgradeCost((prevCost) => prevCost * 2);
    } else {
      alert("Not enough coins to buy the upgrade!");
    }
  };

  const handleDpsUpgrade = () => {
    if (coins >= dpsUpgradeCost) {
      setCoins((prevCoins) => prevCoins - dpsUpgradeCost);
      setDps((prevDps) => prevDps + 1);
      setDpsUpgradeCost((prevCost) => prevCost * 2);
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };

  useEffect(() => {
    const dpsInterval = setInterval(() => {
      setMonsterHP((prevHP) => {
        const newHP = prevHP - dps;
        if (newHP <= 0) {
          setCoins((prevCoins) => prevCoins + 10);
          return 10; 
        }
        return newHP;
      });
    }, 1000);

    return () => clearInterval(dpsInterval);
  }, [dps]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Clicker Game</h1>
        <p>Coins: {coins}</p>
        <p>Monster HP: {monsterHP}</p>
        <br />
        <img
          src={process.env.PUBLIC_URL + "/img/monster.png"}
          alt="Monster"
          style={{ maxWidth: "200px", maxHeight: "200px", cursor: "pointer" }}
          onClick={handleMonsterClick}
        />
        <br />
        <p>Click Damage: {clickDamage}</p>
        <p>Upgrade Cost: {upgradeCost} coins</p>
        <button onClick={handleUpgrade}>Upgrade</button>
        <br />
        <p>Damage Per Second: {dps}</p>
        <p>DPS Upgrade Cost: {dpsUpgradeCost} coins</p>
        <button onClick={handleDpsUpgrade}>Upgrade DPS</button>
      </div>
    </div>
  );
};

export default ClickerGame;
