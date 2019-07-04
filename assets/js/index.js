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
                    selectedOne = true;
                } else if (!selectedTwo) {
                    const selectedTwoElt = document.querySelector(".selected-two");
                    selectedTwoElt.parentNode.replaceChild(cloneBoxHero, selectedTwoElt);
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