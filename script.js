let fetchedPokemon = [];
let currentOffset = 0;
let loadAmount = 20;
let totalGenOne = 151;
let activePokemonIndex = 0;
let currentSearchIndices = [];

async function init() {
    await loadMore();
}

async function loadMore() {
    if (currentOffset >= totalGenOne) return;
    setLoadingState(true);
  
    let fetchLimit = loadAmount;
    if (currentOffset + loadAmount > totalGenOne) {
        fetchLimit = totalGenOne - currentOffset;
    }
  
    await fetchPokemonBatch(fetchLimit);
    updateOffsetAndButton(fetchLimit);
    setTimeout(() => setLoadingState(false), 1500);
}

async function fetchPokemonBatch(limit) {
    try {
        let apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${limit}`;
        let response = await fetch(apiUrl);
        let rawData = await response.json();
        await fetchAndRenderDetails(rawData.results);
    } catch (e) {}
}

function updateOffsetAndButton(limit) {
    currentOffset += limit;
  
    if (currentOffset >= totalGenOne) {
        let loadBtn = document.querySelector(".load-button");
        if (loadBtn) loadBtn.classList.add("d-none");
    }
}

async function fetchAndRenderDetails(results) {
    for (let i = 0; i < results.length; i++) {
        let singleRes = await fetch(results[i].url);
        let pData = await singleRes.json();
        fetchedPokemon.push(pData);
        drawPokemonCard(pData, fetchedPokemon.length - 1);
    }
}

function drawPokemonCard(data, index) {
    let container = document.getElementById("pokemon-container");
    data.typesHtml = "";
    for (let i = 0; i < data.types.length; i++) {
        data.typesHtml += createBadge(data.types[i].type.name);
    }
    data.img = data.sprites.other["official-artwork"].front_default;
    data.mainType = data.types[0].type.name;
    data.cardIndex = index;
    
    container.innerHTML += createPokemonCard(data);
}

function setLoadingState(isLoading) {
    let loader = document.getElementById('loading-screen');
    let btn = document.getElementById('load-more-btn');
    
    if (isLoading) {
        loader.classList.remove('d-none');
        btn.classList.add('d-none');
        document.body.classList.add('no-scroll');
    } else {
        loader.classList.add('d-none');
        btn.classList.remove('d-none');
        document.body.classList.remove('no-scroll');
    }
}

function openPokemonDialog(index) {
    activePokemonIndex = index;
    let pokeData = fetchedPokemon[index];
    
    pokeData.typesHtml = "";
    for (let i = 0; i < pokeData.types.length; i++) {
        pokeData.typesHtml += createBadge(pokeData.types[i].type.name);
    }
    
    pokeData.mainHtml = generateTabHtml("main", pokeData);
    pokeData.img = pokeData.sprites.other["official-artwork"].front_default;
    pokeData.mainType = pokeData.types[0].type.name;
    
    let overlayBox = document.getElementById("overlay-content");
    overlayBox.innerHTML = createOverlay(pokeData);
    
    document.getElementById("overlay").showModal();
    document.body.classList.add("no-scroll");
}

function switchDialogTab(tabName) {
    let currentPoke = fetchedPokemon[activePokemonIndex];
    let contentDiv = document.getElementById("dialog-content");
    contentDiv.innerHTML = generateTabHtml(tabName, currentPoke);
    
    if (tabName === "main") {
        document.getElementById("btn-main").classList.add("active");
        document.getElementById("btn-stats").classList.remove("active");
    } else {
        document.getElementById("btn-main").classList.remove("active");
        document.getElementById("btn-stats").classList.add("active");
    }
}

function generateTabHtml(tab, data) {
    if (tab === "main") {
        return generateMainTabHtml(data);
    } else {
        return generateStatsTabHtml(data);
    }
}

function generateMainTabHtml(data) {
    let abils = "";
    for (let i = 0; i < data.abilities.length; i++) {
        abils += data.abilities[i].ability.name;
        if (i < data.abilities.length - 1) {
            abils += ", ";
        }
    }
    
    data.abilitiesStr = abils;
    data.heightStr = data.height / 10;
    data.weightStr = data.weight / 10;
    
    return createMainInfo(data);
}

function generateStatsTabHtml(data) {
    let htmlResult = '<div style="width: 100%">';
    for (let i = 0; i < data.stats.length; i++) {
        let statObj = data.stats[i];
        let statData = {
            name: getCustomStatName(statObj.stat.name),
            value: statObj.base_stat,
            percent: (statObj.base_stat / 150) * 100
        };
        if (statData.percent > 100) {
            statData.percent = 100;
        }
        htmlResult += createStatBar(statData);
    }
    htmlResult += "</div>";
    return htmlResult;
}

function getCustomStatName(originalName) {
    let customNames = {
        hp: "HP",
        attack: "ATK",
        defense: "DEF",
        "special-attack": "S-ATK",
        "special-defense": "S-DEF",
        speed: "SPD",
    };

    if (customNames[originalName]) {
        return customNames[originalName];
    }
    return originalName;
}

function closeDialog() {
    document.getElementById("overlay").close();
    document.body.classList.remove("no-scroll");
}

function goNext() {
    if (currentSearchIndices.length > 0) {
        let currentIndex = currentSearchIndices.indexOf(activePokemonIndex);
        currentIndex++;
        if (currentIndex >= currentSearchIndices.length) {
            currentIndex = 0;
        }
        activePokemonIndex = currentSearchIndices[currentIndex];
    } else {
        activePokemonIndex++;
        if (activePokemonIndex >= fetchedPokemon.length) {
            activePokemonIndex = 0;
        }
    }
    openPokemonDialog(activePokemonIndex);
}

function goPrevious() {
    if (currentSearchIndices.length > 0) {
        let currentIndex = currentSearchIndices.indexOf(activePokemonIndex);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = currentSearchIndices.length - 1;
        }
        activePokemonIndex = currentSearchIndices[currentIndex];
    } else {
        activePokemonIndex--;
        if (activePokemonIndex < 0) {
            activePokemonIndex = fetchedPokemon.length - 1;
        }
    }
    openPokemonDialog(activePokemonIndex);
}

function closeDialog(event) {
    let dialog = document.getElementById("overlay");

    if (event.target === dialog) {
        dialog.close();
        document.body.classList.remove("no-scroll");
    }
}

function startSearch() {
    let inputVal = document.getElementById('search').value.toLowerCase().trim();
    let container = document.getElementById('pokemon-container');
    let loadBtn = document.querySelector('.load-button');
    
    container.innerHTML = '';
    currentSearchIndices = [];

    if (inputVal.length === 0) {
        if (loadBtn && currentOffset < totalGenOne) loadBtn.classList.remove('d-none');
        return renderAllPokemon();
    }
    
    if (loadBtn) loadBtn.classList.add('d-none');
    inputVal.length < 3 ? showMinCharMessage() : filterAndRenderPokemon(inputVal);
}

function renderAllPokemon() {
    for (let i = 0; i < fetchedPokemon.length; i++) {
        drawPokemonCard(fetchedPokemon[i], i);
    }
}

function filterAndRenderPokemon(inputVal) {
    let foundItems = [];
    for (let i = 0; i < fetchedPokemon.length; i++) {
        if (fetchedPokemon[i].name.includes(inputVal)) {
            foundItems.push(fetchedPokemon[i]);
        }
    }
    showSearchResults(foundItems);
}

function showSearchResults(foundItems) {
    let container = document.getElementById('pokemon-container');
    currentSearchIndices = [];
    
    if (foundItems.length === 0) {
        container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px;"><h2>No Pokémon found</h2></div>`;
    } else {
        for (let i = 0; i < foundItems.length; i++) {
            let originalId = fetchedPokemon.indexOf(foundItems[i]);
            currentSearchIndices.push(originalId);
            drawPokemonCard(foundItems[i], originalId);
        }
    }
}

function checkSearchInput() {
    let val = document.getElementById('search').value;
    let clearBtn = document.getElementById('clear-search-btn');
    
    if (val.length > 0) {
        clearBtn.classList.remove('d-none');
    } else {
        clearBtn.classList.add('d-none');
        startSearch();
    }
}

function handleSearchKey(event) {
    if (event.key === 'Enter') {
        startSearch();
    }
}

function clearSearch() {
    document.getElementById('search').value = '';
    document.getElementById('clear-search-btn').classList.add('d-none');
    startSearch();
}