import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));*/
let scontrino = '';

for (let cartRow of carts) { 
    
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;
   

    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';

    console.log('Utente corrente', UUIDCorrente, '\n');
    console.log('Prodotti utente corrente',prodottiUtente, '\n');

    let user = core.getUser(UUIDCorrente);
    
    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);
   
    console.log(`${nomeUtente} ha ${rate} di sconto`);
    


    if(prodottiUtente.lenght < 1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`);
    }


    if(disponibilitaUtente > 0){
        console.log('Utente si chiama',nomeUtente, '\n');
        console.log('Utente ha disponibilità',disponibilitaUtente, 'Euro \n');

    }else{
        console.log(`${nomeUtente} ha il portafoglio VUOTO `);
    }

    for(let item of prodottiUtente){
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = prodCorrente.name;
        let prezzoProdotto = prodCorrente.price;
        let rigaRicevuta = ` \t [${ean}] \t ${nomeProdotto} \t ${prezzoProdotto}`;

        console.log(rigaRicevuta,'\n');
        totaleOrdine += prezzoProdotto;
    }

    if(promoUtente === '' 
       && promoUtente !== undefined
       && promoUtente === null) {
        console.log(`\t CODICE PROMO: \t\t ${promoUtente}  `);
        let discountedPrice = core.discountedPrice(totaleOrdine, rate);
        console.log('discountPriceValue ',discountedPriceValue);
    }

    if(disponibilitaUtente < totaleOrdine){
        console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`);
    }
   
}
