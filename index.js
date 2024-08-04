async function getPokemon(){
    var pokeName = document.getElementById("pokeName").value.toLocaleLowerCase();
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if(!response.ok){
        throw new Error("Nooooooooooooo");
    }else{
        let data = await response.json();
        // console.log(data);
        let pokesprites = data.sprites.front_default;
        // console.log(pokesprites);
        let image = document.getElementById("sprite");
        image.src = pokesprites;
        image.style.display = "block"
    }
}