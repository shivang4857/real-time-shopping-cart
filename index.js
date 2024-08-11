import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup ,signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const appSettings = {
  apiKey: "AIzaSyC6eEREyWZg6M5xZRserZ6BbKwMVcyS67I",
  authDomain: "shopping-cart-3d97b.firebaseapp.com",
  databaseURL: "https://shopping-cart-3d97b-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const database = getDatabase(app);




const inputElement = document.getElementById("input-feild");
const addButtonEl = document.getElementById("add-button");
const listElement = document.getElementById("list");

const viewloggedOut = document.getElementById("logged-out");
const viewloggedIn = document.getElementById("logged-in");
const googleloginbtn = document.getElementById("googlebtn");
const logoutbtn = document.getElementById("log-out");

// Trigger button click on pressing Enter
inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addButtonEl.click();
  }
});

addButtonEl.addEventListener("click", function () {
  let inputvalue = inputElement.value;
  const userShoppingListinDB = ref(database,`users/${auth.currentUser.uid}/shoppingList`);
  if (inputvalue.trim() !== "") {
    push(userShoppingListinDB, inputvalue);
    clearList();
    console.log(inputvalue);
  }
});

// Google login
googleloginbtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Logged in with Google");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Monitor authentication state continuously
onAuthStateChanged(auth, function (user) {
  if (user) {
 
    viewloggedIn.style.display = "block";
    viewloggedOut.style.display = "none";
    fetchFromDB();
  } else {
    viewloggedIn.style.display = "none";
    viewloggedOut.style.display = "block";
  }
});

// Logout out the user
logoutbtn.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Monitor changes in the shopping list

function fetchFromDB() {

    clearshoppingList();
    const userShoppingListinDB = ref(database,`users/${auth.currentUser.uid}/shoppingList`);
    onValue(userShoppingListinDB, function (snapshot) {
        clearshoppingList();
        if (snapshot.exists()) {
          let itemlist = Object.entries(snapshot.val());
          for (let i = 0; i < itemlist.length; i++) {
            let currentItem = itemlist[i];
            appendshoppinglist(currentItem);
          }
        } else {
          listElement.innerHTML = "No items in the list ...yet";
        }
      });
      

}


function clearshoppingList() {
  listElement.innerHTML = "";
}

function clearList() {
  inputElement.value = "";
}

function appendshoppinglist(itemvalue) {
  let itemId = itemvalue[0];
  let itemValue = itemvalue[1];

  let newElement = document.createElement("li");

  newElement.addEventListener("click", function () {
    const exactlocationInDB = ref(database,`users/${auth.currentUser.uid}/shoppingList/${itemId}`);
   
    remove(exactlocationInDB);
  });

  newElement.textContent = itemValue;
  listElement.append(newElement);
}
