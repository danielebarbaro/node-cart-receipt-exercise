import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

//const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

function discountedPrice(price, rate = 0.10) {
    return (price * (1 - rate));
}

//const getUser = (uuid) => users.find(user => user.uuid === uuid);


/*function getUser(uuid) {
    let user = users.find(user => user.id === uuid);
}
*/

const getUser = function(uuid) { // ci serve per ottenere i dati dell' utente, se viene trovato un utente con quell' id, allora restituisce i dati utente, altrimenti restituisce undefined
    let user = users.find(user => uuid === user.uuid);
    return user;
}

// 3 modi diversi di scrivere la stessa funzione
// const getProduct = (productId) => products.find(product => product.id === product.ean); // arrow function

/*
function getProduct(productId) { //funzione dichiarativa
    let product = products.find(product => product.id === product.ean); 
    return product;
}
*/

const getProduct = function (productId){ // funzione anonima. getProduct serve a verificare che nell' elenco dei prodotti ci sia un prodotto con id uguale a quello passato come parametro. L' id nell' elenco dei prodotti si chiama ean
    return products.find(product => productId === product.ean);
}

/*
function getPercentageFromPromoCode (promoCode) {
    let rate = promoCode.find(promo => promoCode === item.promo);
    return rate;
}
*/

const getPercentageFromPromoCode = function (promoCodeName) {
    if (promoCodeName !== '' && // controlla se promoCodeName  esiste ma è vuota
    promoCodeName !== undefined && // controlla se promoCodeName non è undefined
    promoCodeName !== null) { // controlla se promoCodeName non è null
        
        let rate = promoCode.find(item => promoCodeName === item.name);
        return rate.percentage; // restituisce il valore del campo percentage come numero decimale es 0.10, se i 3 controlli precedenti sono veri
    }
    return 0; // restituisce 0 se uno dei controlli precedenti sono falsi
}



/*
const printShopName = () => {
    const { username } = os.userInfo();     // ottiene il nome utente della macchina
    return `${machineName.toUpperCase()} = cart ${pid}`;
} 
 
 
 

 const formatProductName = (product) => {                               //metodo che trasforma le stringhe in minuscolo e poi fa diventar maiuscolo il primo carattere (pos. 0)
    return product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1) // usa anche lo slice per copiare la stringa dalla pos. 1 in poi
 
 for (let item of products) {
    let formattedName ='';
    let productName = item.name

    let multiName = productName.split('');                             // divido la stringa in corrispondenza di un separatore che in questo caso è lo spazio tra le parole
    console.log('multiName',multiName);

    if(multiName.length < 1){
        for (let piece of multiName) {
            formattedName += `${format(piece)} `;
        }
    } else {
        formattedName = format(productName);
    }
    item.name = formattedName;

    cart.push(item)
   }
}

 const filterType = (products, type) => product;

 const sumCartItem = (products, type) => (products.reduce(current, prod) )
 current + (prod.type === type ? prod.price * (1 - rate) : (prod.price), 0);


 const formatProductList = (products) => (products);
 
 const printReceipt = (content, filename) => ``;

 const createDelimiter = (openClose, symbol, times);

 const getProductByCart = (products) => products;

 const getUserDiscount = () => 0;

 const receiptFileName = (uuid, date) => ``;
*/ 
      


export {
    discountedPrice,
    getPercentageFromPromoCode,
    getProduct,
    getUser /*
    helloworld,
    printShopName,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getProductByCart,
    getUserDiscount,
    receiptFileName,*/
};
// sarebbe più corretto scrivere tutti i metodi in questo file e importarli in cart.mjs, anche se si possono scrivere tutti in cart.mjs (per capire meglio)  
