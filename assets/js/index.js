// url API
const listHeroes = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api//all.json";

// elements
const heroesElt = document.getElementById("heroes");
const selectedElt = document.getElementById("selected");

// variables
let selectedLength = 0;
const selectedHeroes = [];

ajaxGet(listHeroes, function(response) {
    let heroes = JSON.parse(response);
    
    heroes = getRandHeroes(heroes, 6);

    heroes.forEach(hero => {
        const name = hero.name;
        const powerStats = hero.powerstats;
        const imageSM = hero.images.sm;

        // container elements
        const contentElt = document.createElement("div");
        contentElt.classList.add("col-6", "col-sm-4", "col-md-2");

        const boxCardElt = document.createElement("div");
        boxCardElt.classList.add("box-card");
        boxCardElt.addEventListener("click", function() {
            

            // before heroes selection
            if (selectedLength < 2) {
                selectedHeroes.push(hero);

                const contentSelectedHeroElt = document.createElement("div");
                if (selectedLength === 0) {
                    contentSelectedHeroElt.classList.add("col-6", "offset-sm-1", "col-sm-5", "offset-md-2", "col-md-4");
                } else {
                    contentSelectedHeroElt.classList.add("col-6", "col-sm-5", "col-md-4");
                }

                const boxCardElt = document.createElement("div");
                boxCardElt.classList.add("box-card");

                // hero img element
                const imgElt = document.createElement("img");
                imgElt.src = hero.images.sm;
                imgElt.alt = "Image de " + hero.name;
                imgElt.classList.add("img-fluid");
                
                // hero name element
                const nameElt = document.createElement("p");
                nameElt.textContent = hero.name;
                nameElt.classList.add("hero-name");

                // relElt contains img + name
                const divRel = document.createElement("div");
                divRel.style.position = "relative";
                divRel.style.display = "inline-block";
                divRel.appendChild(imgElt);
                divRel.appendChild(nameElt);

                boxCardElt.appendChild(divRel);

                contentElt.appendChild(boxCardElt);
                
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
                        let j = 0;
                        Array.from(boxCardElts).forEach(elt => {
                            elt.id = selectedHeroes[j].id;
                            elt.style.display = "inline-block";

                            const healthBarElt = document.createElement("div");
                            healthBarElt.style.border = "solid";
                            healthBarElt.style.width = "100%";
                            healthBarElt.style.height = "20px";
                            
                            const healthElt = document.createElement("div");
                            if (j === 0) {
                                healthElt.id = "health-1";
                            } else {
                                healthElt.id = "health-2";
                            }
                            healthElt.style.width = "100%";
                            healthElt.style.height = "15px";
                            healthElt.style.backgroundColor = "green";

                            healthBarElt.appendChild(healthElt);

                            elt.insertBefore(healthBarElt, elt.firstElementChild);
                            j++;
                        });

                        setTimeout(startFight(selectedHeroes), 2000);
                    }, 850);
                }
            }
        });
        
        // hero img element
        const imgElt = document.createElement("img");
        imgElt.src = imageSM;
        imgElt.alt = "Image de " + name;
        imgElt.classList.add("img-fluid");
              
        // hero name element
        const nameElt = document.createElement("p");
        nameElt.textContent = name;
        nameElt.classList.add("hero-name");

        // relElt contains img + name
        const divRel = document.createElement("div");
        divRel.style.position = "relative";
        divRel.style.display = "inline-block";
        divRel.appendChild(imgElt);
        divRel.appendChild(nameElt);

        boxCardElt.appendChild(divRel);

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

function startFight() {

    // heros id
    const hero1Id = selectedHeroes[0].id;
    const hero2Id = selectedHeroes[1].id;

    // health
    const health1Elt = document.getElementById("health-1");
    let health1Indicator = 100;
    const health2Elt = document.getElementById("health-2");
    let health2Indicator = 100;

    // powerstats
    const forceHero1 = selectedHeroes[0].powerstats.strength/10;

    const forceHero2 = selectedHeroes[1].powerstats.strength/10;

    // fight loop
    const fightToTheDeath = setInterval(function() {
        // if no hero has lost
        if (health1Indicator > 0 && health2Indicator > 0) {
            // if hero1 attacks and hero2 lifeIndic > hero1 strength 
            if (forceHero1 < health2Indicator) {
                let lifeLeft = String(health2Indicator - forceHero1);
                health2Elt.style.width =  lifeLeft + "%";
                health2Indicator = lifeLeft;

                // if hero2 attacks and hero1 lifeIndic > hero2 strength
                if (forceHero2 < health1Indicator) {
                    lifeLeft = String(health1Indicator - forceHero2);
                    health1Elt.style.width =  lifeLeft + "%";
                    health1Indicator = lifeLeft;
                } else {
                    // Hero 1 has lost
                    health1Elt.style.width = "0%";
                    health1Indicator = 0;

                    const boxCard = document.getElementById(hero2Id);
                    boxCard.removeChild(boxCard.firstElementChild);

                    selectedElt.removeChild(selectedElt.firstElementChild);
                    selectedElt.firstChild.classList.remove("col-6", "col-sm-5", "col-md-4");
                    selectedElt.firstChild.classList.add("col");
                    selectedElt.styl

                    const winnerElt = document.createElement("h1");
                    winnerElt.textContent = "Le vainqueur est " + selectedHeroes[1].name;
                    
                    const containerElt = document.querySelector(".container");
                    containerElt.replaceChild(winnerElt, containerElt.firstElementChild);
                }
            } else {
                // Hero 2 has lost
                health2Elt.style.width = "0%";
                health2Indicator = 0;

                const boxCard = document.querySelector(".box-card");
                boxCard.removeChild(boxCard.firstElementChild);

                selectedElt.removeChild(selectedElt.lastElementChild);
                selectedElt.firstElementChild.classList.remove("col-6", "offset-sm-1", "col-sm-5", "offset-md-2", "col-md-4");
                selectedElt.firstElementChild.classList.add("col");

                const winnerElt = document.createElement("h1");
                winnerElt.textContent = "Le vainqueur est " + selectedHeroes[0].name;
                
                const containerElt = document.querySelector(".container");
                containerElt.replaceChild(winnerElt, containerElt.firstElementChild);
            }
        } else {
            // stop the fight
            console.log("Terminé, merci d'avoir joué !");
            clearInterval(fightToTheDeath);
        }
    }, 200);
}