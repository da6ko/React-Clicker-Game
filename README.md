## React Clicker Game

This is a simple web-based clicker game developed using React. This game allows users to defeat monsters, earn coins, and upgrade their equipment to enhance their gameplay.

# Installation

1. Clone the repository: 
```bash
    git clone <https://github.com/da6ko/React-Clicker-Game.git>
```
2. Navigate to the project directory: 
```bash
    cd react-clicker-game
```
3. Install dependencies: npm install
```bash
    npm install
```

# Usage

1. Start the development server:
```bash
npm start
```

2. Open your browser and go to http://localhost:3000. If you started the server, you can load and save the information to your MongoDB database.

# Features
- Click on the monster to damage and defeat it, earning coins in the process.
- Upgrade your equipment (Helmet, Chestplate, Leggings, Boots, Weapon, and Shield) to increase your damage per click (DPC) and damage per second (DPS).
- Save your game data to a MongoDB database.

# Technologies Used
MongoDB: Database for storing todos.

Express: Backend framework for handling server-side logic.

React: Frontend library for building user interfaces.

Node.js: JavaScript runtime for server-side development.

# Folder Structure
- **src/Components:** Contains React components for the game.
- **src/Css:** Contains the stylesheets for the components.
- **src/index.js:** Entry point of the React application.
- **public:** Public assets such as images.