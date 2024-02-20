import React from 'react';
import '../Css/ClickerGame.css';
import { useState, useEffect } from 'react';
import { updateGameData } from './GameDataHandler';
import { renderUpgrades, renderGameContainer, renderRightPanel, Space } from './GameComponents';

const ClickerGameContainer = () => {
  const [gameData, setGameData] = useState({
    coins: 1000,
    monsterHP: 10,
    clickDamage: 1,
    dps: 0,
    mana: 10,
    upgradeHelmetCost: 10,
    upgradeChestplateCost: 40,
    upgradeLeggingsCost: 30,
    upgradeBootsCost: 20,
    upgradeWeaponCost: 20,
    upgradeShieldCost: 40,
  });;

  const [monsterImages] = useState([
    "/img/monster.png",
    "/img/monster2.png",
    "/img/monster3.png",
  ]);

  const [currentMonsterImage, setCurrentMonsterImage] = useState(monsterImages[0]);

  
  const [fireballUsed, setFireballUsed] = useState(false);
  const [fireballActive, setFireballActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (fireballActive) {
      const timeout = setTimeout(() => {
        setGameData(prevData => ({
          ...prevData,
          dps: prevData.dps / 2
        }));
        setFireballActive(false);
        resetFireball();
      }, 20000);
      const interval = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
      }, 1000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [fireballActive]);

  useEffect(() => {
    const manaInterval = setInterval(() => {
      setGameData(prevData => ({
        ...prevData,
        mana: Math.min(prevData.mana + 1, 10) 
      }));
    }, 1000);
  
    return () => clearInterval(manaInterval);
  }, []);
  
  const handleThunderboltClick = () => {
    if (gameData.mana >= 10) {
      const newMonsterHP = gameData.monsterHP - 20; // Adjust damage as needed
      if (newMonsterHP <= 0) {
        const newCoins = gameData.coins + 10;
        const newMonsterImage = monsterImages[Math.floor(Math.random() * monsterImages.length)];
        setCurrentMonsterImage(newMonsterImage);
        setGameData({ ...gameData, coins: newCoins, monsterHP: 10, mana: gameData.mana - 10 });
      } else {
        setGameData({ ...gameData, monsterHP: newMonsterHP, mana: gameData.mana - 10 });
      }
    } else {
      alert("Not enough mana to cast Thunderbolt!");
    }
  };
  

  const handleFireballClick = () => {
    if (gameData.mana >= 5 && !gameData.fireballUsed) {
      setGameData(prevData => ({
        ...prevData,
        dps: prevData.dps * 2,
        mana: prevData.mana - 5,
        fireballUsed: true,
      }));
      setTimeout(() => {
        setGameData(prevData => ({
          ...prevData,
          dps: prevData.dps / 2, 
          fireballUsed: false, 
        }));
      }, 20000);
    }
  };

  const handlePowerSpikeClick = () => {
    if (gameData.mana >= 10) {
      setGameData(prevData => ({
        ...prevData,
        clickDamage: prevData.clickDamage * 2,
        mana: prevData.mana - 10
      }));
      setTimeout(() => {
        setGameData(prevData => ({
          ...prevData,
          clickDamage: prevData.clickDamage / 2
        }));
      }, 20000); // Reset click damage back to normal after 20 seconds
    } else {
      alert("Not enough mana to cast Power Spike!");
    }
  };

  const resetFireball = () => {
    setFireballUsed(false);
  };

  console.log('Time left for fireball effect:', timeLeft);

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
          const newMonsterImage = monsterImages[Math.floor(Math.random() * monsterImages.length)];
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

  const handleMonsterClick = () => {
    setGameData((prevData) => {
      const newMonsterHP = prevData.monsterHP - prevData.clickDamage;
      if (newMonsterHP <= 0) {
        const newCoins = prevData.coins + 10;
        const newMonsterImage = monsterImages[Math.floor(Math.random() * monsterImages.length)];
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

    return (
    <>
      {renderUpgrades(gameData, handleHelmetUpgrade, handleChestplateUpgrade, handleLeggingsUpgrade, handleBootsUpgrade, handleWeaponUpgrade, handleShieldUpgrade)}
      {Space()}
      {renderGameContainer(gameData, currentMonsterImage, handleMonsterClick)}
      {Space()}
      {renderRightPanel(gameData, handleSaveToDatabase, handleFireballClick, handleThunderboltClick, handlePowerSpikeClick)}
    </>
  );
};

export default ClickerGameContainer;
