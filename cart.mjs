import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

import * as fs from "fs";
import * as os from "os";


// Costanti
const machine = os.userInfo();
const myUsername = machine.username.toUpperCase(); // Nessuno di questi valori dovrebbe poter cambiare a runtime quindi non serve ricalcolarli ogni volta
const myPid = String(process.pid);



// Funzioni

const formattedDate = function() {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let d = new Date();

    let dayName = days[d.getDay()];
    let monthName = months[d.getMonth()];
    let dayNumberPadded = ("00" + d.getDay().toString()).slice(-2);
    let year = d.getFullYear();

    return `${dayName} ${monthName} ${dayNumberPadded} ${year}`
}

const header = () => `${myUsername} Cart - ${myPid}\n${formattedDate()}`;

const frame = (sideChar, centralChar, lenght) => `${sideChar} ${centralChar.repeat(lenght-4)} ${sideChar}`

const formatProduct = function(product) {

    return `\t[${product.ean}]\t${product.name}\t\t${product.price}`

}




// Main

console.log(frame("+", "-", 54));

console.log(header());

console.log(frame("*", "-", 54));

for (let productEan of carts[0].products) {

    console.log(formatProduct(products.find(element => element.ean === productEan)));

}

console.log(frame("*", "-", 54));