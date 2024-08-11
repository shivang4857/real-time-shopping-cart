import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://shopping-cart-3d97b-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

//creating the refernce point in the db where you are going to store the data.
const shoppingListInDB = ref(database, "shoppingList");

const inputElement = document.getElementById("input-feild");
const addButtonEl = document.getElementById("add-button");
const listElement = document.getElementById("list");

addButtonEl.addEventListener("click", function () {
  let inputvalue = inputElement.value;

  push(shoppingListInDB, inputvalue);

  clearList();
  console.log(inputvalue);
});

onValue(shoppingListInDB, function (snapshot) {
  clearshoppingList();
  if (snapshot.exists()) {
    let iteamlist = Object.entries(snapshot.val());

    for (let i = 0; i < iteamlist.length; i++) {
      let currentIteam = iteamlist[i];

      appendshoppinglist(currentIteam);
    }
  } else {
    listElement.innerHTML = "No items in the list ...yet";
  }
});

function clearshoppingList() {
  listElement.innerHTML = "";
}

function clearList() {
  inputElement.value = "";
}

function appendshoppinglist(iteamvalue) {
  //listElement.innerHTML += `<li>${iteamvalue}</li>`;
  let itemId = iteamvalue[0];
  let iteamValue = iteamvalue[1];

  let newElement = document.createElement("li");

  newElement.addEventListener("click", function () {
    let exactlocationInDB = ref(database, `shoppingList/${itemId}`);

    remove(exactlocationInDB);
  });

  newElement.textContent = iteamValue;
  listElement.append(newElement);
}
