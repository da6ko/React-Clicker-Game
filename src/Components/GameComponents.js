import React from 'react';
import '../Css/ClickerGame.css';

export const renderUpgrades = (gameData, handleHelmetUpgrade, handleChestplateUpgrade, handleLeggingsUpgrade, handleBootsUpgrade, handleWeaponUpgrade, handleShieldUpgrade) => (
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

export const renderGameContainer = (gameData, currentMonsterImage, handleMonsterClick) => (
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

export const renderRightPanel = (gameData, handleSaveToDatabase, handleFireballClick) => (
  <div className="right-panel">
    <h1>Settings</h1>
    <br />
    <button onClick={handleSaveToDatabase}>Save to Database</button>
    <br />
    <p>Click Damage: {gameData.clickDamage}</p>
    <p>Damage Per Second: {gameData.dps}</p>
    <p>Mana: {gameData.mana}</p>
    <div className="tooltip">
      <img
        src="/fireball.png"
        alt="Fireball"
        className="fireball-image"
        style={{ cursor: 'pointer', opacity: gameData.fireballUsed || gameData.mana < 5 ? 0.5 : 1 }}
        onClick={handleFireballClick}
      />
      <span class="tooltiptext">Increase your DPS by 100%. Costs 5 mana.</span>
    </div>
    <p>Cast Fireball (Costs 5 Mana)</p>
  </div>
);





export const Space = () => <div className="background"></div>;