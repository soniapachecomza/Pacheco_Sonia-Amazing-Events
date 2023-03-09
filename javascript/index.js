//card
const containerCard = document.getElementById("cardHome");
console.log(dataCards.events[0]._id);

subirCards(dataCards.events, containerCard);

function subirCards(events, contenedor) {
  containerCard.innerHTML = "";
  let fragmento = document.createDocumentFragment();

  for (card of events) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mb-3");
    cardDiv.style.width = "23rem";
    cardDiv.innerHTML = `
    <div class="card flexcardGreen">
    <div class="flexcardNumber flexcardNumberGreen"><h5 class="flexcardTitle text-center">${card.name}</h5></div>
    <img src=${card.image} class="flexcardimgItem" alt=${card.name.split(" ").join("_")} ></div>
     <div class="card-body">
       <p class="card-text mb-1">${card.description}</p>
       </div>
       <div class="price mt-1 mb-1">
         <p class="priceText m-2 ">$${card.price}</p>
    
         <button type="submit" class="buttongreen m-2 mb-5">
         <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">Details</a>
         </button>
        </div>
  </div>`;
    fragmento.appendChild(cardDiv);
  }
  contenedor.appendChild(fragmento);
}

//Category
const containerCheck = document.getElementById("containerCheck");

let categorys = dataCards.events.map((event) => event.category);
let categorysCut = categorys.filter((valor, indice) => {
  return categorys.indexOf(valor) === indice;
});
upCheck(categorysCut, containerCheck);

function upCheck(categorias, contenedor) {
  let fragmento = document.createDocumentFragment();
  for (check of categorias) {
    let checkDiv = document.createElement("div");
    checkDiv.classList.add("form-check", "form-check-inline");
    checkDiv.innerHTML = `<input class="form-check-input" type="checkbox" name="category" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`;
    fragmento.appendChild(checkDiv);
  }
  contenedor.appendChild(fragmento);
}

//filter
let checkbox = document.querySelectorAll("input[type=checkbox]");

let checkeds = [];
checkbox.forEach((categoria) => {
  categoria.addEventListener("change", filtraCheck);
});

function filtraCheck(e) {
  if (this.checked) {
    checkeds.push(e.target.value);
    console.log(checkeds);
  } else {
    checkeds = checkeds.filter((event) => event !== e.target.value);
    
  }

  if (checkeds.length > 0) {
    subirCards(
      dataCards.events.filter((event) => validaEvento(event, checkeds)),
      containerCard
    );
  } else {
    subirCards(dataCards.events, containerCard);
  }
}

function validaEvento(evento, fixCategory) {
  return fixCategory.find(
    (categoria) => categoria == evento.category.split(" ").join("_")
  );
}

//Search

const search = document.getElementById("search");

search.addEventListener("keyup", buscarTitulo);

function buscarTitulo(e) {
  if (e.target.value != "") {
    if (checkeds.length > 0) {
      let cardChecked = dataCards.events.filter((event) =>
        validaEvento(event, checkeds)
      );
      let titleCard = cardChecked.filter(
        (event) =>
          event.name
            .toLowerCase()
            .search(e.target.value.toLowerCase().trim()) != -1
      );
      if (titleCard.length == 0) {
        containerCard.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML =
        `<p class="display-5">Wrong search...</p>`;
        containerCard.appendChild(div);
      } else {
        subirCards(titleCard, containerCard);
      }
    } else {
      let titleCard = dataCards.events.filter(
        (event) =>
          event.name
            .toLowerCase()
            .search(e.target.value.toLowerCase().trim()) != -1
      );

      if (titleCard.length == 0) {
        containerCard.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML =
        `<p class="display-5">Wrong search...</p>`;
        containerCard.appendChild(div);
      } else {
        subirCards(titleCard, containerCard);
      }
    }
  } else {
    if (checkeds.length > 0) {
      let cardChecked = dataCards.events.filter((event) =>
        validaEvento(event, checkeds)
      );
      subirCards(cardChecked, containerCard);
    } else {
      subirCards(dataCards.events, containerCard);
    }
  }
}
