// ClickerGame.js
import React, { useState, useEffect } from 'react';
import '../Css/ClickerGame.css';

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

  const [monsterImages] = useState([
    "/img/monster.png",
    "/img/monster2.png",
    "/img/monster3.png",
  ]);

  const [currentMonsterImage, setCurrentMonsterImage] = useState(
    monsterImages[0]
  );

  useEffect(() => {
    fetch("http://localhost:8080/api/load-game-data")
      .then((response) => response.json())
      .then((data) => setGameData(data))
      .catch((error) => console.error("Error loading game data:", error));
  }, []);

  useEffect(() => {
    const handleDpsAttack = () => {
      setGameData((prevData) => {
        const newMonsterHP = prevData.monsterHP - prevData.dps;
        if (newMonsterHP <= 0) {
          const newCoins = prevData.coins + 10;
          const newMonsterImage =
            monsterImages[Math.floor(Math.random() * monsterImages.length)];
          setCurrentMonsterImage(newMonsterImage);
          return { ...prevData, coins: newCoins, monsterHP: 10 };
        }
        return { ...prevData, monsterHP: newMonsterHP };
      });
    };

    const dpsInterval = setInterval(() => {
      handleDpsAttack();
    }, 1000);

    return () => clearInterval(dpsInterval);
  }, [monsterImages]);

  const updateGameData = (updatedData) => {
    fetch("http://localhost:8080/api/save-game-data", {
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
      if (newMonsterHP <= 0) {
        const newCoins = prevData.coins + 10;
        const newMonsterImage =
          monsterImages[Math.floor(Math.random() * monsterImages.length)];
        setCurrentMonsterImage(newMonsterImage);
        return { ...prevData, coins: newCoins, monsterHP: 10 };
      }
      return { ...prevData, monsterHP: newMonsterHP };
    });
  };

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
        const newupgradeChestplateCost =
          prevData.upgradeChestplateCost * 2;

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

  const renderUpgrades = () => {
    if (!gameData) {
      return null;
    }
  
    return (
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
        <br />
      </div>
    );
  };

  const renderGameContainer = () => {
    if (!gameData) {
      return null; // Return null or some loading indicator while data is being fetched
    }
  
    return (
      <div className="game-container">
        <p>Coins: {gameData.coins}</p>
        <p>Monster HP: {gameData.monsterHP}</p>
        <img
          src={process.env.PUBLIC_URL + currentMonsterImage}
          alt="Monster"
          style={{ maxWidth: "200px", maxHeight: "200px", cursor: "pointer" }}
          onClick={handleMonsterClick}
        />
      </div>
    );
  };
  

  const renderRightPanel = () => {
    if (!gameData) {
      return null; // or render a loading state
    }
  
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

  const space = () => (
    <div className="background">
    </div>
  );

  return (
    <div className="body">
      {renderUpgrades()}
      {space()}
      {renderGameContainer()}
      {space()}
      {renderRightPanel()}
    </div>
  );
};

export default ClickerGame;
