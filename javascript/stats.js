const url = "https://mindhub-xj03.onrender.com/api/amazing";

async function getInfo(urlApi) {
  try {
    const response = await fetch(urlApi);
    let data = await response.json();
    const containerTable1 = document.getElementById("tableEventStats");
    const containerTableUpcoming = document.getElementById("tableUpcomming");
    const containerTbPast = document.getElementById("tablePastEvents");
    cargarTablaResumen(data.events, containerTable1);
    let upcommingEvents = data.events.filter(
      (event) => new Date(event.date) > new Date(data.currentDate)
    );
    loadStatisticTable(upcommingEvents, containerTableUpcoming);
    let pastEvents = data.events.filter(
      (event) => new Date(event.date) < new Date(data.currentDate)
    );
    loadStatisticTable(pastEvents, containerTbPast);
  } catch (error) {
    console.log(error.message);
  }
}

getInfo(url);

function revenues(arrayCard, categoria) {
  let arrayByCategory = arrayCard.filter(
    (event) => event.category == categoria
  );
  let moreRevenue = arrayByCategory.reduce((total, event) => {
    event.assistance == undefined
      ? (total += event.estimate * event.price)
      : (total += event.assistance * event.price);

    return total;
  }, 0);
  return moreRevenue;
}

function percentAttendance(arrayCard, categoria) {
  let arrayByCategory = arrayCard.filter(
    (event) => event.category == categoria
  );
  let sumCapacity = arrayByCategory.reduce((total, event) => {
    event.assistance == undefined
      ? (total += event.estimate / event.capacity)
      : (total += event.assistance / event.capacity);
    return total;
  }, 0);
  return ((sumCapacity * 100) / arrayByCategory.length).toFixed(2);
}

function cargarTablaResumen(arrayCards, contenedor) {
  contenedor.innerHTML = "";
  let eventMoreAssistance = arrayCards
    .filter((event) => event.assistance)
    .reduce((a, b) => {
      if (a.assistance / a.capacity > b.assistance / b.capacity) return a;
      return b;
    });
  let eventLessAssistance = arrayCards
    .filter((event) => event.assistance)
    .reduce((a, b) => {
      if (a.assistance / a.capacity > b.assistance / b.capacity) return b;
      return a;
    });
  let eventMoreCapacity = arrayCards.reduce((a, b) => {
    if (a.capacity > b.capacity) return a;
    return b;
  });
  let fragment = document.createDocumentFragment();
  let trTable1 = document.createElement("tr");
  trTable1.innerHTML = `<td class="text-center">${
    eventMoreAssistance.name
  } : ${(
    (eventMoreAssistance.assistance / eventMoreAssistance.capacity) *
    100
  ).toFixed(2)} %</td>
         <td class="text-center">${eventLessAssistance.name} : ${(
    (eventLessAssistance.assistance / eventLessAssistance.capacity) *
    100
  ).toFixed(2)} %</td>
         <td class="text-center">${eventMoreCapacity.name} : ${
    eventMoreCapacity.capacity
  }</td>`;
  fragment.appendChild(trTable1);
  contenedor.appendChild(fragment);
}

function loadStatisticTable(arrayCards, contenedor) {
  contenedor.innerHTM = "";

  let fragment = document.createDocumentFragment();

  let categorys = [
    ...new Set(arrayCards.map((event) => event.category)),
  ].sort();

  for (cat of categorys) {
    let row = document.createElement("tr");
    row.classList.add("text-center");
    row.innerHTML = `<td class="text-center col-4">${cat}</td>
     <td class="text-center col-4">$ ${revenues(arrayCards, cat)}</td>
     <td class="text-center col-4">${percentAttendance(arrayCards, cat)}%</td>`;

    fragment.appendChild(row);
  }
  contenedor.appendChild(fragment);
}
