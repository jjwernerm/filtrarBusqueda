// VARIABLES
// Asignando elementos a las variables.
const catsCard = document.querySelector('#cats-card');
const radioFemale = document.querySelector('#radio-female');
const radioMale = document.querySelector('#radio-male');
const ageSelectMin = document.querySelector('#age-select-min');
const ageSelectMax = document.querySelector('#age-select-max');
const allAge = document.querySelector('#all-age');
const msgAge = document.querySelector('#msg-age');
const colorSelect = document.querySelector('#color-select');
const allRace = document.querySelector('#all-race');
const raceCheck = document.querySelector('#race-check');

// Objeto que almacena los filtros seleccionados por el usuario.
const filterObj = {
  gender: '',
  ageMin: 0,
  ageMax: 0,
  color: '',
  race: '',
  numberRace: '', // Almacena el número total de razas.
};

// Cargar contenido del HTML.
document.addEventListener('DOMContentLoaded', () => {

  showCats(cats);
  uploadAge(cats);
  uploadColor(cats);
  uploadRace(cats);

});

// Función que muestra los gatos en la interfaz.
function showCats(cats) {

  // Limpia el contenido HTML previo de los gatos.
  cleanHTML();

  // Utilizo el método <.map> para iterar sobre el arreglo de objetos 'cats' y poder generar varias plantillas HTML para cada gato.
  const uploadCats = cats.map(cat => {

    // Extraigo los atributos del arreglo de objetos 'cats' (destructuring)
    const { img, name, age, gender, race } = cat;

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

// Función que elimina el contenido HTML de los gatos.
function cleanHTML() {
  
  // Eliminar todos los elementos hijos del contenedor de gatos.
  while(catsCard.firstChild) {
    catsCard.removeChild(catsCard.firstChild);
  };

};

// Función para cargar las edades desde 'db.js' en el formulario -> offcanvas.
function uploadAge(cats) {

  // Obtiengo un conjunto de edades únicas de los gatos.
  const onlyAge = [...new Set(cats.map(cat => cat.age))];

  // Creo opciones para cada edad y las agrego a los selectores de edad.
  onlyAge.forEach(catAge => {
    const option = document.createElement('option');
    option.value = catAge;
    option.textContent = catAge;
    ageSelectMin.appendChild(option);
    ageSelectMax.appendChild(option.cloneNode(true)); // Clona la opción para el selector de edad máxima.
  });

};

// Función para cargar los colores desde 'db.js' en el formulario -> offcanvas.
function uploadColor(cats) {

  // Obtiengo un conjunto de colores únicos de los gatos.
  const onlyColor = [...new Set(cats.map(cat => cat.color))];

  // Creo opciones para cada color y las agrego a los selectores de color.
  onlyColor.forEach(catColor => {
    const option = document.createElement('option');
    option.value = catColor;
    option.textContent = catColor;
    colorSelect.appendChild(option);
  });

};

// Función para cargar las razas desde 'db.js' en el formulario -> offcanvas.
function uploadRace(cats) {

  // Obtiengo un conjunto de razas únicas de los gatos.
  const onlyRace = [...new Set(cats.map(cat => cat.race))];

  // Creo opciones checkbox para cada raza y las agrego al filtro de raza.
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
    raceCheck.appendChild(checkbox);
    raceCheck.appendChild(label);

    // Agregar un salto de línea para separar las opciones.
    raceCheck.appendChild(document.createElement('br'));

  });

  // Almaceno el número total de razas para su posterior uso.
  filterObj.numberRace = onlyRace.length;

};

//EVENTOS: que ayudarán a obtener el valor que seleccione el usuario.

radioFemale.addEventListener('change', (e) => {

  filterObj.gender = e.target.value;

  filterCats();

});

radioMale.addEventListener('change', (e) => {

  filterObj.gender = e.target.value;

  filterCats();

});

ageSelectMin.addEventListener('change', (e) => {

  filterObj.ageMin = parseInt(e.target.value);

  checkAgeValues();

});

ageSelectMax.addEventListener('change', (e) => {

  filterObj.ageMax = parseInt(e.target.value);

  checkAgeValues();

});

allAge.addEventListener('change', () => {

  // Marca el checkbox "Todas las razas".
  allAge.checked = true;
  dangerStyle();
  msgAge.innerHTML = 'Para desactivar todas las edades, tienes que seleccionar un rango de edad';
  
});

colorSelect.addEventListener('change', (e) => {

  filterObj.color = e.target.value;

  filterCats();

});

allRace.addEventListener('change', () => {

  // Marca el checkbox "Todas las razas".
  allRace.checked = true;
  
  // Desmarca todos los checkboxes de raza.
  for (const checkbox of document.querySelectorAll('#race-check input[type="checkbox"]')) {
    checkbox.checked = false; // Desmarcar todos los checkboxes dentro de raceCheck.
  };
  
  // Aplicr los filtros seleccionados.
  filterCats();

});

raceCheck.addEventListener('change', () => {

  // Desmarca el checkbox "Todas las razas".  
  allRace.checked = false;

  // Obtiengo los checkboxes de raza seleccionados.  
  const checkBox = document.querySelectorAll('#race-check input[type="checkbox"]:checked');
  
  // Actualizo el estado de los filtros.  
  checkStatus(checkBox)
  
  // Aplico los filtros seleccionados.
  filterCats();

});

// Funcion que filtra en base a la búsqueda.
function filterCats() {
  
  // Función de alto nivel; es decir, funciones que toman otras funciones.
  const result = cats.filter( filterGender ).filter( filterAgeMin ).filter( filterAgeMax ).filter( filterColor ).filter( filterRace );

  if(result.length) {
    showCats(result);
  } else {
    notShowCats('No hay coincidencias en su búsqueda.');
  };

};

// Funcion que filtra el género del gato.
function filterGender(cat) {

  // Destructuring
  const { gender } = filterObj
  
  if(gender) {
    return cat.gender === gender
  }
  return cat;

};

// Funcion que filtra la edad mínima del gato.
function filterAgeMin(cat) {

  // Destructuring
  const { ageMin } = filterObj;
  
  if(ageMin) {
    // return cat.age >= parseInt(ageMin);
    return cat.age >= ageMin;
  }
  return cat;

};

// Funcion que filtra la edad máxima del gato.
function filterAgeMax(cat) {
  
  // Destructuring
  const { ageMax } = filterObj;
  
  if(ageMax) {
    // return cat.age <= parseInt(ageMax);
    return cat.age <= ageMax;
  }
  return cat;

};


// Función que permite comprobar los valores de edades para mostrar un mensaje en caso de error.
function checkAgeValues() {

  msgAge.classList.remove('text-danger');

  if (filterObj.ageMin > 0) {

    if (filterObj.ageMax === 0 || isNaN(filterObj.ageMax)) {
      msgAge.innerHTML = 'Elige la edad máxima';
      assignAttribute()      
      warningStyle();
      cleanHTML();
      return;
    };    

  };

  if (filterObj.ageMax > 0) {

    if (filterObj.ageMin === 0 || isNaN(filterObj.ageMin)) {      
      msgAge.innerHTML = 'Elige la edad mínima';
      assignAttribute()
      warningStyle();
      cleanHTML();
      return;
    };

    if (filterObj.ageMin > filterObj.ageMax ) {
      dangerStyle();
      msgAge.innerHTML = 'Error en las edades';
      // allAge.checked = true;
      allAge.setAttribute('disabled', true);
      cleanHTML();
      return; 
    };

  };

  if (isNaN(filterObj.ageMin) || filterObj.ageMin === 0 || isNaN(filterObj.ageMax) || filterObj.ageMax === 0) {
    allAge.removeAttribute('disabled');
    allAge.checked = true;
    msgAge.innerHTML = '';
    showCats(cats)
    return;

  };

  if (filterObj.ageMin > 0 && filterObj.ageMax > 0) {

    allAge.setAttribute('disabled', true);
    allAge.checked = false;
    msgAge.innerHTML = '';
    filterCats();

  };

};

// Función para dar estilo al momento de comprobar los valores de edad.
function warningStyle() {

  msgAge.style.backgroundColor = '#fffbeb';
  msgAge.style.borderRadius = '.5em';  
  msgAge.classList.add('text-warning'); 

};

// Función para dar estilo al momento de comprobar los valores de edad.
function dangerStyle() {

  msgAge.style.backgroundColor = '#fef2f2';
  msgAge.style.borderRadius = '.5em';  
  msgAge.classList.add('text-danger');

};

// Función para asignar atributos al momento de comprobar los valores de edad.
function assignAttribute() {

  allAge.setAttribute('disabled', true);
  allAge.checked = false;

};

// Funcion que filtra el color del gato.
function filterColor(cat) {

  // Destructuring
  const { color } = filterObj;
  
  if(color) {
    return cat.color === color;
  }
  return cat;
  
};

// Funcion que filtra el color del gato.
function filterRace(cat) {

  const checkBox = document.querySelectorAll('#race-check input[type="checkbox"]:checked');

  // Si no hay checkboxes seleccionados, no aplicar filtro por raza
  if (checkBox.length === 0) {
    allRace.checked = true; // Marcar el checkbox dentro de allRace.
    return cat; // retorna 'cat' sin filtrar.
  };

  // Verificar si la raza del gato coincide con al menos una de las razas seleccionadas.
  for (const checkbox of checkBox) {
    if (cat.race === checkbox.value) {      
      return cat; // retorna la raza del gato.
    }; 
  };
  return null;
};

// Función que actualiza los checkboes de raza, se se marcan todos las opciones se marca 'allRace' y se desmarcan todos los demás checkbox.
function checkStatus(checkBox) {

    if (checkBox.length === filterObj.numberRace) {
      for (const checkbox of document.querySelectorAll('#race-check input[type="checkbox"]')) {
        allRace.checked = true; // Marcar el checkbox dentro de allRace.
        checkbox.checked = false; // Desmarcar todos los checkboxes dentro de raceCheck.
      };
    };
};

function notShowCats(msg) {
  
  // Obtiene una referencia al modal utilizando su ID
  const miModal = new bootstrap.Modal(document.getElementById('exampleModal'));

  // Actualiza el cuerpo del modal con el mensaje de advertencia o información relacionado con la pizza existente
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = msg;

  // Muestra el modal
  miModal.show();

  cleanHTML()
  
};