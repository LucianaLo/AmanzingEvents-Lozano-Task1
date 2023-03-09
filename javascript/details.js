
const id = new URLSearchParams(location.search).get("id")

let contenedor1 = document.getElementById('cardd-body');
let fragment = document.createDocumentFragment()

for(let element of data.events){
    let div=document.createElement('div')
    div.classList.add("card")
    div.style.width="25rem"
    div.innerHTML= `<img src=${element.image} class="
    <div class="cardd-body"
    <h6 class="card-title">${element.place}</h6>
        <p> <b>Capacity</b> ${element.capacity}</p>
        <p> <b>Assistance:</b> ${element.assistance}</p>
      `
 fragment.appendChild(div)

}

contenedor1.appendChild(fragment)