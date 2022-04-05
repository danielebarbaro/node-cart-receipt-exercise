import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());

for (let cartRow of carts) {
    console.log(' INIZIO DEL NODO')

    //const {user:cartUserUUID, products} = cartRow;
    let cartUserUUID = cartRow.user;
    let products = cartRow.products;

    const user = core.getUser(cartUserUUID);

    //const {uuid, firstName, lastName, wallet, isTeacher, promo} = user;
    const wallet = user.wallet;
    const name = user.firstName;
    const surname = user.lastName;

    console.log(`${name} ${surname} ha un wallet di ${wallet} euro`);
    console.log(`${name} ${surname} vorrebbe comprare `, products);

    //products.forEach(product => {
    for (let currentProduct of products) {
        console.log('Voglio estrarre', currentProduct);
        let prodotto = core.getProduct(currentProduct);
        console.log(`[${prodotto.ean}] ${prodotto.name} ${prodotto.price}`)
        //console.log('Prodotto estratto con nome:', prodotto.price);
    }
    console.log(' FINE DEL NODO')
    //})

    // console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow)
    // console.log('UUID', uuid)
    // console.log('Prodotti', products)
    // console.log('User completo', user);

    //trovare uno user dato il carrello


    // capire se l'utente può comprare

    // capire se l'utente ha delle promo

    //...

    // genera ricevuta
}