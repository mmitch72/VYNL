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
    body.classList.add('dark-mode');
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
    body.classList.remove('dark-mode');
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
        body.classList.add('dark-mode');
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
        body.classList.remove('dark-mode');
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
        if (term) {
            searchItunes(term);
        } else {
            outputMessage.innerHTML = "Please enter a search term";
        }
    }
});

searchSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Search button clicked!');
    const term = encodeURIComponent(searchElem.value.trim());
    if (term) {
        searchItunes(term);
    } else {
        outputMessage.innerHTML = "Please enter a search term";
    }
});

function searchItunes(term) {
    console.log('Search term:', term);
    outputMessage.innerHTML = "Searching...";
    searchResultMessage.innerHTML = "";
    
    const corsProxy = 'https://api.allorigins.win/get?url=';
    const url = `${corsProxy}${encodeURIComponent(`https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=50`)}`;
    console.log('Fetching URL:', url);
    let output = "";


    // fetch and display albums
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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

//****This feature has bugs to work on. I should have used checkbox data values to create objects instead of manually creating them//**

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
let itemsList = document.getElementById('itemsList');

//get checkbox inputs
let itemCheckboxes = document.querySelectorAll("#productDisplay input[type='checkbox']");

//take whatever is in cart and calculate totals and display on page
function updateCartDisplay() {
    runningSubtotal = 0.00;
    
    // Clear the items list
    itemsList.innerHTML = '';
    
    if (cart.length === 0) {
        itemsList.innerHTML = '<li id="emptyCartMessage">Your Cart is Empty</li>';
        subtotalSpan.innerHTML = '$0.00';
        taxSpan.innerHTML = '$0.00';
        shippingSpan.innerHTML = '$0.00';
        totalSpan.innerHTML = '$0.00';
        return;
    }
    
    // Add items to the list and calculate subtotal
    cart.forEach((cartItem) => {
        runningSubtotal += cartItem.price;
        const listItem = document.createElement('li');
        listItem.innerHTML = `${cartItem.name} - ${cartItem.artist} - $${cartItem.price.toFixed(2)}`;
        itemsList.appendChild(listItem);
    });
    
    // Calculate tax, shipping, and total
    runningTax = runningSubtotal * taxRate;
    runningShipping = runningSubtotal * shippingRate;
    runningTotal = runningSubtotal + runningTax + runningShipping;
    
    // Update display
    subtotalSpan.innerHTML = `$${runningSubtotal.toFixed(2)}`;
    taxSpan.innerHTML = `$${runningTax.toFixed(2)}`;
    shippingSpan.innerHTML = `$${runningShipping.toFixed(2)}`;
    totalSpan.innerHTML = `$${runningTotal.toFixed(2)}`;
}

//add to cart = push to array
function cartList(e){  
    //which check box was clicked
    let currentItem = e.target;

    //if checkbox was checked, add to array and output, or if uncheck remove
    if(currentItem.checked && currentItem.name === "item1Check"){
        if(cart.indexOf(item1Object) === -1){//if item is not already in cart
            cart.push(item1Object);
        }
    }else if(currentItem.checked && currentItem.name === "item2Check"){
        if(cart.indexOf(item2Object) === -1){//if item is not already in cart
            cart.push(item2Object);
        }
    }else if(currentItem.checked && currentItem.name === "item3Check"){
        if(cart.indexOf(item3Object) === -1){//if item is not already in cart
            cart.push(item3Object);
        }
    }
    
    if(!(currentItem.checked) && (currentItem.name === "item1Check")){
        let index = cart.indexOf(item1Object);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    if(!(currentItem.checked) && (currentItem.name === "item2Check")){
        let index = cart.indexOf(item2Object);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    if(!(currentItem.checked) && (currentItem.name === "item3Check")){
        let index = cart.indexOf(item3Object);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    
    updateCartDisplay();
}

// Checkout functionality
document.getElementById('checkout').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = runningTotal.toFixed(2);
    alert(`Thank you for your order! Total: $${total}\n\nThis is a demo site - no actual purchase will be made.`);
    
    // Clear cart
    cart = [];
    itemCheckboxes.forEach(checkbox => checkbox.checked = false);
    updateCartDisplay();
});




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
          gameMessage.innerHTML = "🎉 You won! Enter your information below to receive your VYNL gift card! 🎉";
          gameMessage.style.color = "#28a745";
        }else{
          gameMessage.innerHTML = "😔 You lost, try again!";
          gameMessage.style.color = "#dc3545";
        }      
      }
    }catch(error){
		// add the error messge to the span in the form
		gameErrorMessage.innerHTML = error;
		gameErrorMessage.style.color = "#dc3545";
	}
}

// generate random number//
function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Contact form validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fName = document.getElementById('fName').value.trim();
    const lName = document.getElementById('lName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Basic validation
    if (!fName || !lName || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    alert('Thank you for your message! We\'ll get back to you soon.');
    this.reset();
});




//-------------------------------Event Handlers---------------------------//

for(let itemCheckbox of itemCheckboxes){
    itemCheckbox.addEventListener("change", cartList);
}

document.getElementById("guessSubmit").addEventListener("click", guessGame);

// Initialize cart display
updateCartDisplay();





