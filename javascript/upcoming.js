let containerCard = document.getElementById("cardUpcoming");
//api
const url = "https://mindhub-xj03.onrender.com/api/amazing";

async function getInfo(urlApi, container) {
  try {
    const response = await fetch(urlApi);
    let data = await response.json();
    console.log(data);
    
    let upcomingCard = data.events.filter(
      (event) => new Date(data.currentDate) < new Date(event.date)
    );
    console.log(upcomingCard.length);
    cargarCards(upcomingCard, container);

    let upChecking= document.getElementById("upCheck");
    let categorysFilter = [
      ...new Set(upcomingCard.map((event) => event.category)),
    ];
    console.log(categorysFilter);
    cargarCheck(categorysFilter, upChecking);

    
    let searched = "";
    let cardChecked = [];

    const search = document.getElementById("search");

    search.addEventListener("keyup", (e) => {
      searched = e.target.value;
      crossFilter(upcomingCard, cardChecked, searched);
    });
    let checkbox = document.querySelectorAll("input[type=checkbox]");
    checkbox.forEach((categoria) => {
      categoria.addEventListener("change", () => {
        cardChecked = Array.from(checkbox)
          .filter((check) => check.checked)
          .map((check) => check.value);
        crossFilter(upcomingCard, cardChecked, searched);
      });
    });
  } catch (error) {
    console.log(error.message);
  }
}

getInfo(url, containerCard);

//cards
function cargarCards(upcomingCard, contenedor) {
  containerCard.innerHTML = "";
  if (upcomingCard.length > 0) {
    let fragmento = document.createDocumentFragment();
    for (card of upcomingCard) {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card", "mb-3");
      cardDiv.style.width = "23rem";
      cardDiv.innerHTML = `
      <div class="card flexcardMediumorchid ">
      <div class="flexcardNumber flexcardNumberMediumorchid ">
        <h5 class="flexcardTitle text-center">${card.name}</h5>
      </div>
      <div class="flexcardImg">
        <img src=${card.image} class="flexcardimgItem" alt=${card.name.split(" ").join("_")}>
      </div>
      <div class="card-body">
        <p class="card-text mb-1">${card.description}</p>
      </div>
      <div class="price mt-1 mb-1">
        <p class="priceText m-2 ">$${card.price}</p>
        <button type="submit" class="buttonmediumorchid  m-2 mb-5">
          <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">
            Details
          </a>
        </button>
      </div>       
    </div>`;
      fragmento.appendChild(cardDiv);
    }
    contenedor.appendChild(fragmento);
  } else {
    let div = document.createElement("div");
    div.innerHTML =
      '<p class="bg-black px-2 text-danger display-5">The title entered does not exist</p>';
    contenedor.appendChild(div);
  }
}

//category
function cargarCheck(categorys, container) {
  let fragmento = document.createDocumentFragment()
  for (check of categorys) {
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
    checkDiv.innerHTML = `<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  container.appendChild(fragmento)
}

function crossFilter(arrayCards, checked, searcheds) {
  let cardCheck = filterCard(checked, arrayCards)
  let cardSearched = filterSearch(searcheds, cardCheck)
  cargarCards(cardSearched, containerCard)

}

function filterCard(checkeado, listCard) {
  return checkeado.length > 0 ? listCard.filter(event => checkeado.includes(event.category.replace(" ", "_"))) : listCard
}

function filterSearch(searchWord, listCard) {
  return searchWord == "" ? listCard : listCard.filter(event => event.name.toLowerCase().search(searchWord.toLowerCase().trim()) != -1)
}