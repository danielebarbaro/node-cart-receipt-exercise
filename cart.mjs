import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { discountedPrice } from "./core-cart.mjs";
import { getPercentageFromPromocode } from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());

for (let cartRow of carts) {
    

    console.log('\t\tINIZIO DEL NODO')

    //const {user:cartUserUUID, products} = cartRow;
    let cartUserUUID = cartRow.user;
    let products = cartRow.products;
    let totOrdine = 0;
    let user = core.getUser(cartUserUUID);
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromocode(promoUtente);

    let ean = '';
    let nomeProdotto = '';
   
    
    //const {uuid, firstName, lastName, wallet, isTeacher, promo} = user;
    const wallet = user.wallet;
    const name = user.firstName;
    const surname = user.lastName;

    if(products.lenght > 0){
        console.log(`${name} ${surname} vorrebbe comprare `, products);
    }
    else if(products.lenght = 0){
        console.log(`${name} ${surname} ha il carrello vuoto`);
        }
    if(wallet > 0){
        console.log(`${name} ${surname} ha ${wallet} euro`);
    }
    //products.forEach(product => {
    for (let currentProduct of products) {
        //console.log('Voglio estrarre', currentProduct);
        let prodotto = core.getProduct(currentProduct);
        console.log(`\t[${prodotto.ean}]\t${prodotto.name}\t\t${prodotto.price}`)
        totOrdine += prodotto.price;
        //console.log('Prodotto estratto con nome:', prodotto.price);
    }

    if(promoUtente !== ''
        && promoUtente !== undefined
        && promoUtente !== null){
            console.log(`\t CODICE PROMO: \t\t ${promoUtente}`)
            let discountedPriceValue = core.discountedPrice(totOrdine, rate);
            console.log(`PRODOTTO SCONTATO\t\t`, discountedPriceValue)
        }

    if(wallet < discountedPrice){
        console.log(`${discounteredPrice(totOrdine,getPercentageFromPromocode(promoCode.name))}`)
    }
    
    console.log('\t\tFINE DEL NODO\n\n')
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