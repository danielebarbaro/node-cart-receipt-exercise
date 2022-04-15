import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { separatore } from "./core-cart.mjs";
import { printShopName } from "./core-cart.mjs";
import { fstat } from "fs";


for (let cartRow of carts) {

    let cartUserUUID = cartRow.user;
    let today = new Date().toDateString();
    //let content = ``;
    //let filename = `receipts/${cartUserUUID}_receipt_${Date()}.txt`

    //fs.writeFileSync(filename, content);

    console.log('[INIZIO DEL NODO]')

    let products = cartRow.products;
    let totOrdine = 0;
    let user = core.getUser(cartUserUUID);
    let promoUtente = user.promo;
    let rate = core.getPercentageFromPromocode(promoUtente);
    let wallet = user.wallet;
    let nomeUtente = user.firstName +' '+ user.lastName;

    console.log(`${separatore('+',55)}`);
    console.log(`${printShopName()}`);
    console.log(today);
    console.log(`${separatore('*',55)}`);

    for (let currentProduct of products) {
        let prodotto = core.getProduct(currentProduct);
        console.log(`  [${prodotto.ean}]\t${core.formatProductName(prodotto.name)}\t\t ${prodotto.price} euro`)
        totOrdine += prodotto.price;
    }
    
    let discountedPriceValue = core.discountedPrice(totOrdine, rate);
    if(totOrdine !== 0){
    console.log(`${separatore('*',55)}`);
    console.log(`  TOTALE:\t\t\t ${(totOrdine).toFixed(2)} euro`);
    console.log(`${separatore('+',55)}`);
    }else{
        console.log(`  ${nomeUtente} non ha prodotti nel carrello`);
        console.log(`${separatore('+',55)}`);
    }

    if(promoUtente !== ''
        && promoUtente !== undefined
        && promoUtente !== null){
            console.log(`  CODICE PROMO: \t\t ${promoUtente}`)
          
            console.log(`  SCONTO:\t\t\t ${(totOrdine*rate).toFixed(2)} euro`);
            console.log(`  TOTALE SCONTATO:\t\t ${discountedPriceValue} euro`);
            console.log(`${separatore('+',55)}`);
        }
    let creditoResiduo = core.creditoResiduo(wallet, discountedPriceValue);
    if(creditoResiduo > 0){
    console.log(`\n${separatore('**',55)}`);
    console.log(`  ${nomeUtente} ha un credito residuo di ${creditoResiduo.toFixed(2)} euro`);
    console.log(`${separatore('**',55)}`);
    }else{
        console.log(`  ${nomeUtente} ha fondi insufficienti`);
        console.log(`${separatore('**',55)}`);
        console.log(`  ${nomeUtente} ha un credito residuo di ${wallet.toFixed(2)} euro`);
        console.log(`${separatore('**',55)}`);
    }
    console.log('[FINE DEL NODO]\n\n\n');
}