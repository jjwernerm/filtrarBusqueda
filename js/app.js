// VARIABLES
// Asignando elementos a las variables.
const catsCard = document.querySelector('#cats-card');
const radioFemale = document.querySelector('#radio-female');
const radioMale = document.querySelector('#radio-male');
const ageSelectMin = document.querySelector('#age-select-min');
const ageSelectMax = document.querySelector('#age-select-max');
const colorSelect = document.querySelector('#color-select');
const raceContainer = document.querySelector('#race-container');

const filterObj = {
  gender: '',
  ageMin: '',
  ageMax: '',
  color: '',
  race: '',
};

// Cargar el HTML.
document.addEventListener('DOMContentLoaded', () => {

  showCats(cats);
  uploadAge(cats);
  uploadColor(cats);
  uploadRace(cats);

});

// Función para mostrar los gatos desde 'db.js' en la tarjeta de catálogo.
function showCats(cats) {

  limpiarHTML(); // Eliminar el HTML previo

  // Utilizo el método <.map> para iterar sobre el arreglo de objetos 'cats' y poder generar varias plantillas HTML para cada gato.
  const uploadCats = cats.map(pizza => {

    // Destructuro los atributos del arreglo de objetos 'cats' (destructuring) para asignar variables individuales.
    const { img, name, age, gender, race } = pizza;

    // Retorno una plantilla HTML con los datos del gato.
    return `
      <div class="col-12 col-sm-6 d-flex justify-content-center">
        <div class="card mb-3 btn text-start shadow mb-5 bg-body-tertiary rounded hover-card" style="max-width: 540px;">
          <div class="row g-0 rounded bg-card-hover">        
            <div class="col-md-4">
              <img src="${img}" class="img-fluid rounded" alt="...">
            </div>        
            <div class="col-md-8">
              <div class="card-body">            
                <h5 class="card-title text-center">
                  <span id="name">${name}</span>
                </h5>            
                <p class="card-text">
                  <span class="fw-bold">Edad: </span>
                  <span id="age">${age}</span>
                </p>
                <p class="card-text">
                  <span class="fw-bold">Género: </span>
                  <span id="gender">${gender}</span>
                </p>
                <p class="card-text">
                  <span class="fw-bold">Raza: </span>
                  <span id="race">${race}</span>
                </p>
              </div>
            </div>        
          </div>
        </div>
      </div>
    `
  });

  // Utilizo el método <join('')> para concatenar 'uploadCats' en una sola cadena de texto.
  // Inserto las plantillas en el elemento HTML con el id 'cats-card' mediante innerHTML.
  catsCard.innerHTML = uploadCats.join('');

};

function limpiarHTML() {
  
  while(catsCard.firstChild) {
    catsCard.removeChild(catsCard.firstChild);
  };

};

// Función para cargar las edades desde 'db.js' en el formulario -> offcanvas.
function uploadAge(cats) {

  const onlyAge = [...new Set(cats.map(cat => cat.age))];

  onlyAge.forEach(catAge => {
    const option = document.createElement('option');
    option.value = catAge;
    option.textContent = catAge;
    ageSelectMin.appendChild(option);
  });

  onlyAge.forEach(catAge => {
    const option = document.createElement('option');
    option.value = catAge;
    option.textContent = catAge;
    ageSelectMax.appendChild(option);
  });  

};

// Función para cargar los colores desde 'db.js' en el formulario -> offcanvas.
function uploadColor(cats) {

  const onlyColor = [...new Set(cats.map(cat => cat.color))];

  onlyColor.forEach(catColor => {
    const option = document.createElement('option');
    option.value = catColor;
    option.textContent = catColor;
    colorSelect.appendChild(option);
  });

};

// Función para cargar las razas desde 'db.js' en el formulario -> offcanvas.
function uploadRace(cats) {

  const onlyRace = [...new Set(cats.map(cat => cat.race))];

  // Crear elementos input y label para cada raza única y agregarlos al contenedor.
  onlyRace.forEach(catRace => {
    
    // Crear input de tipo checkbox.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = catRace;
    checkbox.id = catRace.toLowerCase(); // Establecer el id del input.

    // Crear label asociado al input.
    const label = document.createElement('label');
    label.textContent = catRace;
    label.htmlFor = catRace.toLowerCase(); // Asociar el label con el input.

    // Agregar checkbox y label al contenedor.
    raceContainer.appendChild(checkbox);
    raceContainer.appendChild(label);

    // Agregar un salto de línea para separar las opciones.
    raceContainer.appendChild(document.createElement('br'));

  });

};

//EVENTOS
// Estos eventos ayudarán a obtener el valor que seleccione el usuario.
radioFemale.addEventListener('change', (e) => {

  filterObj.gender = e.target.value;

  filterCats();

});

radioMale.addEventListener('change', (e) => {

  filterObj.gender = e.target.value;

  filterCats();

});

ageSelectMin.addEventListener('change', (e) => {

  filterObj.ageMin = e.target.value;

  filterCats();

});

ageSelectMax.addEventListener('change', (e) => {

  filterObj.ageMax = e.target.value;

  filterCats();

});

colorSelect.addEventListener('change', (e) => {

  filterObj.color = e.target.value;

  filterCats();

});

raceContainer.addEventListener('change', (e) => { // ************ NO FUNCIONA PORQUE LOS CHECKBOX NO SON INPUT DE
// Función que se encarga de filtrar los gatos según la información introducida en los campos de formulario

  filterObj.race = e.target.value;

  filterCats();

});

// Funcion que filtra en base a la búsqueda.
function filterCats() {
  
  // Función de alto nivel; es decir, funciones que toman otras funciones.
  const result = cats.filter( filterGender ).filter( filterAgeMin ).filter( filterAgeMax ).filter( filterColor );

  if(result.length) {
    showCats(result);
  } else {
    console.log( 'No hay coincidencias' );
    // notShowCats();
  };

};

// Funcion que filtra el género del gato.
function filterGender(cat) {

  const { gender } = filterObj
  
  if(gender) {
    return cat.gender === gender
  }
  return cat;

};

// Funcion que filtra la edad mínima del gato.
function filterAgeMin(cat) {

  const { ageMin } = filterObj;
  
  if(ageMin) {
    // return cat.age >= parseInt(ageMin);
    return cat.age >= ageMin;
  }
  return cat;

};

// Funcion que filtra la edad máxima del gato.
function filterAgeMax(cat) {
  
  const { ageMax } = filterObj;
  
  if(ageMax) {
    // return cat.age <= parseInt(ageMax);
    return cat.age <= ageMax;
  }
  return cat;

};

// Funcion que filtra el color del gato.
function filterColor(cat) {
  
  const { color } = filterObj;
  
  if(color) {
    return cat.color === color;
  }
  return cat;
  
};