let containerCard=document.getElementById("flexbox")
let fragment=document.createDocumentFragment()
fragment=cargarCards(fragment)
containerCard.appendChild(fragment)


function cargarCards(fragmento){
for(card of dataCards.events){
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
return fragmento
}