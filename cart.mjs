import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
/*
console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);
*/
//console.log('SHOP NAME', core.printShopName());

for (let cartRow of carts) {
    const {user: cartUserUUID, products} = cartRow;
    const user = core.getUser(uuid);
    const {uuid, firstName, lastName, wallet, isTeacher, promo} = user;

    //console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow)
    //console.log('UUID', uuid)
    //console.log('Prodotti', products)
    //console.log('User complete', user);

 // trovare uno user dato il carrello


 // capire se l' utente può comprare

 // capire se l' utente ha delle promo



    // genera ricevuta
}