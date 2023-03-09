const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const card = dataCards.events.find((event) => event._id == id);
console.log(card)
loadCard(card);

function loadCard(card) {
  const containerCard = document.getElementById("containerCard");
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("row", "g-0");

  cardDiv.innerHTML = `
<div id="cardsDetails" class="card flexcardGold" style="max-width: 900px;">
<div class="flexcardNumber flexcardNumberGold p-2 border w-90">  <h5 class="flexcardTitle text-center p-2">${card.name
  }</h5>
  <div class="">
  <img src=${card.image} class="flexcardimgItem1" alt=${card.name.split(" ").join("_")}>
  </div>
</div>
<div class=" card-body p-1 border border-danger-black bg-white w-50 p-4">

  <div class="p-2">
    <p class="card-text mb-1"><span class="dtails-subtitle">Date:</span> 2022-10-15</p>
    <p class="card-text mb-1"><span class="dtails-subtitle">Description:</span> ${
      card.description
    }</p>
    <p class="card-text mb-1"><span class="dtails-subtitle">Category:</span>${
      card.category
    }</p>
    <p class="card-text mb-1"><span class="dtails-subtitle">Place:</span>${
      card.place
    }</p>
    <p class="card-text mb-1"><span class="dtails-subtitle">Capacity:</span>${
      card.capacity
    }</p>
    <p class="card-text mb-1"><span class="dtails-subtitle">Assistance or Estimate:</span>${
      card.assistance
    }</p>
    <div class="price mt-1 mb-1">
      <p class="priceText m-2 ">$${card.price}</p>
     </div>
  </div>
</div>
</div>`;
  containerCard.appendChild(cardDiv);
}
