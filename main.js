"use strict"


//---------------------------global variables----------------------------------//

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
const searchElem = document.getElementById('searchInput');
const searchSubmit = document.getElementById('searchSubmit');
const searchResultMessage = document.getElementById("searchOutput");
const outputMessage = document.getElementById("outputMessage");


//-------------------------------------dark mode-------------------------------//
//check for stored theme in local storage and apply

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    header.style.backgroundColor = "black";
    shop.style.backgroundColor = "black";
    contact.style.backgroundColor = "black";
    bt1.style.color = "white";
    bt2.style.color = "white";
    bt3.style.color = "white";
    darkModeIcon.innerHTML = "dark_mode";
    darkMode.checked = true; // Set the checkbox to checked for dark mode
} else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
    header.style.backgroundColor = "#ececec";
    shop.style.backgroundColor = "#ececec";
    contact.style.backgroundColor = "#ececec";
    bt1.style.color = "black";
    bt2.style.color = "black";
    bt3.style.color = "black";
    darkModeIcon.innerHTML = "light_mode";
    darkMode.checked = false; // Set the checkbox to unchecked for light mode
}

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

        localStorage.setItem('theme', 'dark');
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

        localStorage.setItem('theme', 'light');
    }
});


// jQuery ui tooltip widget displays a tip for users when the mouse hovers over the search bar
$( function() {
    $( document ).tooltip();
  } );



//--------------------------get album content from iTunes---------------------------//

// This feature listens for events on the search bar, calls the 'searchItunes' function which builds a url based on the user input.
// The function uses a fetch API to request data and a CORS proxy to access Itunes Web API data.
// The JSON data is then extracted from the wrapped response, parsed, filtered for uniqueness and displayed to the page.

// API Documentation @ https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html#//apple_ref/doc/uid/TP40017632-CH5-SW1

// CORS proxy: https://allorigins.win/

searchElem.addEventListener('keydown', (event) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key === 'Enter') {
        event.preventDefault()
        console.log('Enter pressed!');
        const term = encodeURIComponent(searchElem.value.trim());
        searchItunes(term);
    }
});

searchSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Search button clicked!');
    const term = encodeURIComponent(searchElem.value.trim());
    searchItunes(term);
});

function searchItunes(term) {
    console.log('Search term:', term);
    const corsProxy = 'https://api.allorigins.win/get?url=';
    const url = `${corsProxy}${encodeURIComponent(`https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=50`)}`;
    console.log('Fetching URL:', url);
    let output = "";


    // fetch and display albums
    fetch(url)
        .then(response => response.json()) // Extract the proxy's JSON response
        .then(proxyData => {
            const data = JSON.parse(proxyData.contents); // Parse the actual API response
            console.log('API Response:', data);

            if (data.results.length === 0) {
                console.log('No results found.');
                outputMessage.innerHTML = `No results found for '${term}'`;
            } else {
                const uniqueAlbums = {}; // An object to track unique albums
                for (const item of data.results) {
                    console.log('Result:', item);
                    if (!uniqueAlbums[item.collectionName]) {
                        uniqueAlbums[item.collectionName] = true;

                        output += `<section>
                                        <a href="${item.collectionViewUrl}" target="_blank">
                                            <img src="${item.artworkUrl100}" alt="${item.artistName} ${item.collectionName}" class="albumCover">
                                        </a>
                                    </section>`;
                    }
                }
                searchResultMessage.innerHTML = output;
                outputMessage.innerHTML = `Showing results for '${searchElem.value}'`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            outputMessage.innerHTML = `Failed to fetch results. Please try again later.`;
        });
}

//-----------------------------jQuery Tab Plugin function-------------------------//

// Displays products in the productDisplay div as tabs

$(function(){
	$(".tabs").tabs({
        activate: function(event, ui) {
            ui.newPanel.css("display","flex");
        }
    });
});



//--------------------------cost calculator (bonus feature)------------------------------//

//****This feature has bugs to work on. I should have used checkbox data values to create objects instead of manually creating them//

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

//define page display variables//
let emptyCartMessage = document.getElementById('emptyCartMessage');
let runningSubtotal = 0.00;
let runningTax = 0.00;
let runningShipping = 0.00;
let runningTotal = 0.00;
const taxRate = 0.09;
const shippingRate = 0.08;
let subtotalSpan = document.getElementById('subtotal').children[0];
let taxSpan = document.getElementById('tax').children[0];
let shippingSpan = document.getElementById('shipping').children[0];
let totalSpan = document.getElementById('total').children[0];

//get checkbox inputs
let itemCheckboxes = document.querySelectorAll("#productDisplay input[type='checkbox']");


//take whatever is in cart and calculate totals and display on page
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

    //if checkbox was checked, add to array and output, or if uncheck remove
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




//-----------------------------------guessing game (bonus feature)--------------------------------//

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

// generate random number//
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}




//-------------------------------Event Handlers---------------------------//

for(let itemCheckbox of itemCheckboxes){
    itemCheckbox.addEventListener("change", cartList);
}
document.getElementById("guessSubmit").addEventListener("click", guessGame);





