// url API
const listHeroes = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api//all.json";

// elements
const heroesElt = document.getElementById("heroes");
const selectedElt = document.getElementById("selected");

// variables
let selectedLength = 0;

ajaxGet(listHeroes, function(response) {
    let heroes = JSON.parse(response);
    
    heroes = getRandHeroes(heroes, 6);

    heroes.forEach(hero => {
        const name = hero.name;
        const powerStats = hero.powerstats;
        const imageSM = hero.images.sm;

        // container elements
        const contentElt = document.createElement("div");
        contentElt.classList.add("col-md-2");

        const boxCardElt = document.createElement("div");
        boxCardElt.classList.add("box-card");
        boxCardElt.addEventListener("click", function() {
            // before heroes selection
            if (selectedLength < 2) {
                const contentSelectedHeroElt = document.createElement("div");
                if (selectedLength === 0) {
                    contentSelectedHeroElt.classList.add("offset-md-3", "col-md-2");
                } else {
                    contentSelectedHeroElt.classList.add("offset-md-2", "col-md-2");
                }

                const boxCardElt = document.createElement("div");
                boxCardElt.classList.add("box-card");

                // hero img element
                const imgElt = document.createElement("img");
                imgElt.src = hero.images.sm;
                imgElt.alt = "Image de " + hero.name;
                boxCardElt.appendChild(imgElt);
                
                // hero name element
                const nameElt = document.createElement("p");
                nameElt.textContent = hero.name;
                nameElt.classList.add("hero-name");
                boxCardElt.appendChild(nameElt);
                
                // hero power stats element
                const listElt = document.createElement("ul");
                for (statId in hero.powerstats) {
                    const statElt = document.createElement("li");
                    statElt.textContent = statId + " : " + powerStats[statId];
                    listElt.appendChild(statElt);
                };
                boxCardElt.appendChild(listElt);

                contentSelectedHeroElt.appendChild(boxCardElt);

                selectedElt.appendChild(contentSelectedHeroElt);
                selectedLength++;

                // after heroes selection
                if (selectedLength === 2) {
                    // create transition before fight
                    setTimeout(function() {
                        // keep only selected heroes
                        document.querySelector("h1").style.display = "none";
                        heroesElt.style.display = "none";

                        // add health bar element to the DOM
                        const boxCardElts = selectedElt.getElementsByClassName("box-card");
                        Array.from(boxCardElts).forEach(elt => {
                            const healthBarElt = document.createElement("div");
                            healthBarElt.style.border = "solid";
                            healthBarElt.style.width = "100%";
                            healthBarElt.style.height = "20px";
                            healthBarElt.style.backgroundColor = "green";

                            elt.insertBefore(healthBarElt, elt.firstElementChild);
                        });
                    }, 2000);
                }
            }
        });
        
        // hero img element
        const imgElt = document.createElement("img");
        imgElt.src = imageSM;
        imgElt.alt = "Image de " + name;
        boxCardElt.appendChild(imgElt);
        
        // hero name element
        const nameElt = document.createElement("p");
        nameElt.textContent = name;
        nameElt.classList.add("hero-name");
        boxCardElt.appendChild(nameElt);
        
        // hero power stats element
        const listElt = document.createElement("ul");
        for (statId in powerStats) {
            const statElt = document.createElement("li");
            statElt.textContent = statId + " : " + powerStats[statId];
            listElt.appendChild(statElt);
        };
        boxCardElt.appendChild(listElt);

        contentElt.appendChild(boxCardElt);

        // add hero to the DOM
        heroesElt.appendChild(contentElt);
    });
});

/*
param heroes[]
param int number
return heroes[] 
with returned heroes.length === number
*/
function getRandHeroes(heroes, number) {
    const heroesLength = heroes.length;
    const randHeroes = [];

    for (let i = 0; i < number; i++) {
        randHeroes.push(heroes[Math.floor((Math.random() * heroesLength) + 1)]);
    }
    return randHeroes;
}

