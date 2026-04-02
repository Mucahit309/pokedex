function createBadge(typeName) {
    return `<span class="type-badge">${typeName}</span>`;
}

function createPokemonCard(id, name, img, mainType, typesHtml, index) {
    return `
        <div class="pokemon-card" onclick="openPokemonDialog(${index})">
            <div class="card-top bg-${mainType}">
                <span>#${id}</span>
                <img src="${img}" alt="${name}">
            </div>
            <h3>${name}</h3>
            <div class="types-container">${typesHtml}</div>
        </div>
    `;
}