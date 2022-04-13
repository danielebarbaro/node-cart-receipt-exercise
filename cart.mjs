import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";    /*In questo file tutte le funzioni le chiamiamo core*/

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);*/

/*console.log('Discount', core.discountedPrice(100, 0.2));*/

for (let item of carts) {

    /*console.log("INIZIO DEL NODO");*/

    /*console.log("RIGA DEL CARRELO DA STAMPARE", cartRow, "\n");*/

    let prodottiUtente = item.products;
    let UUIDCorrente = item.user;
    let totaleOrdine = 0;

    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto = '';

    /*console.log("Utente corrente", UUIDCorrente, "\n");
    console.log("Prodotti utente corrente", prodottiUtente, "\n");*/

    let user = core.getUser(UUIDCorrente);

    console.log("Utente completo: ", user, "\n");

    let nomeUtente = `${user.firstName} ${user.lastName}`;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);
    
    if(prodottiUtente.length < 1)
    {
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO`)
    }

    if(disponibilitaUtente > 0)
    {
        /*console.log(`${nomeUtente} ha il portafoglio pieno\n`)*/
        console.log("Utente si chiama: ", nomeUtente, "\n");
        console.log("Utente ha disponibilità: ", disponibilitaUtente, " euro\n");
    }
    else
    {
        console.log(`${nomeUtente} ha il portafoglio vuoto`);
    }

    for(let item of prodottiUtente)
    {
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = prodCorrente.name;
        let prezzoProdotto = prodCorrente.price;
        let rigaRicevuta = `\t [${ean}] \t\t ${nomeProdotto} \t\t\t ${prezzoProdotto}`;

        console.log(rigaRicevuta, "\n");

        totaleOrdine += prezzoProdotto;
    }

    if(promoUtente !== '' && promoUtente !== undefined && promoUtente !== null)
    {
        console.log(`\t CODICE PROMO: \t\t ${promoUtente}`);

        let discountedPriceValue = core.discountedPrice(totaleOrdine, rate);

        console.log(`discountedPriceValue`, discountedPriceValue);
    }

    if(disponibilitaUtente < totaleOrdine)
    {
        console.log(`${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE`);
    }

    /*Fare la somma*/
}