let containerCard = document.getElementById("cardPast")
//api
const url = "https://mindhub-xj03.onrender.com/api/amazing"

async function getInfo(urlApi, container) {
  try {
    const response = await fetch(urlApi)
    let data = await response.json()
    console.log(data)
    
    let pastCard = data.events.filter(
      event => new Date(data.currentDate) > new Date(event.date))
    console.log(pastCard.length)
    cargarCards(pastCard, container)
    
    let containerCheck = document.getElementById("pastCheck")
    let categorysFilter = [... new Set(pastCard.map(event => event.category))]
    console.log(categorysFilter)
    cargarCheck(categorysFilter, containerCheck);
   
    let searched = ""
    let cardChecked = []

    const search = document.getElementById("search");
    search.addEventListener("keyup", (e) => {
      searched = e.target.value
      crossFilter(pastCard, cardChecked, searched)
    })
    let checkbox = document.querySelectorAll("input[type=checkbox]")
    checkbox.forEach(categoria => {
      categoria.addEventListener('change', () => {
        cardChecked = Array.from(checkbox).filter(check => check.checked).map(check => check.value)
        crossFilter(pastCard, cardChecked, searched)
      })
    })
  } catch (error) {
    console.log(error.message)
  }
}

getInfo(url, containerCard)


//GENERAMOS LAS CARD FILTRANDO POR FECHA
function cargarCards(pastCard, contenedor) {
  containerCard.innerHTML = ""
  if (pastCard.length > 0) {
    let fragment = document.createDocumentFragment()
    for (card of pastCard) {
      let cardDiv = document.createElement("div")
      cardDiv.classList.add("card", "mb-3")
      cardDiv.style.width = "23rem"
      cardDiv.innerHTML = `
      <div class="card flexcardPink">
      <div class="flexcardNumber flexcardNumberPink">
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
        <button type="submit" class="buttonpink m-2 mb-5">
          <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">
            Details
          </a>
        </button>
      </div>       
    </div>`
      fragment.appendChild(cardDiv)
    }
    contenedor.appendChild(fragment)
  } else {
    let div = document.createElement("div")
    div.innerHTML = '<p class="priceText">Wrong search...</p>'
    contenedor.appendChild(div)
  }
}

//GENERAMOS LOS CHECK
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