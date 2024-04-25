"use strict"

const body = document.getElementsByTagName("body")[0];
const stylesheet = document.styleSheets[0];
const darkMode = document.getElementById("dark-mode-toggle");
const header = document.querySelector('header');
const shop = document.getElementById('shop');
const contact = document.getElementById('contact');
const bt1 = document.getElementById('btn1');
const bt2 = document.getElementById('btn2');
const bt3 = document.getElementById('btn3');
const darkModeIcon = document.getElementsByClassName('material-symbols-outlined')[0];
const item1 = document.getElementById('item1');
const item2 = document.getElementById('item2');
const item3 = document.getElementById('item3');


//-------------------------------------dark mode-------------------------------//


darkMode.addEventListener('change', function(){
    if(this.checked){
        body.style.backgroundColor = "black";
        body.style.color = "white";
        header.style.backgroundColor = "black";
        shop.style.backgroundColor = "black";
        contact.style.backgroundColor = "black";
        bt1.style.color = "white";
        bt2.style.color = "white";
        bt3.style.color = "white";
        darkModeIcon.innerHTML = "dark_mode";
    }
    else{
        body.style.backgroundColor = "white";
        body.style.color = "black";
        header.style.backgroundColor = "#ececec";
        shop.style.backgroundColor = "#ececec";
        contact.style.backgroundColor = "#ececec";
        bt1.style.color = "black";
        bt2.style.color = "black";
        bt3.style.color = "black";
        darkModeIcon.innerHTML = "light_mode";
    }
});

//product display switcher functions
function displayProduct1(){
    item1.classList.remove('hiddenItem');
    item2.classList.add('hiddenItem');
    item3.classList.add('hiddenItem');
}
function displayProduct2(){
    item1.classList.add('hiddenItem');
    item2.classList.remove('hiddenItem');
    item3.classList.add('hiddenItem');
}
function displayProduct3(){
    item1.classList.add('hiddenItem');
    item2.classList.add('hiddenItem');
    item3.classList.remove('hiddenItem');
}



//--------------------------display search results-----------------------//

function displaySearchResult(e){
    e.preventDefault();

    let searchResultMessage = document.getElementById("searchOutput");

    searchResultMessage.innerHTML = "No result yet! We are adding inventory daily, try again later!";
}




//--------------------------cost calculator------------------------------//

//create an empty cart array
let cart = [];

//represent each product as object
let item1Object = {
    name: "Ready to Die",
    artist: "Biggie Smalls",
    price: 24.99
};
let item2Object = {
    name: "The Slow Rush",
    artist: "Tame Impala",
    price: 32.29
};
let item3Object = {
    name: "It Is What It Is",
    artist: "Thundercat",
    price: 19.89
};

let emptyCartMessage = document.getElementById('emptyCartMessage');
let runningSubtotal = 0.00;
let runningTax = 0.00;
let runningShipping = 0.00;
let runningTotal = 0.00;
const taxRate = 0.09;
const shippingRate = 0.08;

//get checkbox inputs
let itemCheckboxes = document.querySelectorAll("#productDisplay input[type='checkbox']");

//get costListSpans
let subtotalSpan = document.getElementById('subtotal').children[0];
let taxSpan = document.getElementById('tax').children[0];
let shippingSpan = document.getElementById('shipping').children[0];
let totalSpan = document.getElementById('total').children[0];


//take whatever is in cart and calculate totals and displays on page
function addToCart(){
    runningSubtotal = 0.00;
    cart.forEach((cartItemToAdd) => {
        runningSubtotal += cartItemToAdd.price;
        subtotalSpan.innerHTML = runningSubtotal;
    });
}
function removeFromCart(){
    cart.forEach((cartItemToRemove) => {
        runningSubtotal -= cartItemToRemove.price;
        subtotalSpan.innerHTML = runningSubtotal;
    });
}


//add to cart = push to array
function cartList(e){  
    //which check box was clicked
    let currentItem = e.target;

    //if checkbox was checkd, add to array and output, or if uncheck remove
    if(currentItem.checked && currentItem.name === "item1Check"){
        if(cart.indexOf(item1Object) === -1){//if item is not already in cart
            cart.push(item1Object);
            addToCart();
        }
    }else if(currentItem.checked && currentItem.name === "item2Check"){
        if(cart.indexOf(item2Object) === -1){//if item is not already in cart
            cart.push(item2Object);
            addToCart();
        }
    }else if(currentItem.checked && currentItem.name === "item3Check"){
        if(cart.indexOf(item3Object) === -1){//if item is not already in cart
            cart.push(item3Object);
            addToCart();
        }
    }
    
    if(!(currentItem.checked) && (currentItem.name === "item1Check")){
        removeFromCart();      
        let index = cart.indexOf(item1Object);
        cart.splice(index, 1);

    }
    if(!(currentItem.checked) && (currentItem.name === "item2Check")){
        removeFromCart();     
        let index = cart.indexOf(item2Object);
        cart.splice(index, 1);
 
    }
    if(!(currentItem.checked) && (currentItem.name === "item3Check")){
        removeFromCart();      
        let index = cart.indexOf(item3Object);
        cart.splice(index, 1);
    }
}



//-----------------------------------guessing game--------------------------------//

function guessGame(e){  
    e.preventDefault();

    let userNumDisplay = document.getElementById("userNumDisplay");
    let randomNumDisplay = document.getElementById("randomNumDisplay");
    let gameMessage = document.getElementById("gameMsg");
    let gameErrorMessage = document.getElementById("gameErrorMessage");

    //generate a random number
    let randomNumber = getRandomNumber(1, 10);

    //take user input from form
    let userNumber = parseInt(document.getElementById('numGuess').value);
    console.log(userNumber);
  
    //display numbers to screen
    userNumDisplay.innerHTML = userNumber;
    randomNumDisplay.innerHTML = randomNumber;
    gameErrorMessage.innerHTML = "";
    gameMessage.innerHTML = "";

    //check to see if number is bewteen 1 and 10.
    //if not throw error message
    //if yes, compare numbers and display results
    try{
      if(userNumber < 1 || userNumber > 10){
        throw "Please choose a number between 1 and 10";
      }else{
        if(userNumber === randomNumber){
          gameMessage.innerHTML = "You won! Enter your information below to receive your gift"
        }else{
          gameMessage.innerHTML = "You lost, try again!"
        }      
      }
    }catch(error){
		// add the error messge to the span in the form
		gameErrorMessage.innerHTML = error;
	}
}
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}




//-----------------------------------Event Handlers------------------------//

document.getElementById('searchSubmit').addEventListener("click", displaySearchResult);
document.getElementById("btn1").addEventListener("click", displayProduct1);
document.getElementById("btn2").addEventListener("click", displayProduct2);
document.getElementById("btn3").addEventListener("click", displayProduct3);
for(let itemCheckbox of itemCheckboxes){
    itemCheckbox.addEventListener("change", cartList);
}
document.getElementById("guessSubmit").addEventListener("click", guessGame);





