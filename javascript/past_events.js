let pepe = document.getElementById('pepe');
let fragment = document.createDocumentFragment()

const fechaActual = Date.parse(data.currentDate);


for(let element of data.events){
    let fechaVieja = Date.parse(element.Date)
    
    if(fechaVieja>fechaActual) {
    let div=document.createElement('div')
    div.classList.add("card")
    div.style.width="18rem"
    div.innerHTML= `<img src="${element.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <ul>
        <li><p> ${element.name}</p></li> 
        <li><p> ${element.description}</p></li>
      </ul>
    </div>`
 fragment.appendChild(div)
    }

}

pepe.appendChild(fragment)