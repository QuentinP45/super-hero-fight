// url API
const listHeroes = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api//all.json";

// elements
const containerElt = document.querySelector(".container");

fetch(listHeroes)
    .then(function(response) { return response.json() })
    .then(function(data) {
        // heroes
        const xRandHeroes = getXRandHeroes(6, data.length, data);
        return xRandHeroes;
    })
    .then(function(xRandHeroes) {
        // add heroes selection
        xRandHeroes.forEach(randHero => {
            addToSelection(randHero);
        })
    })
    .then(function() {
        setTimeout(function() {
            containerElt.removeChild(containerElt.firstElementChild)
            const gameFrameElt = document.querySelector(".game-frame");
            gameFrameElt.classList.remove("game-frame");
        }, 5000);
    })


function getXRandHeroes(x, limit, allHeroes) {
    const xRandHeroes = [];
    for (let i = 0; i < x; i++) {
        const randHeroId = allHeroes[Math.floor(Math.random() * Math.floor(limit))].id;

        if (randHeroId) {
            xRandHeroes.push(allHeroes[Math.floor(Math.random() * Math.floor(limit))]);
        }
    }
    return xRandHeroes;
}

function addToSelection(randHero) {
    const selectionHeroesElt = document.getElementById("selection-heroes");

    // create div with col-4
    const divElt = document.createElement("div");
    divElt.classList.add("col-md-4", "hero-box");
    divElt.id = randHero.id;

    // create div position relative
    const divRelElt = document.createElement("div");
    divRelElt.classList.add("box-relative");
    divRelElt.style.position = "relative";

    // create img
    const imgElt = document.createElement("img");
    imgElt.src = randHero.images.sm;

    // create hero name
    const nameElt = document.createElement("p");
    nameElt.textContent = randHero.name;
    nameElt.classList.add("hero-name", "text-center");
    nameElt.style.position = "absolute";

    // create card hero
    divRelElt.appendChild(imgElt);
    divRelElt.appendChild(nameElt);
    divElt.appendChild(divRelElt);

    // add card hero to the DOM
    selectionHeroesElt.appendChild(divElt);
    console.log("Ajout des héros dans le bloc sélection");
}