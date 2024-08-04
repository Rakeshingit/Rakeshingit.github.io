const suggestionData = {
  pi: ["pikachu", "pichu", "pidgeotto", "pignite", "pikipek"],
  ch: ["charmander", "charizard"],
  bu: ["bulbasaur", "budew", "buizel", "bunnelby", "buneary"],
  me: ["meditite", "meowth", "mew", "mewtwo", "melmetal", "meltan", "meganium"],
};

const err = document.getElementById("err");
const suggest = document.querySelector(".suggest");

pokeName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getPokemon();
    removeSuggest();
  }
});

// pokeName.addEventListener("focus", function () {
//   suggest.style.display = "block";
// });
// pokeName.addEventListener("blur", removeSuggest);

let searchKey;

pokeName.addEventListener("input", function () {
  let query = this.value;
  if (query.length === 0 || query.length <= 1) {
    suggest.style.display = "none";
    return;
  }
  if (query[0] + query[1] === searchKey) return;

  searchKey = query[0] + query[1];

  suggest.style.display = "block";

  const suggestion = suggestionData[searchKey] || [];

  createSuggestions(suggestion);
});

async function getPokemon() {
  var pokeName = document.getElementById("pokeName").value.toLocaleLowerCase();
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  if (!response.ok) {
    err.style.visibility = "visible";
    // window.alert("Not found");
    setTimeout(() => {
      err.style.visibility = "hidden";
    }, 3000);
    // clearTimeout();
    throw new Error("Nooooooooooooo");
  } else {
    let data = await response.json();
    let pokesprites = data.sprites.front_default;
    let image = document.getElementById("sprite");
    image.src = pokesprites;
    image.style.display = "block";
  }
}

function adjustWidth() {
  var searchArea = document.querySelector("#pokeName");
  var searchButton = document.querySelector("#btn");
  var suggestor = document.querySelector(".suggest");
  var combineWidth = searchArea.offsetWidth + searchButton.offsetWidth;
  suggestor.style.width = combineWidth + "px";
  suggestor.style.margin = searchArea.offsetHeight + "px";
}
window.onload = adjustWidth;

function createSuggestions(items) {
  items.forEach((item) => {
    let list = document.createElement("li");
    list.textContent = item;
    list.addEventListener("click", function () {
      console.log(item);
      pokeName.value = item;
      removeSuggest();
      getPokemon();
    });
    suggest.appendChild(list);
  });
}

function removeSuggest() {
  suggest.innerHTML = "";
  suggest.style.display = "none";
}
