// get elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let Del_All = document.querySelector(".DeleteAll");
// get total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - discount.value;
    total.innerHTML = res;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#4A9DEC";
  }
}

// create
let Data;
if (localStorage.Product != null) {
  Data = JSON.parse(localStorage.Product);
} else {
  Data = [];
}

create.onclick = function () {
  let Data_obj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value != "") {
    if (Data_obj.count > 1) {
      for (let i = 0; i < Data_obj.count; i++) {
        Data.push(Data_obj);
      }
    } else {
      Data.push(Data_obj);
    }
    localStorage.setItem("Product", JSON.stringify(Data));

    total.style.background = "#4A9DEC";

    clear();
    show();
  }
};

// clear
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// Show Data
let tbody = document.getElementById("tbody");
function show() {
  let table = "";
  for (let i = 0; i < Data.length; i++) {
    table += `
        <tr>
             <td>${i + 1}</td>
             <td>${Data[i].title}</td>
             <td>${Data[i].price}</td>
             <td>${Data[i].taxes}</td>
             <td>${Data[i].ads}</td>
             <td>${Data[i].discount}</td>
             <td>${Data[i].total}</td>
             <td>${Data[i].category}</td>
             <td><button id="delete" onclick="del(${i})">Delete</button></td>
           </tr>
   `;
  }
  tbody.innerHTML = table;
  if (Data.length > 1) {
    Del_All.innerHTML = `
     <button onclick="deleteAll()">Delete All  [ ${Data.length} item ]</button> 
    `;
  } else {
    Del_All.innerHTML = ``;
  }
}
show();

// delete
function del(i) {
  Data.splice(i, 1);
  localStorage.Product = JSON.stringify(Data);
  show();
}

// delete all
function deleteAll() {
  Data = [];
  localStorage.clear();
  show();
}
