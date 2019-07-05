// url API
const listHeroes = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api//all.json";

// elements
const containerElt = document.querySelector(".container");

fetch(listHeroes)
    // get heroes from API
    .then(function(response) { return response.json() })
    // get random heroes array
    .then(function(data) {
        // heroes
        const xRandHeroes = getXRandHeroes(6, data.length, data);
        return xRandHeroes;
    })
    // add heroes selection
    .then(function(xRandHeroes) {
        for(randHeroId in xRandHeroes) {
            const heroBoxElt = createHeroBox(xRandHeroes[randHeroId]);

            // custom grid style
            heroBoxElt.classList.add("col-md-4");            

            // add hero box to the DOM
            const selectionHeroesElt = document.getElementById("selection-heroes");
            selectionHeroesElt.appendChild(heroBoxElt);
        }

        let selectedOne = false;
        let selectedTwo = false;

        // Add event listener to selection images
        const imgSelectionElts = document.getElementsByClassName("img-selection");
        for (imgSelectionElt of imgSelectionElts) {
            imgSelectionElt.addEventListener("click", function(e) {
                // get hero id
                const id = e.target.id;

                // get hero-box element and create clone
                const relElt = e.target.parentNode;
                const boxHero = relElt.parentNode;
                const cloneBoxHero = boxHero.cloneNode(true);

                // change clone style and class
                cloneBoxHero.classList.remove("col-md-4");
                cloneBoxHero.classList.add("col");
                cloneBoxHero.firstElementChild.style.width = "161.6px";
                cloneBoxHero.firstElementChild.classList.add("mx-auto", "d-block");
                
                // replace default player selection with selected hero
                if (!selectedOne) {
                    const selectedOneElt = document.querySelector(".selected-one");
                    selectedOneElt.parentNode.replaceChild(cloneBoxHero, selectedOneElt);

                    // add hero stats element
                    const heroStatsElt = createHeroStatsElt(xRandHeroes[id]);
                    heroStatsElt.style.width = "161.6px";
                    heroStatsElt.classList.add("stats-one", "mx-auto", "d-block");

                    const playerElt = document.querySelector(".player-one .hero-box");
                    playerElt.appendChild(heroStatsElt);

                    selectedOne = true;
                } else if (!selectedTwo) {
                    const selectedTwoElt = document.querySelector(".selected-two");
                    selectedTwoElt.parentNode.replaceChild(cloneBoxHero, selectedTwoElt);

                    // add hero stats element
                    const heroStatsElt = createHeroStatsElt(xRandHeroes[id]);
                    heroStatsElt.style.width = "161.6px";
                    heroStatsElt.classList.add("stats-one", "mx-auto", "d-block");
                    
                    const playerElt = document.querySelector(".player-two .hero-box");
                    playerElt.appendChild(heroStatsElt);

                    selectedTwo = true;
                }
            });
        }
    })
    // remove loader and display heroes selection
    .then(function() {
        setTimeout(function() {
            containerElt.removeChild(containerElt.firstElementChild)
            const gameFrameElt = document.querySelector(".game-frame");
            gameFrameElt.classList.remove("game-frame");
        }, 4500);
    })


function getXRandHeroes(x, limit, allHeroes) {
    const xRandHeroes = {};

    let i = 0
    while (i < x) {
        const randHero = allHeroes[Math.floor(Math.random() * Math.floor(limit))];
        xRandHeroes[randHero.id] = randHero;
        i++;
    }
    
    return xRandHeroes;
}

