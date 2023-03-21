let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(urlApi)

    .then(response => response.json())
    .then(data => { 
        console.log(data)

const tabla =document.getElementById('tablas') 
const tabla2 =document.getElementById('tablas2')
const tabla3 =document.getElementById('tablas3')
        
const events = data.events
console.log(events)
completarTabla1(events,tabla)
introducirTabla2(data.events.filter(elemento => elemento.estimate),tabla2)
introducirTabla2(data.events.filter(elemento => elemento.assistance),tabla3)

})
.catch(error => console.log(error)) 

function completarTabla1(array,contenedor) {

let mayorCapacidad = array.reduce((evento1,evento2) =>
{if( evento1.capacity > evento2.capacity)return evento1
return evento2
})
console.log(mayorCapacidad)

let mayorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1,evento2) => {if((evento1.assistance / evento1.capacity) > (evento2.assistance / evento2.capacity))
return evento1
return evento2
})
console.log(mayorAttendance)

let menorAttendance = array.filter(elemento => elemento.assistance).reduce((evento1,evento2) => {if((evento1.assistance / evento1.capacity) < (evento2.assistance / evento2.capacity))
return evento1
return evento2
})
console.log(menorAttendance)

let contenedorTr = document.createElement('tr')
contenedorTr.innerHTML = 
`<td colspan="3">${mayorAttendance.name}: ${mayorAttendance.assistance / mayorAttendance.capacity*100}%</td>
 <td colspan="3">${menorAttendance.name}: ${menorAttendance.assistance / menorAttendance.capacity*100}%</td>
 <td colspan="3">${mayorCapacidad.name}: ${mayorCapacidad.capacity}</td>`
 contenedor.appendChild(contenedorTr)
}

function calcularGanancias (array,nombrecategoria){

    let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total,evento) =>{
        if(evento.assistance != undefined) return total += evento.price * evento.assistance
        return total += evento.price * evento.estimate
    },0)
    return arrayFiltrado
}

function introducirTabla2 (array,contenedor){
//  arreglo de categorias unicas
    let categorias = [... new Set(array.map(elemento => elemento.category))]

    let fragmento = document.createDocumentFragment()

    for(categoria of categorias){
        let trContenedor = document.createElement('tr')
        trContenedor.innerHTML = `<td colspan="3">${categoria}</td>
        <td colspan="3">$ ${calcularGanancias(array,categoria)}</td>
        <td colspan="3">${calcularAsistencia(array,categoria)}%</td>`
        fragmento.appendChild(trContenedor)
    }
    contenedor.appendChild(fragmento)
}

function calcularAsistencia (array,nombrecategoria){

    let arrayFiltrado = array.filter(elemento => elemento.category == nombrecategoria).reduce((total,evento) =>{
        if(evento.assistance != undefined) return total += evento.assistance / evento.capacity 
        return total += evento.estimate / evento.capacity
    },0)
    return (arrayFiltrado * 100 /array.filter(elemento => elemento.category == nombrecategoria).length).toFixed(2)
}

