"use strict";
// fetch(" https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/1/")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("pokemon not found");
//     }
//     return response.json();
//   })
//   .then((data) => console.log(data.id))
//   .catch((error) => console.error(error));

async function fetchData() {
  try {
    if (event) event.preventDefault();
    // adding the input id
    const pokemonName = document
      .getElementById("pokemonName")
      .value.toLowerCase();
    //   creating a string that takes the data from input and adds it to the url to fetch a specific data set  from the api
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}/`
    );
    if (!response.ok) {
      throw new Error("pokemon not found");
    }
    const data = await response.json();
    // select the img u wnat to apear
    const pokemonSprites = data.sprites.front_default;
    // se the img in the img id
    const imgElement = document.getElementById("pokemonSprite");

    imgElement.src = pokemonSprites;
    imgElement.style.display = "block";
    imgElement.style.width = "200px";
    imgElement.style.height = "200px";
    imgElement.style.margin = "auto";

    // pokemon name
    const nameElement = document.getElementById("pokemon-name");
    nameElement.textContent = `${data.name}`;
    // pokemon id
    const idElement = document.getElementById("pokemon-id");
    idElement.textContent = `#${data.id}`;
    // pokemon weight
    const weightElement = document.getElementById("weight");
    weightElement.textContent = `Weight: ${data.weight}`;
    // pokemon height
    const heightElement = document.getElementById("height");
    heightElement.textContent = `Height: ${data.height}`;
    // pokemon type
    const types = data.types.map((type) => type.type.name).join(", ");
    document.getElementById("type").textContent = ` ${types}`;
    console.log(data);
    // stats
    data.stats.forEach((statEntry) => {
      const statName = statEntry.stat.name;
      const baseStat = statEntry.base_stat;
      // Match statName to a div ID
      const statCell = document.getElementById(
        statName.replace("special-", "sp-")
      ); // Adjust for special-attack/defense
      if (statCell) {
        statCell.textContent = baseStat;
      }
    });
  } catch (error) {
    console.error(error);
  }
}
