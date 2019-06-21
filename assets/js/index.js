// url API
const listHeroes = "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api//all.json";

ajaxGet(listHeroes, function(response) {
    const heroesElt = document.getElementById("heroes");
    let heroes = JSON.parse(response);
    
    heroes = getRandHeroes(heroes, 12);

    heroes.forEach(hero => {
        const name = hero.name;
        const powerStats = hero.powerstats;
        const imageSM = hero.images.sm;

        
        const contentElt = document.createElement("div");
        contentElt.classList.add("col-md-2");

        const testElt = document.createElement("div");
        testElt.classList.add("box-card");

        const imgElt = document.createElement("img");
        imgElt.src = imageSM;
        imgElt.alt = "Image de " + name;
        testElt.appendChild(imgElt);

        const nameElt = document.createElement("p");
        nameElt.textContent = name;
        nameElt.classList.add("hero-name");
        testElt.appendChild(nameElt);

        const listElt = document.createElement("ul");
        for (statId in powerStats) {
            const statElt = document.createElement("li");
            statElt.textContent = statId + " : " + powerStats[statId];
            listElt.appendChild(statElt);
        };
        testElt.appendChild(listElt);

        contentElt.appendChild(testElt);
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