const divs = document.querySelectorAll('.divs')

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