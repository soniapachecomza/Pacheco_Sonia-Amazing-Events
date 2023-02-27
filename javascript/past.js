let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("flexbox")
let fragment=document.createDocumentFragment()
fragment=cargarCardsPast(fragment, fechaActual)
conteinerCard.appendChild(fragment)


function cargarCardsPast(fragmento , fechaRef){
  for(card of dataCards.events){
      let fechaEvento= new Date(card.date)
  if(fechaRef>fechaEvento){
    let cardDiv=document.createElement("flexbox")
    cardDiv.classList.add("flexcard flexcardPink")
    cardDiv.innerHTML=`<img src=${card.image} class="flex flexcardImg" alt=${card.name.split(" ").join("_")}>
    <div class="flexcardNumber flexcardNumberPink">
      <h5 class="flex flexcardTitle">${card.name}</h5>
     <p class="priceText">${card.description}</p>
     <p class="priceText">${card.price}</p>
      <a href="./details.html" class="buttongreen">More info</a>
    </div>`
    fragmento.appendChild(cardDiv)
  }
  }
  return fragmento
  }