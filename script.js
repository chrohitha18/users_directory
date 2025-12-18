const API_URL = "https://jsonplaceholder.typicode.com/users";

const container = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const modal = document.getElementById("modal");
const userDetails = document.getElementById("userDetails");
const closeBtn = document.getElementById("closeBtn");

let users = [];
let ascending = true;

/* Fetch Users */
async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    users = await response.json();
    loading.style.display = "none";
    renderUsers(users);
  } catch (err) {
    loading.style.display = "none";
    error.textContent = "Unable to fetch users.";
  }
}

/* Render User Cards */
function renderUsers(data) {
  container.innerHTML = "";
  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.company.name}</p>
      <p>${user.address.city}</p>
    `;

    card.addEventListener("click", () => showDetails(user));
    container.appendChild(card);
  });
}

/* Search */
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
  );
  renderUsers(filtered);
});

/* Sort */
sortBtn.addEventListener("click", () => {
  users.sort((a, b) =>
    ascending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  ascending = !ascending;
  sortBtn.textContent = ascending ? "Sort A–Z" : "Sort Z–A";
  renderUsers(users);
});

/* Modal */
function showDetails(user) {
  modal.style.display = "block";
  userDetails.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> ${user.website}</p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
  `;
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* Initialize */
loadUsers();
