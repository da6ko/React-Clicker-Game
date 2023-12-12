import React, { useState, useEffect } from "react";
import "./ClickerGame.css";

const ClickerGame = () => {
  const [gameData, setGameData] = useState({
    coins: 0,
    monsterHP: 10,
    clickDamage: 1,
    dps: 0,
    upgradeCost: 10,
    dpsUpgradeCost: 20,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/clicker-game")
      .then((response) => response.json())
      .then((data) => setGameData(data))
      .catch((error) => console.error("Error fetching game data:", error));
  }, []);

  useEffect(() => {
    const handleDpsAttack = () => {
      setGameData((prevData) => {
        const newMonsterHP = prevData.monsterHP - prevData.dps;
        console.log("DPS Attack! New Monster HP:", newMonsterHP);
        if (newMonsterHP <= 0) {
          const newCoins = prevData.coins + 10;
          console.log("Monster killed by DPS! Coins earned:", newCoins);
          return { ...prevData, coins: newCoins, monsterHP: 10 };
        }
        return { ...prevData, monsterHP: newMonsterHP };
      });
    };

    const dpsInterval = setInterval(() => {
      handleDpsAttack();
    }, 1000);

    return () => clearInterval(dpsInterval);
  }, []); 

  const updateGameData = (updatedData) => {
    fetch("http://localhost:5000/api/clicker-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => console.log("Game data updated successfully:", data))
      .catch((error) => console.error("Error updating game data:", error));
  };

  const handleMonsterClick = () => {
    setGameData((prevData) => {
      const newMonsterHP = prevData.monsterHP - prevData.clickDamage;
      console.log("New Monster HP:", newMonsterHP);
      if (newMonsterHP <= 0) {
        const newCoins = prevData.coins + 10;
        console.log("Monster killed! Coins earned:", newCoins);
        return { ...prevData, coins: newCoins, monsterHP: 10 };
      }
      return { ...prevData, monsterHP: newMonsterHP };
    });
  };

  const handleUpgrade = () => {
    if (gameData.coins >= gameData.upgradeCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeCost;
        const newClickDamage = prevData.clickDamage + 1;
        const newUpgradeCost = prevData.upgradeCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          clickDamage: newClickDamage,
          upgradeCost: newUpgradeCost,
        };
      });
    } else {
      alert("Not enough coins to buy the upgrade!");
    }
  };

  const handleDpsUpgrade = () => {
    if (gameData.coins >= gameData.dpsUpgradeCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.dpsUpgradeCost;
        const newDps = prevData.dps + 1;
        const newDpsUpgradeCost = prevData.dpsUpgradeCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          dps: newDps,
          dpsUpgradeCost: newDpsUpgradeCost,
        };
      });
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };

  const handleSaveToDatabase = () => {
    updateGameData(gameData);
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Clicker Game</h1>
        <p>Coins: {gameData.coins}</p>
        <p>Monster HP: {gameData.monsterHP}</p>
        <br />
        <img
          src={process.env.PUBLIC_URL + "/img/monster.png"}
          alt="Monster"
          style={{ maxWidth: "200px", maxHeight: "200px", cursor: "pointer" }}
          onClick={handleMonsterClick}
        />
        <br />
        <p>Click Damage: {gameData.clickDamage}</p>
        <p>Upgrade Cost: {gameData.upgradeCost} coins</p>
        <button onClick={handleUpgrade}>Upgrade</button>
        <br />
        <p>Damage Per Second: {gameData.dps}</p>
        <p>DPS Upgrade Cost: {gameData.dpsUpgradeCost} coins</p>
        <button onClick={handleDpsUpgrade}>Upgrade DPS</button>
        <br />
        <button onClick={handleSaveToDatabase}>Save to Database</button>
      </div>
    </div>
  );
};

export default ClickerGame;