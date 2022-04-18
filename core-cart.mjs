import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

/*
const getUser = (uuid) => users.find(user => user.uuid === uuid); // metodo scritto come arrow function.

function getUser(uuid) {                                         // metodo scritto nel vecchio modo (dichiarativo)
    let user = users.find(user => user.id === uuid);
    return user;
}
*/
const getUser = function(uuid) {                                // Metodo scritto in modo anonimo.serve per ottenere i dati dell' utente, se viene trovato un utente con quell'id,
    let user = users.find(user => uuid === user.uuid);          // allora restituisce i dati utente, altrimenti restituisce undefined
    return user;
}

// 3 modi diversi di scrivere la stessa funzione, come fatto sopra con getUser.
// const getProduct = (productId) => products.find(product => product.id === product.ean); // arrow function

/*
function getProduct(productId) { //funzione dichiarativa
    let product = products.find(product => product.id === product.ean); 
    return product;
}
*/

const getProduct = function (ean) {                               // funzione anonima. getProduct serve a verificare che nell' elenco dei prodotti ci sia un prodotto con id  
    let product = products.find(product => ean === product.ean);  // uguale a quello passato come parametro. L' id nell' elenco dei prodotti si chiama ean
    return product;
}


const getPercentageFromPromoCode = function (promoCodeName) {
    if (promoCodeName !== '' &&                                 // controlla se promoCodeName esiste ma è vuota
    promoCodeName !== undefined &&                              // controlla se promoCodeName non è undefined
    promoCodeName !== null) {                                   // controlla se promoCodeName non è null
        
        let sconto = promoCode.find(item => promoCodeName === item.name);
        return sconto.percentage;           // restituisce il valore del campo percentage come numero decimale es 0.10, se i 3 controlli precedenti sono veri
    }
    return 0;                               // restituisce 0 se uno dei controlli precedenti sono falsi
}


const maiuscoloNome = function(stringa) {
    return`${stringa[0].toUpperCase()}${stringa.substring(1).toLowerCase()}`      // metodo che trasforma le stringhe in minuscolo e poi fa diventar maiuscolo il primo carattere (in pos. 0)
}                                                                                 // Contributo da: Marcello Borio

const maiuscoloParole = function(stringa) {
    let nuovaStringa=[];
    stringa.split(` `).forEach(parola => nuovaStringa.push(maiuscoloNome(parola))); // split divide la stringa in corrispondenza di un separatore che in questo caso è lo spazio tra le parole
    return nuovaStringa.join(` `);                                                 // join unisce le parole in una stringa. Contributo da: Marcello Borio
}

const printShopName = () => {
    const {username} = os.userInfo();     // ottiene il nome utente della macchina
    return `${username.toUpperCase()} - cart ${process.pid}`;
} 
 

export {
    discountedPrice,
    getPercentageFromPromoCode,
    getProduct,
    getUser,
    maiuscoloNome,
    maiuscoloParole, 
    printShopName,
};
// sarebbe più corretto scrivere tutti i metodi in questo file e importarli in cart.mjs
