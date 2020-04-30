const cards = document.querySelectorAll('.card')
const divs = document.querySelectorAll('.divs')

for (let card of cards) {
    card.addEventListener("click", function() {
        const id = card.getAttribute('id')
        window.location.href = `/recipes/${id}`
    })
}

for (let div of divs) {
  let divHidden  = div.querySelector('.hidden__div')
  let header__div = div.querySelector('.header__div')

  let button = header__div.querySelector('.hidden__button')
  let title =  header__div.querySelector('h1')

  button.addEventListener("click", function() {
    if (divHidden .classList.contains('hidden') == false) {
        divHidden .classList.add('hidden')
        button.textContent = "Mostrar" 
        title.classList.add('padding')
      } else {
        divHidden .classList.remove('hidden')
        button.textContent = "Esconder"
        title.classList.remove('padding')
      }
  })
}

function addIngredient() {
  const ingredients = document.querySelector("#ingredients");
  const fieldContainer = document.querySelectorAll(".ingredient");

  // Realiza um clone do último ingrediente adicionado
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

  // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  ingredients.appendChild(newField);
}

document.querySelector(".add-ingredient").addEventListener("click", addIngredient);

function addPreparation() {
  const preparation = document.querySelector("#preparation")
  const fieldContainer = document.querySelectorAll(".preparation");

  // Realiza um clone do última preparation adicionada
  const newField = fieldContainer[fieldContainer.length - 1].cloneNode("true");

   // Não adiciona um novo input se o último tem um valor vazio
  if (newField.children[0].value == "") return false;

  // Deixa o valor do input vazio
  newField.children[0].value = "";
  preparation.appendChild(newField);
}

document.querySelector(".add-preparation").addEventListener("click", addPreparation);