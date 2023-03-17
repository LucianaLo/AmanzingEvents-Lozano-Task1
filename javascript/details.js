let urlApi="https://mindhub-xj03.onrender.com/api/amazing"
console.log(urlApi)
 async function traerDatos() {
  try{
    const response = await fetch(urlApi)
    console.log(response)
    const datos = await response.json()
    console.log(datos.events);
    const id = new URLSearchParams(location.search).get("id")
    const info = datos.events.find(elemento => elemento._id == id)
    console.log(info)
    renderizarCardDetail(info)
  }

  catch(error) {
    console.log(error)
  }
}

traerDatos()

 function renderizarCardDetail(element) {
     let contenedor1 = document.getElementById('cardd-body');
     let div=document.createElement('div')
     div.classList.add("card")
     div.style.width="25rem"
     div.innerHTML= `<img src=${element.image} class="card-img-top" alt="...">
     <div class="cardd-body">
    
        <ul>
        <li><b>Date</b>: ${element.date}</li>
        <li><b>Description</b>: ${element.description}</li>
        <li><b>Category</b>: ${element.category}</li>
        <li><b>Place</b>: ${element.place}</li>
        <li><b>Capacity</b>: ${element.capacity}</li>
        <li><b>Assistance</b>: ${element.assistance}</li>
        <li><b>Price</b>: ${element.price}</li>
        </ul>
      </div>`
 contenedor1.appendChild(div)
 } 

