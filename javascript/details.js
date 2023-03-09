let contenedor1 = document.getElementById('cardd-body');
let fragment = document.createDocumentFragment()

for(let element of data.events){
    let div=document.createElement('div')
    div.classList.add("card")
    div.style.width="25rem"
    div.innerHTML= `<img src=${element.image} class="
    <div class="cardd-body"
    <h5 class="card-title">${element.place}</h5>
        <p> ${element.category}</p>
        <p> ${element.price}</p>
      `
 fragment.appendChild(div)

}

contenedor1.appendChild(fragment)