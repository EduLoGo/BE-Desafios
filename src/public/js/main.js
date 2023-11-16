const socket = io();

/* document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
}); */

socket.on("products", (data) => {
  const mainDiv = document.getElementById("mainDiv");
  const newCard = document.createElement("div");
  newCard.setAttribute("class", "col-6");
  newCard.innerHTML = `
  <div class="card mb-2">
    <div class="card-header">
      <h6 class="card-title">${data.title}</h6>
    </div>
    <div class="card-body row">
      <p>Descripción: ${data.description}</p>
      <div class="card-text col-6">
        <li>Precio: $${data.price}</li>
      </div>
      <div class="card-text col-6">
        <li>Stock Disponible: ${data.stock}</li>
      </div>
    </div>
  </div>
  `;
  mainDiv.appendChild(newCard);
  document.getElementById("form").reset();
});
