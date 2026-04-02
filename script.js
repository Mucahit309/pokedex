let fetchedPokemon = [];
let currentOffset = 0;
let loadAmount = 20;
let totalGenOne = 151;
//
async function init() {
    await loadMore();
}

async function loadMore() {
    if (currentOffset >= totalGenOne) return;
    
    let fetchLimit = loadAmount;
    if (currentOffset + loadAmount > totalGenOne) {
        fetchLimit = totalGenOne - currentOffset;
    }

    let apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${fetchLimit}`;
    
    try {
        let response = await fetch(apiUrl);
        let rawData = await response.json();
        
        for (let i = 0; i < rawData.results.length; i++) {
            let singleRes = await fetch(rawData.results[i].url);
            let Pdata = await singleRes.json();
            fetchedPokemon.push(Pdata);
            
            let index = fetchedPokemon.length - 1;
            drawPokemonCard(Pdata, index);
        }
        
        currentOffset += fetchLimit;
        
        if (currentOffset >= totalGenOne) {
            let loadBtn = document.getElementById('load-more-btn');
            loadBtn.classList.add('d-none');
        }
    } catch (e) {
        console.error('Error fetching Pokémon data:', e);
    }
}

function drawPokemonCard(data, index) {
    let container = document.getElementById('pokemon-container');
    let allTypes = '';
    
    for (let i = 0; i < data.types.length; i++) {
        allTypes += createBadge(data.types[i].type.name);
    }
    
    let imageUrl = data.sprites.other['official-artwork'].front_default;
    let typeMain = data.types[0].type.name;
    
    container.innerHTML += createPokemonCard(data.id, data.name, imageUrl, typeMain, allTypes, index);
}

function searchPokemon() {
    
}

function openPokemonDialog(index) {

}

function closeDialog() {

}

function preventClickThrough(event) {

}

//TODO:
//Loadingscreen with timer

//Dialog function
//Dialog Tabs
//Dialog Content (Info, Stats)
//Dialog Next and Previous Button

//Search function
//Search by name or ID
//Search results update the displayed Pokémon cards