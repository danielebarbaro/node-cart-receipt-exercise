import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

import * as fs from "fs";
import * as os from "os";


// Costanti
const machine = os.userInfo();
const myUsername = machine.username.toUpperCase(); // Nessuno di questi valori dovrebbe poter cambiare a runtime quindi non serve ricalcolarli ogni volta
const myPid = String(process.pid);



// Funzioni

const formatDate = function(date) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let dayName = days[date.getDay()];
    let monthName = months[date.getMonth()];
    let dayNumberPadded = ("00" + date.getDate().toString()).slice(-2);
    let year = date.getFullYear();

    return `${dayName} ${monthName} ${dayNumberPadded} ${year}`
}

const header = () => `${myUsername} Cart - ${myPid}\n${new Date().toDateString()}`;

const frame = (sideChar, centralChar, lenght) => `${sideChar} ${centralChar.repeat(lenght-4)} ${sideChar}`;

const formatProduct = (product) => `[${product.ean}]\t${product.name}\t\t\t${product.price}`;




// Main

console.log(frame("+", "-", 54));

console.log(header());

console.log(frame("*", "-", 54));

let total = 0;

for (let productEan of carts[0].products) {
    
    let product = products.find(element => element.ean === productEan);
    
    console.log("   " + formatProduct(product));
    
    total += product.price;
    
}

console.log(frame("*", "-", 54));

console.log(`   Total:\t\t\t\t${total.toFixed(2)}`);

console.log(frame("+", "-", 54));
