// selectores de elementos

const championBtn = document.querySelector("#champion");
const ultimateBtn = document.querySelector("#ultimate");
const megaBtn = document.querySelector("#mega");
const armorBtn = document.querySelector("#armor");
const freshBtn = document.querySelector("#fresh");
const babyBtn = document.querySelector("#baby");
const inTrainingBtn = document.querySelector("#in-training");
const rookieBtn = document.querySelector("#rookie");
const showAllBtn = document.querySelector("#show-all");
const renderSpace = document.querySelector("#render");
const searchBtn = document.querySelector("#search-btn");
const errorMsg = document.querySelector("#error");

// URLs

const allURL = "https://digimon-api.vercel.app/api/digimon";
const rookieURL = "https://digimon-api.vercel.app/api/digimon/level/rookie";
const inTrainingURL =
  "https://digimon-api.vercel.app/api/digimon/level/intraining";
const babyURL = "https://digimon-api.vercel.app/api/digimon/level/training";
const freshURL = "https://digimon-api.vercel.app/api/digimon/level/fresh";
const championURL = "https://digimon-api.vercel.app/api/digimon/level/champion";
const ultimateURL = "https://digimon-api.vercel.app/api/digimon/level/ultimate";
const megaURL = "https://digimon-api.vercel.app/api/digimon/level/mega";
const armorURL = "https://digimon-api.vercel.app/api/digimon/level/armor";

// funciones

function renderDigimons(level) {
  fetch(level)
    .then((response) => response.json())
    .then((data) => {
      data.map((digimon) => {
        renderSpace.innerHTML += `
            <div class="col">
                <div class="d-flex flex-column card h-100">
                <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}" >
                <div class="card-body">
                    <h5 class="card-title">${digimon.name}</h5>
                    <p class="card-text">${digimon.level}</p>
                </div>
                </div>
            </div>
            `;
      });
    });
}

function findDigimon() {
  const searchInput = document.querySelector("#search-input");
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
  fetch(`https://digimon-api.vercel.app/api/digimon/name/${searchInput.value}`)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      data.map((digimon) => {
        renderSpace.innerHTML += `
                    <div class="col">
                        <div class="d-flex flex-column card h-100">
                            <img src="${digimon.img}" class="card-img-top" alt="${digimon.name}" >
                            <div class="card-body">
                                <h5 class="card-title">${digimon.name}</h5>
                                <p class="card-text">${digimon.level}</p>
                            </div>
                        </div>
                    </div>
                `;
      });
    })
    .catch((error) => {
      clearAll();
      errorMsg.style.visibility = "visible";
      errorMsg.textContent = "Lo sentimos, no pudimos encontrar ningun digimon con ese nombre.";
    });
}

// funcion para limpiar el render

function clearAll() {
  errorMsg.textContent = "";
  renderSpace.innerHTML = "";
}

// event listeners

showAllBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(allURL);
});

rookieBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(rookieURL);
});

babyBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(babyURL);
});

inTrainingBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(inTrainingURL);
});

freshBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(freshURL);
});

championBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(championURL);
});

ultimateBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(ultimateURL);
});

megaBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(megaURL);
});

armorBtn.addEventListener("click", function () {
  clearAll();
  renderDigimons(armorURL);
});

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  clearAll();
  findDigimon();
});
