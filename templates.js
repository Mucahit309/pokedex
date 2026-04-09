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

function createBadge(typeName) {
  return `<span style="filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.3));" class="type-badge bg-${typeName}">${typeName}</span>`;
}

function createOverlay(id, name, img, mainType, typesHtml, contentArea) {
  return `
        <div class="dialog-card">
            <div class="dialog-header bg-${mainType}">
                <button class="nav-arrow arrow-left" onclick="goPrevious()">&#10094;</button>
                <button class="nav-arrow arrow-right" onclick="goNext()">&#10095;</button>
                <div style="font-weight: bold; margin-bottom: 5px; opacity: 0.8;">#${id}</div>
                <h2 style="margin: 0 0 15px 0; letter-spacing: 1px; text-transform: uppercase;">${name}</h2>
                <img src="${img}" style="height: 200px; width: auto; object-fit: contain; filter: drop-shadow(0 8px 12px rgba(0,0,0,0.3));">
                <div style="margin-top: 15px;">${typesHtml}</div>
            </div>
            <div class="dialog-tabs">
                <button id="btn-main" class="active" onclick="switchDialogTab('main')">MAIN</button>
                <button id="btn-stats" onclick="switchDialogTab('stats')">STATS</button>
            </div>
            <div id="dialog-content" class="dialog-content">
                ${contentArea}
            </div>
        </div>
    `;
}

function createMainInfo(height, weight, exp, abilitiesStr) {
  return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
            <div style="padding: 15px; background: #232d36; border-radius: 15px; text-align: center;">
                <span style="color: #888; font-size: 12px;">HEIGHT</span><br><b style="font-size: 18px;">${height} m</b>
            </div>
            <div style="padding: 15px; background: #232d36; border-radius: 15px; text-align: center;">
                <span style="color: #888; font-size: 12px;">WEIGHT</span><br><b style="font-size: 18px;">${weight} kg</b>
            </div>
            <div style="padding: 15px; background: #232d36; border-radius: 15px; text-align: center;">
                <span style="color: #888; font-size: 12px;">BASE EXP</span><br><b style="font-size: 18px;">${exp}</b>
            </div>
            <div style="padding: 15px; background: #232d36; border-radius: 15px; text-align: center;">
                <span style="color: #888; font-size: 12px;">ABILITIES</span><br><b style="text-transform: capitalize; font-size: 14px;">${abilitiesStr}</b>
            </div>
        </div>
    `;
}

function createStatBar(name, value, percent) {
  return `
        <div class="stat-row">
            <div class="stat-name">${name}</div>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${percent}%"></div>
            </div>
            <div style="width: 35px; text-align: right; font-weight: bold;">${value}</div>
        </div>
    `;
}

function showMinCharMessage() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px; color:#888;"><h2>Please enter at least 3 characters...</h2></div>`;
}