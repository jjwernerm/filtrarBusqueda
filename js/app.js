// Variables
// Asignando elementos a las variables.
const catsCard = document.querySelector('#cats-card');
const ageSelectMin = document.querySelector('#age-select-min');
const ageSelectMax = document.querySelector('#age-select-max');
const colorSelect = document.querySelector('#color-select');
const raceContainer = document.querySelector('#race-container');

const datosBusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',


};


document.addEventListener('DOMContentLoaded', () => {

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

  uploadAge();
  uploadColor();
  uploadRace();

});

function uploadAge() {

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

function uploadColor() {

  const onlyColor = [...new Set(cats.map(cat => cat.color))];

  onlyColor.forEach(catColor => {
    const option = document.createElement('option');
    option.value = catColor;
    option.textContent = catColor;
    colorSelect.appendChild(option);
  });

};

function uploadRace() {

  const onlyRace = [...new Set(cats.map(cat => cat.race))];

  // Crear elementos input y label para cada raza única y agregarlos al contenedor
  onlyRace.forEach(catRace => {
    
    // Crear input de tipo checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = catRace;
    checkbox.id = catRace.toLowerCase(); // Establecer el id del input

    // Crear label asociado al input
    const label = document.createElement('label');
    label.textContent = catRace;
    label.htmlFor = catRace.toLowerCase(); // Asociar el label con el input

    // Agregar checkbox y label al contenedor
    raceContainer.appendChild(checkbox);
    raceContainer.appendChild(label);

    // Agregar un salto de línea para separar las opciones (opcional)
    raceContainer.appendChild(document.createElement('br'));

  });

};

colorSelect.addEventListener('change', (e) => {

  datosBusqueda.color = e.target.value;

  console.log(datosBusqueda)


});