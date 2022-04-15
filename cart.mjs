import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { discountedPrice } from "./core-cart.mjs";
import { getPercentageFromPromocode } from "./core-cart.mjs";
import { separatore } from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());

for (let cartRow of carts) {
    
    console.log('[INIZIO DEL NODO]')

    let cartUserUUID = cartRow.user;
    let products = cartRow.products;
    let totOrdine = 0;
    let user = core.getUser(cartUserUUID);
    let promoUtente = user.promo;
    let rate = core.getPercentageFromPromocode(promoUtente);
    let ean = '';
    let nomeProdotto = '';
    let wallet = user.wallet;
    let nomeUtente = user.firstName +' '+ user.lastName;
   

    console.log(`${separatore('*',55)}`);
    for (let currentProduct of products) {
        let prodotto = core.getProduct(currentProduct);
        console.log(`  [${prodotto.ean}]\t${core.formatProductName(prodotto.name)}\t\t${prodotto.price} euro`)
        totOrdine += prodotto.price;
    }
    
    let discountedPriceValue = core.discountedPrice(totOrdine, rate);
    if(totOrdine !== 0){
    console.log(`${separatore('*',55)}`);
    console.log(`  TOTALE:\t\t\t${(totOrdine).toFixed(2)} euro`);
    console.log(`${separatore('+',55)}`);
    }else{
        console.log(`${nomeUtente} non ha prodotti nel carrello`);
    }

    if(promoUtente !== ''
        && promoUtente !== undefined
        && promoUtente !== null){
            console.log(`  CODICE PROMO: \t\t ${promoUtente}`)
          
            console.log(`  SCONTO:\t\t\t  ${(totOrdine*rate).toFixed(2)} euro`);
            console.log(`  TOTALE SCONTATO:\t\t${discountedPriceValue} euro`);
            console.log(`${separatore('+',55)}`);
        }
    let creditoResiduo = core.creditoResiduo(wallet, discountedPriceValue);
    if(creditoResiduo > 0){
    
    console.log(`\n${separatore('**',55)}`);
    console.log(`  ${nomeUtente} ha un credito residuo di ${creditoResiduo.toFixed(2)} euro`);
    console.log(`${separatore('**',55)}`);
    }else{
        console.log(`  ${nomeUtente} NON HA ABBASTANZA SOLDI PER ACQUISTARE.`);
        console.log(`${separatore('**',55)}`);
    }
    console.log('[FINE DEL NODO]\n\n\n');
}