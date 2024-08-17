window.onload = pokeName.focus();

const suggestionData = [
  "pikachu",
  "pichu",
  "pidgeotto",
  "pignite",
  "pikipek",
  "charmander",
  "charizard",
  "bulbasaur",
  "budew",
  "buizel",
  "bunnelby",
  "buneary",
  "meditite",
  "meowth",
  "mew",
  "mewtwo",
  "melmetal",
  "meltan",
  "meganium",
];

const err = document.getElementById("err");
const suggest = document.querySelector(".suggest");

let searchKey = "";
function suggestor(e) {
  searchKey = e.target.value;
  if (searchKey.length == 0) {
    removeSuggest();
  }
  if (searchKey.length > 0) {
    removeSuggest();
    const temparr = suggestionData.filter((item) => item.startsWith(searchKey));
    suggest.style.display = "block";
    console.log(suggest.childElementCount);
    createSuggestions(temparr);
  }
}

pokeName.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getPokemon();
    removeSuggest();
  }
});

pokeName.addEventListener("input", function (event) {
  suggestor(event);
});

async function getPokemon() {
  var pokeName = document.getElementById("pokeName").value.toLocaleLowerCase();
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
  if (!response.ok) {
    err.style.visibility = "visible";
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
    list.id = "suggest_child";
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
