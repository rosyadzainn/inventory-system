let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem() {
  const name = document.getElementById("name").value.trim();
  const qty = document.getElementById("qty").value;

  if (!name || qty <= 0) {
    alert("Isi data dengan benar!");
    return;
  }

  items.push({ name, qty });
  clearInput();
  save();
}

function editItem(index) {
  const item = items[index];

  document.getElementById("name").value = item.name;
  document.getElementById("qty").value = item.qty;

  items.splice(index, 1);
  save();
}

function deleteItem(index) {
  items.splice(index, 1);
  save();
}

function save() {
  localStorage.setItem("items", JSON.stringify(items));
  render();
}

function render() {
  const tbody = document.getElementById("tableBody");
  const keyword = document.getElementById("search").value.toLowerCase();

  tbody.innerHTML = "";

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3">Belum ada data</td></tr>`;
    return;
  }

  filtered.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>
          <button onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function clearInput() {
  document.getElementById("name").value = "";
  document.getElementById("qty").value = "";
}

render();