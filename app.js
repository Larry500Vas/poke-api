//console.log("Hola poke API");

function getRandomInt(min, max){
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max-min))+ min;
}
//getRandomInt(1,151);
//console.log((getRandomInt(1,151)));

document.addEventListener('DOMContentLoaded', ()=> {
 const random = getRandomInt(1,300);
 //console.log(random);
 fetchData(random);

});
// pasamos un id como parametro
const fetchData =async(id)=> {
try {
   
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    
    const pokemon = {
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        experiencia: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      };
      pintarCard(pokemon);    

} catch (error) {
    console.log(error);
    }
};

//pintando en el template

const pintarCard = (pokemon) =>{
    const flex = document.querySelector(".flex");
    const template = document.querySelector("#template-card").content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
  
    clone.querySelector(".card-body-img").setAttribute("src", pokemon.imgCvg);
    clone.querySelector(
      ".card-body-title"
    ).innerHTML = `${pokemon.nombre} <span>${pokemon.hp}hp</span>`;
    clone.querySelector(".card-body-text").textContent =
      pokemon.experiencia + " exp";
    clone.querySelectorAll(".card-footer-social h3")[0].textContent =
      pokemon.ataque + "K";
    clone.querySelectorAll(".card-footer-social h3")[1].textContent =
      pokemon.especial + "K";
    clone.querySelectorAll(".card-footer-social h3")[2].textContent =
      pokemon.defensa + "K";
  
    fragment.appendChild(clone);
    flex.appendChild(fragment);
}



