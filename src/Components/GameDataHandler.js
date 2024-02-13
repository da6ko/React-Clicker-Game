export const updateGameData = (updatedData) => {
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
  