function createHeroBox(randHero) {
    // create div
    const divElt = document.createElement("div");
    divElt.classList.add("hero-box");
    // divElt.id = randHero.id;

    // create div position relative
    const divRelElt = document.createElement("div");
    divRelElt.classList.add("box-relative");
    // divRelElt.style.position = "relative";

    // create img
    const imgElt = document.createElement("img");
    imgElt.src = randHero.images.sm;
    imgElt.id = randHero.id;
    imgElt.classList.add("img-selection");

    // create hero name
    const nameElt = document.createElement("p");
    nameElt.textContent = randHero.name;
    nameElt.classList.add("hero-name", "text-center");
    nameElt.style.position = "absolute";

    // create card hero
    divRelElt.appendChild(imgElt);
    divRelElt.appendChild(nameElt);
    divElt.appendChild(divRelElt);

    return divElt;
}

function createHeroStatsElt(hero) {
    // intelligence element
    const intelligenceElt = document.createElement("div");
    intelligenceElt.style.height = "10px";
    intelligenceElt.style.witdh = "100%";
    intelligenceElt.style.border = "solid black 1px";

    const intStatElt = document.createElement("div");
    intStatElt.style.backgroundColor = "blue";
    intStatElt.style.height = "100%";
    intStatElt.style.width = hero.powerstats.intelligence + "%";
    intStatElt.classList.add("intelligence");
    
    intelligenceElt.appendChild(intStatElt);
    
    // strength element
    const strengthElt = document.createElement("div");
    strengthElt.style.height = "10px";
    strengthElt.style.witdh = "100%";
    strengthElt.style.border = "solid black 1px";

    const strStatElt = document.createElement("div");
    strStatElt.style.backgroundColor = "red";
    strStatElt.style.height = "100%";
    strStatElt.style.width = hero.powerstats.strength + "%";
    strStatElt.classList.add("strength");
    
    strengthElt.appendChild(strStatElt);
    
    // speed element
    const speedElt = document.createElement("div");
    speedElt.style.height = "10px";
    speedElt.style.witdh = "100%";
    speedElt.style.border = "solid black 1px";

    const speStatElt = document.createElement("div");
    speStatElt.style.backgroundColor = "yellow";
    speStatElt.style.height = "100%";
    speStatElt.style.width = hero.powerstats.speed + "%";
    speStatElt.classList.add("strength");
    
    speedElt.appendChild(speStatElt);

    // durability element
    const durabilityElt = document.createElement("div");
    durabilityElt.style.height = "10px";
    durabilityElt.style.witdh = "100%";
    durabilityElt.style.border = "solid black 1px";

    const durStatElt = document.createElement("div");
    durStatElt.style.backgroundColor = "green";
    durStatElt.style.height = "100%";
    durStatElt.style.width = hero.powerstats.durability + "%";
    durStatElt.classList.add("durability");
    
    durabilityElt.appendChild(durStatElt);

    // power element
    const powerElt = document.createElement("div");
    powerElt.style.height = "10px";
    powerElt.style.witdh = "100%";
    powerElt.style.border = "solid black 1px";

    const powStatElt = document.createElement("div");
    powStatElt.style.backgroundColor = "red";
    powStatElt.style.height = "100%";
    powStatElt.style.width = hero.powerstats.power + "%";
    powStatElt.classList.add("power");
    
    powerElt.appendChild(powStatElt);

    // combat element
    const combatElt = document.createElement("div");
    combatElt.style.height = "10px";
    combatElt.style.witdh = "100%";
    combatElt.style.border = "solid black 1px";

    const comStatElt = document.createElement("div");
    comStatElt.style.backgroundColor = "purple";
    comStatElt.style.height = "100%";
    comStatElt.style.width = hero.powerstats.combat + "%";
    comStatElt.classList.add("combat");
    
    combatElt.appendChild(comStatElt);

    // hero stats element
    const heroStatsElt = document.createElement("div");
    
    heroStatsElt.appendChild(intelligenceElt);
    heroStatsElt.appendChild(strengthElt);
    heroStatsElt.appendChild(speedElt);
    heroStatsElt.appendChild(durabilityElt);
    heroStatsElt.appendChild(powerElt);
    heroStatsElt.appendChild(combatElt);

    return heroStatsElt;
}