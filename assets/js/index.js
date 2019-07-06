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
    const intelligence = hero.powerstats.intelligence;
    const power = hero.powerstats.power;
    const strength = hero.powerstats.strength;
    const combat = hero.powerstats.combat;
    const speed = hero.powerstats.speed;
    
    // array with definitive force, luck, speed and life
    const powerstats = calcPowerstats(strength, power, intelligence, combat, speed);

    // force element
    const forceElt = document.createElement("div");
    forceElt.style.height = "10px";
    forceElt.style.witdh = "100%";
    forceElt.style.border = "solid black 1px";

    const forStatElt = document.createElement("div");
    forStatElt.style.backgroundColor = "red";
    forStatElt.style.height = "100%";
    forStatElt.style.width = powerstats.force + "%";
    forStatElt.classList.add("force");
    
    forceElt.appendChild(forStatElt);

    // luck element
    const luckElt = document.createElement("div");
    luckElt.style.height = "10px";
    luckElt.style.witdh = "100%";
    luckElt.style.border = "solid black 1px";

    const lucStatElt = document.createElement("div");
    lucStatElt.style.backgroundColor = "green";
    lucStatElt.style.height = "100%";
    lucStatElt.style.width = powerstats.luck + "%";
    lucStatElt.classList.add("luck");

    luckElt.appendChild(lucStatElt);

    // speed element
    const speedElt = document.createElement("div");
    speedElt.style.height = "10px";
    speedElt.style.witdh = "100%";
    speedElt.style.border = "solid black 1px";

    const speStatElt = document.createElement("div");
    speStatElt.style.backgroundColor = "yellow";
    speStatElt.style.height = "100%";
    speStatElt.style.width = powerstats.speed + "%";
    speStatElt.classList.add("speed");
    
    speedElt.appendChild(speStatElt);
    
    // hero stats element
    const heroStatsElt = document.createElement("div");
    
    heroStatsElt.appendChild(forceElt);
    heroStatsElt.appendChild(luckElt);
    heroStatsElt.appendChild(speedElt);

    return heroStatsElt;
}

function getForce(strength, power) {
    const pow = (power + strength) / 2;
    return pow;
}

function getLuck(intelligence, combat) {
    const luck = (intelligence + combat) / 2;
    return luck;
}

function calcPowerstats(strength, power, intelligence, combat, speed) {
    const force = getForce(strength, power);
    const luck = getLuck(intelligence, combat);
    const calcPowerstats = {
        force: force,
        luck: luck,
        speed: speed,
        life: 100 
    };

    return calcPowerstats;
}