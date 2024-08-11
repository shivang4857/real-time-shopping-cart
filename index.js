import  {initializeApp} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import  {getDatabase , ref , push} from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL:  "https://shopping-cart-3d97b-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);

//creating the refernce point in the db where you are going to store the data.
const shoppingListInDB = ref(database , "shoppingList");

const inputElement = document.getElementById("input-feild");
const addButtonEl = document.getElementById("add-button");
const listElement = document.getElementById("list");

addButtonEl.addEventListener("click", function(){
    let inputvalue = inputElement.value;
    appendshoppinglist(inputvalue);
  
    push(shoppingListInDB, {
        name: inputvalue
       
    });
    clearList();
    console.log(inputvalue);
})


function clearList(){
    inputElement = "";
}

function appendshoppinglist(iteamvalue){
    listElement.innerHTML += `<li>${inputvalue}</li>`;
    
}
