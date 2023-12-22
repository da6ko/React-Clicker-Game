import React, { useState, useEffect } from "react";
import "./ClickerGame.css";

const ClickerGame = () => {
  const [gameData, setGameData] = useState({
    coins: 1000,
    monsterHP: 10,
    clickDamage: 1,
    dps: 0,
    upgradeHelmetCost: 10,
    upgradeChestplateCost: 40,
    upgradeLeggingsCost: 30,
    upgradeBootsCost: 20,
    upgradeWeaponCost: 20,
    upgradeShieldCost: 40,
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
  // DPS
  const handleHelmetUpgrade = () => {
    if (gameData.coins >= gameData.upgradeHelmetCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeHelmetCost;
        const newDps = prevData.dps + 1;
        const newupgradeHelmetCost = prevData.upgradeHelmetCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          dps: newDps,
          upgradeHelmetCost: newupgradeHelmetCost,
        };
      });
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };
  const handleChestplateUpgrade = () => {
    if (gameData.coins >= gameData.upgradeChestplateCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeChestplateCost;
        const newDps = prevData.dps + 4;
        const newupgradeChestplateCost = prevData.upgradeChestplateCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          dps: newDps,
          upgradeChestplateCost: newupgradeChestplateCost,
        };
      });
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };
  const handleLeggingsUpgrade = () => {
    if (gameData.coins >= gameData.upgradeLeggingsCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeLeggingsCost;
        const newDps = prevData.dps + 3;
        const newupgradeLeggingsCost = prevData.upgradeLeggingsCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          dps: newDps,
          upgradeLeggingsCost: newupgradeLeggingsCost,
        };
      });
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };
  const handleBootsUpgrade = () => {
    if (gameData.coins >= gameData.upgradeBootsCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeBootsCost;
        const newDps = prevData.dps + 2;
        const newupgradeBootsCost = prevData.upgradeBootsCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          dps: newDps,
          upgradeBootsCost: newupgradeBootsCost,
        };
      });
    } else {
      alert("Not enough coins to buy the DPS upgrade!");
    }
  };
  // DPC
  const handleWeaponUpgrade = () => {
    if (gameData.coins >= gameData.upgradeWeaponCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeWeaponCost;
        const newClickDamage = prevData.clickDamage + 1;
        const upgradeWeaponCost = prevData.upgradeWeaponCost * 2;

        return {
          ...prevData,
          coins: newCoins,
          clickDamage: newClickDamage,
          upgradeWeaponCost: upgradeWeaponCost,
        };
      });
    } else {
      alert("Not enough coins to buy the upgrade!");
    }
  };

  const handleShieldUpgrade = () => {
    if (gameData.coins >= gameData.upgradeShieldCost) {
      setGameData((prevData) => {
        const newCoins = prevData.coins - prevData.upgradeShieldCost;
        const newClickDamage = prevData.clickDamage + 3;
        const newupgradeShieldCost = prevData.upgradeShieldCost * 2.5;

        return {
          ...prevData,
          coins: newCoins,
          clickDamage: newClickDamage,
          upgradeShieldCost: newupgradeShieldCost,
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
    <div className="body">
      <div className="upgrades">
        <h2>Upgrades</h2>
        
        <p>Upgrade Helmet: {gameData.upgradeHelmetCost} coins</p>
        <button onClick={handleHelmetUpgrade}>Upgrade</button>
        <br />
        <p>Upgrade Chestplate: {gameData.upgradeChestplateCost} coins</p>
        <button onClick={handleChestplateUpgrade}>Upgrade</button>
        <br />
        <p>Upgrade Leggings: {gameData.upgradeLeggingsCost} coins</p>
        <button onClick={handleLeggingsUpgrade}>Upgrade</button>
        <br />
        <p>Upgrade Boots: {gameData.upgradeBootsCost} coins</p>
        <button onClick={handleBootsUpgrade}>Upgrade</button>
        <br />
        
        <p>Upgrade Weapon Cost: {gameData.upgradeWeaponCost} coins</p>
        <button onClick={handleWeaponUpgrade}>Upgrade</button>
        <br />
        <p>Upgrade Shield Cost: {gameData.upgradeShieldCost} coins</p>
        <button onClick={handleShieldUpgrade}>Upgrade</button>
        <br />
        <br></br>
        <p>Click Damage: {gameData.clickDamage}</p>
        <p>Damage Per Second: {gameData.dps}</p>
        <br></br>
        <button onClick={handleSaveToDatabase}>Save to Database</button>
      </div>
      <div className="game-container">
        <h1>Clicker Game</h1>
        <p>Coins: {gameData.coins}</p>
        <p>Monster HP: {gameData.monsterHP}</p>
        <img
          src={process.env.PUBLIC_URL + "/img/monster.png"}
          alt="Monster"
          style={{ maxWidth: "200px", maxHeight: "200px", cursor: "pointer" }}
          onClick={handleMonsterClick}
        />
      </div>
    </div>
  );
  
  
  };  

export default ClickerGame;
