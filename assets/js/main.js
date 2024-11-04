const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonModal = document.getElementById('pokemonModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.getElementById('closeModal');

const maxRecords = 151;
const limit = 10;
let offset = 0;

const typeColors = {
    normal: '#a6a877',
    grass: '#77c850',
    fire: '#ee7f30',
    water: '#678fee',
    electric: '#f7cf2e',
    ice: '#98d5d7',
    ground: '#dfbf69',
    flying: '#A98FF0',
    poison: '#a040a0',
    fighting: '#bf3029',
    psychic: '#f65687',
    dark: '#725847',
    rock: '#b89137',
    bug: '#a8b720',
    ghost: '#6e5896',
    steel: '#b9b7cf',
    dragon: '#6f38f6',
    fairy: '#f9aec7'
};

function openModal(pokemon) {
    document.getElementById('modalName').innerText = pokemon.name;
    document.getElementById('modalNumber').innerText = `#${pokemon.number}`;
    document.getElementById('modalImage').src = pokemon.photo;
    document.getElementById('modalTypes').innerHTML = pokemon.types.map(
        type => `<li>${type}</li>`
    ).join('');
    
    // Exibir altura, peso e ataque
    document.getElementById('modalHeight').innerText = pokemon.height || 'Não disponível';
    document.getElementById('modalWeight').innerText = pokemon.weight || 'Não disponível';
    document.getElementById('modalAttack').innerText = pokemon.attack || 'Não disponível';
    
    // Definir cor de fundo com base no tipo principal
    const primaryType = pokemon.types[0].toLowerCase();
    modalContent.style.backgroundColor = typeColors[primaryType] || '#fff';

    pokemonModal.style.display = 'block';
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}" onclick='openModal(${JSON.stringify(pokemon)})'>
                </div>
            </li>
        `).join('');
        pokemonList.innerHTML += newHtml;
    });
}

closeModal.onclick = () => {
    pokemonModal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target === pokemonModal) {
        pokemonModal.style.display = 'none';
    }
};

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordswithNexPage = offset + limit;

    if (qtdRecordswithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

loadPokemonItens(offset, limit);
