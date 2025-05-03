// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2412-ftb-mt-web-pt";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */

// data.foreach =((players) => {
//   console.log(players);
const Ulelement = document.querySelector('.Llist');
const cohortName = '2412-FTB-MT-WEB-PT'; // Replace with your actual cohort name

// Fetch players
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`);
    const data = await response.json();
    return data.data.players;
  } catch (err) {
    console.error('Error fetching players:', err);
  }
};

// Render players to the DOM
const renderAllPlayers = async (playerList) => {
  Ulelement.innerHTML = ''; // Clear list first
  playerList.forEach((player) => {
    const liElement = document.createElement('li');
    liElement.textContent = player.name;
    Ulelement.appendChild(liElement);
  });
};

// Initialize
const init = async () => {
  const allPlayers = await fetchAllPlayers();
  if (allPlayers) {
    await renderAllPlayers(allPlayers);
  }
};

init();


    // TODO
    
    const fetchAllPlayers = async () => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`);
        const data = await response.json();
        return data.data.players;
      } catch (err) {
        console.error("Error Fetching", err);
      }
    };
    

 
    const cohortName = '2412-FTB-MT-WEB-PT'; // Make sure to define this

    /**
     * Fetches a single player from the API.
     * @param {number} playerId
     * @returns {Object} the player object
     */
    const fetchSinglePlayer = async (playerId) => {
      try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/${playerId}`);
        const data = await response.json();
        console.log(data.data);
        return data.data;
      } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
      }
    };
    
    // Example render function to display player info
    const renderSinglePlayer = async (playerId) => {
      const player = await fetchSinglePlayer(playerId);
      if (!player) return;
    
      const container = document.getElementById("player-details");
      container.innerHTML = `
        <h2>${player.name}</h2>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <img src="${player.imageUrl}" alt="${player.name}" />
      `;
    };
    
    // Init function for testing
    const init = async () => {
      // Example usage: fetch and render player with ID 1
      await renderSinglePlayer(1);
    };
    
    init();
    



 /**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj - The player to add
 * @returns {Object} - The player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj)
    });

    const data = await response.json();
    console.log("Player added:", data.data);
    return data.data;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};


/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  
  try {
    const player = await fetch (playerId);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  const container = document.getElementById("player-container");
  container.innerHTML = ""; 

  playerList.forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.classList.add("player-card");

    playerCard.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>Breed:</strong> ${player.breed}</p>
      <p><strong>Status:</strong> ${player.status}</p>
      <img src="${player.imageUrl}" alt="${player.name}" width="200" />
      <button onclick="renderSinglePlayer(${player.id})">View</button>
    `;

    container.appendChild(playerCard);
  });
};


/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const container = document.getElementById("single-player-container");
  container.innerHTML = ""; // Clear previous content

  const playerDetails = document.createElement("div");
  playerDetails.classList.add("player-details");

  playerDetails.innerHTML = `
    <h2>${player.name}</h2>
    <img src="${player.imageUrl}" alt="${player.name}" width="250" />
    <p><strong>Breed:</strong> ${player.breed}</p>
    <p><strong>Status:</strong> ${player.status}</p>
    <button id="back-button">Back to All Players</button>
  `;

  container.appendChild(playerDetails);

  // Optional: Hide the all-players view and show only this
  document.getElementById("player-container").style.display = "none";
  container.style.display = "block";

  // Add event listener to go back
  document.getElementById("back-button").addEventListener("click", () => {
    container.style.display = "none";
    document.getElementById("player-container").style.display = "block";
  });
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  try {
    const players = await fetchAllPlayers(); // Fetch player data from API
    if (players && players.length) {
      renderAllPlayers(players); // Render them to the page
    }

    renderNewPlayerForm(); // Show form to add new players
  } catch (err) {
    console.error("Error", err);
  }
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  try {
    init();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}