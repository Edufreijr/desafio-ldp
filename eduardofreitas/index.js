const inputPokemon = document.getElementById("nomePokemon");
const botaoPesquisar = document.getElementById("pesquisar");
const resultado = document.getElementById("resultado");
const pokemonsFavoritos = document.getElementById("pokemonsFavoritos");

botaoPesquisar.addEventListener("click",buscarPokemon);

async function buscarPokemon() {
    const nomePokemon = inputPokemon.value.toLowerCase(); //funcao para certificar que todos os nomes de pokemon não possuam letras maiusculas

try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
    if (resposta.ok == false ) {
        throw new Error ("Pokemon não encontrado");
    }
        const dados = await resposta.json();

        resultado.innerHTML = `
            <h2>${dados.name}</h2>

            <img src="${dados.sprites.front_default}">

            <p>Tipo:${dados.types[0].type.name}</p>

            <button onclick="favoritarPokemon('${dados.name}')">
                Favorite
            </button>
        `;
        inputPokemon.value= "";

} catch(erro){
    alert("Erro ao buscar o Pokemon");}

}

function favoritarPokemon(nome) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favoritos.includes(nome)) {
        alert("Esse Pokémon já está nos favoritos!");
        return;
    }
    if (favoritos.length >= 6) {
        alert("Seu time já possui 6 Pokémons.");
        return;
    }
    favoritos.push(nome);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    exibirFavoritos();
}
   

async function exibirFavoritos(){
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; 
    pokemonsFavoritos.innerHTML = "";
    if(favoritos.length === 0){

        pokemonsFavoritos.innerHTML = "<p>Nenhum Pokemon Favoritado</p>";
        return;

    }

    for (const pokemon of favoritos){
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const dados = await resposta.json();

        pokemonsFavoritos.innerHTML += `
            <div>
                <img src="${dados.sprites.front_default}">
                <p>${dados.name}<p>
                <button onclick="removerFavorito('${dados.name}')">
                    Remover
                </button>
                </div>

        `;
    }

 }

exibirFavoritos();

function removerFavorito(nome){

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

favoritos = favoritos.filter(function(pokemon){

    return pokemon !==nome;
});

localStorage.setItem("favoritos",JSON.stringify(favoritos));

exibirFavoritos();


}
