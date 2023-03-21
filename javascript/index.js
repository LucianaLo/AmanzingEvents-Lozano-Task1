let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
console.log(urlApi)

async function traerDatos() {
  try {
    const response = await fetch(urlApi)
    console.log(response)
    const datos = await response.json()
    console.log(datos.events);
    drawCards(datos.events, contenedor);

    //filtrar las cards
    let categorias = datos.events.map(object => object.category)
    console.log(categorias)
    let categoriasFiltradas = [...new Set(categorias)]
    console.log(categoriasFiltradas)
    let contenedorCheck = document.getElementById('contenedorCheck');
    drawChecks(categoriasFiltradas, contenedorCheck);

    //filtrar categorias 
    let inputschequeados = []

    let checkBoxs = document.querySelectorAll('input[type=checkbox]')
    console.log(checkBoxs);

    checkBoxs.forEach(checkbox => { checkbox.addEventListener('change', verificarSelection) })

    function verificarSelection() {
      inputschequeados = Array.from(checkBoxs).filter(checkbox => checkbox.checked).map(input => input.value)
      console.log(inputschequeados);

      filtrosCruzados(datos.events, inputschequeados, stringSearch, contenedor)
    }

    let stringSearch = ""
    const search_input = document.getElementById("contCheck")
    console.log(search_input)

    search_input.addEventListener('keyup', () => {
      stringSearch = search_input.value
      filtrosCruzados(datos.events, inputschequeados, stringSearch, contenedor)
    })
  }
  catch (error) {
    console.log(error)
  }
}
traerDatos()

let contenedor = document.getElementById('cartas');

function drawCards(arrayCards, container) {
  container.innerHTML = ""
  if (arrayCards.length > 0) {
    let fragment = document.createDocumentFragment()
    for (let element of arrayCards) {
      let div = document.createElement('div')
      div.classList.add("card")
      div.style.width = "25rem"
      div.innerHTML = `<img src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <ul>
        <li><p> ${element.name}</p></li> 
        <li><p> ${element.description}</p></li>
      </ul>
        <p> <b>Price:</b> ${element.price}</p>
      <a href="../details.html?id=${element._id}" class="btn btn-primary">View More</a>

    </div>`
      fragment.appendChild(div)
    }

    container.appendChild(fragment)
  } else {
    let div = document.createElement('div')
    div.innerHTML = "<p>No se encontraron resultados</p>"
    container.appendChild(div)
  }
}

//--------------------------------------Filtar las Cards

function drawChecks(listCards, container) {
  let fragment = document.createDocumentFragment()
  container.innerHTML = ""
  for (let element of listCards) {
    let div = document.createElement('div')
    div.innerHTML = `<label for=${element}>${element}</label>
     <input type="checkbox" name="category2" id="categorys" value=${element.split(" ").join("_")}>
 `
    fragment.appendChild(div)
  }
  container.appendChild(fragment)
}

//----------------------------------------------Filtar los Checkboxs

function filtrarArrays(arrayStrings, listCards) {
  if (arrayStrings.length == 0) return listCards
  return listCards.filter(event => arrayStrings.includes(event.category.split(" ").join("_")))
}

//search

function filterString(string, listCards) {
  if (string == "") return listCards
  return listCards.filter(elemento => elemento.name.toLowerCase().includes(string.toLowerCase().trim()))
}

//Que anden cruzados en todas, se tienen que renderizar las cards filtradas

function filtrosCruzados(listCards, inputschequeados, stringSearch, contenedor) {
  let arrayFilterCheck = filtrarArrays(inputschequeados, listCards)
  let arrayFilterString = filterString(stringSearch, arrayFilterCheck)

  drawCards(arrayFilterString, contenedor)
}











