

let contenedor = document.getElementById('cartas');
let fragment = document.createDocumentFragment()

for(let element of data.events){
    let div=document.createElement('div')
    div.classList.add("card")
    div.style.width="25rem"
    div.innerHTML= `<img src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <ul>
        <li><p> ${element.name}</p></li> 
        <li><p> ${element.description}</p></li>
      </ul>
    </div>`
 fragment.appendChild(div)

}

contenedor.appendChild(fragment)


