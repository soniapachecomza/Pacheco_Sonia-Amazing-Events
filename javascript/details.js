const containerCard = document.getElementById("containerCard");
//api
const url = "https://mindhub-xj03.onrender.com/api/amazing";

async function getInfo(urlApi, container) {
  try {
    const response = await fetch(urlApi);
    let data = await response.json();
    console.log(data);
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const card = data.events.find((event) => event._id == id);
    cargarCard(card, container);
  } catch (error) {
    console.log(error.message);
  }
}
getInfo(url, containerCard);

//cards
function cargarCard(card, container) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("row", "g-0");
  cardDiv.innerHTML = ` 
  <div id="cardsDetails" class="card flexcardGold" style="max-width: 900px;">
  <div class="flexcardNumber flexcardNumberGold p-2 border w-90">
    <h5 class="flexcardTitle text-center p-2">${card.name}</h5>
    <div class="flexcardImg1">
      <img src=${card.image} class="flexcardimgItem1" alt=${card.name.split(" ").join("_")}>
    </div>

  </div>
  <div class=" card-body p-1 border border-danger-black bg-white w-50 p-4">
  
    <div class="p-2">
      <p class="card-text mb-1">
      <span class="dtails-subtitle">
      Date:
      </span>
       2022-10-15</p>
      <p class="card-text mb-1">
        <span class="dtails-subtitle">
        Description:
        </span> ${card.description}
      </p>
      <p class="card-text mb-1">
        <span class="dtails-subtitle">
        Category:
        </span>${card.category}
      </p>
      <p class="card-text mb-1">
        <span class="dtails-subtitle">
        Place:
        </span>${card.place}
      </p>
      <p class="card-text mb-1">
        <span class="dtails-subtitle">
        Capacity:
        </span>${card.capacity}
      </p>
      <p class="card-text mb-1">
        <span class="dtails-subtitle">
        Assistance or Estimate:
        </span>${card.assistance}
      </p>
      <div class="price mt-1 mb-1">
        <p class="priceText m-2 ">$${card.price}</p>
       </div>
    </div>
    <button type="submit" class="buttongold m-2 mb-5">
      <a href="./index.html?id=${card._id}" class="btn text-white  color-btn align-self-end">
        Index
      </a>
  </button>
  </div>
  </div>`;
  container.appendChild(cardDiv);
}
