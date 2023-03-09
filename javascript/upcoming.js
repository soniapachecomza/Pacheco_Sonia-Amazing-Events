//cards
let fechaActual = new Date(dataCards.currentDate)
let containerCard = document.getElementById("cardUpcoming")
let upcomingCard = dataCards.events.filter(event => comparaFecha(fechaActual, event))
function comparaFecha(fechaActual, fechaEvento) {
  let fechaEvent = new Date(fechaEvento.date)
  return fechaEvent > fechaActual
}



loadCard(upcomingCard,containerCard)


function loadCard(upcomingCard,content) {
  containerCard.innerHTML = ""
  let fragmento = document.createDocumentFragment()
  for (card of upcomingCard) {
    let cardDiv = document.createElement("div")
    cardDiv.classList.add("card", "mb-3")
    cardDiv.style.width = "23rem"
    cardDiv.innerHTML = `
    <div class="card flexcardMediumorchid">
         <div class="flexcardNumber flexcardNumberMediumorchid"><h5 class="card-title text-white">${card.name}</h5></div>
         <div class="flexcardImg">
           <img src=${card.image} class="flexcardimgItem" alt=${card.name.split(" ").join("_")}>
         </div>
        <div class="card-body">
           <p class="card-text mb-1">${card.description}</p>
         </div>
         <div class="price mt-1 mb-1">
           <p class="priceText m-2">$${card.price}</p>
          
           <button type="submit" class="buttonmediumorchid m-2 mb-5">
           <a href="./details.html" class="btn text-white  color-btn align-self-end">More info</a>
           </button>
          </div>
       </div>`
    fragmento.appendChild(cardDiv)

  }
  content.appendChild(fragmento)
}

//category
let containerCheck = document.getElementById("upCheck")
let fragmentCheck = document.createDocumentFragment()
let categorysFilter = upcomingCard.map(event => event.category);
categorysFilter = categorysFilter.filter((valor, indice) => {
  return categorysFilter.indexOf(valor) === indice;
});
 uploadCheck(categorysFilter,containerCheck);


function uploadCheck(categorys, content) {
  let fragmento=document.createDocumentFragment()
  for (check of categorys) {
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
    checkDiv.innerHTML = `<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  content.appendChild(fragmento)
}

// filtro
let checkbox = document.querySelectorAll("input[type=checkbox]")
let checkeds = []
checkbox.forEach(categoria => 
  categoria.addEventListener('change',filtrarCheck))
  
  function filtrarCheck(e) {
    if (this.checked) {
      checkeds.push(e.target.value)

     } else {
      checkeds = checkeds.filter(event => event !== e.target.value)
     

    }
    
    if (checkeds.length > 0) {
      loadCard(upcomingCard.filter(event => validaEvento(event, checkeds)),containerCard)
    } else {
      loadCard(upcomingCard,containerCard)
    }
  }

  


function validaEvento(evento, swapCategory) {
  return swapCategory.find(categoria => categoria == evento.category.split(" ").join("_"));
}


//Search


const search = document.getElementById("search");

search.addEventListener("keyup",buscarTitulo)

function buscarTitulo(e){
  if(e.target.value!="") {
    if (checkeds.length > 0) {
      let cardChecked = upcomingCard.filter(event => validaEvento(event, checkeds));
      let tituloCard = cardChecked.filter(event => event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
      if (tituloCard.length == 0) {
        containerCard.innerHTML=""
        let div=document.createElement("div")
         div.innerHTML='<p class="display-5">El titulo ingresado no existe</p>'
         containerCard.appendChild(div)
      }
      else {
          cargarCards(tituloCard,containerCard)
      }
    } else {
      let tituloCard = pastCard.filter(event=> event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
          
      if (tituloCard.length == 0) {
        containerCard.innerHTML=""
        let div=document.createElement("div")
         div.innerHTML='<p class="bg-black px-2 text-danger display-5">El titulo ingresado no existe</p>'
         containerCard.appendChild(div)
      }
      else {
      cargarCards(tituloCard,containerCard)
      }
    }
  }else{
      if(checkeds.length > 0){
  
        let cardChecked = pastCard.filter(event => validaEvento(event, checkeds));
        cargarCards(cardChecked,containerCard)
      }
      else{cargarCards(pastCard,containerCard)}
    }
}