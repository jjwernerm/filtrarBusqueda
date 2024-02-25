// Variables
// Asignando elementos a las variables.
const catsCard = document.querySelector('#cats-card');

document.addEventListener('DOMContentLoaded', () => {

  // Utilizo el método <.map> para iterar sobre el arreglo de objetos 'cats' y poder generar varias plantillas HTML para cada gato.
  const uploadCats = cats.map(pizza => {

    // Destructuro los atributos del arreglo de objetos 'cats' (destructuring) para asignar variables individuales.
    const { img, name, age, gender, race } = pizza;

    // Retorno una plantilla HTML con los datos del gato.
    return `
      <div class="col-12 col-sm-6 d-flex justify-content-center">
        <div class="card mb-3 btn text-start shadow p-3 mb-5 bg-body-tertiary rounded hover-card" style="max-width: 540px;">
          <div class="row g-0">        
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

});