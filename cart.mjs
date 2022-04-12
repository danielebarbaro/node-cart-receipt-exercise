import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());


for (let cartRow of carts) {// per tutti i carrelli fammi vedere la riga dei carrelli 
    console.log(' INIZIO DEL NODO')

     //console.log(?RIGA DEL CARRELLO DA STAMPARE', ittem, '\n')
     let prodottiUtente= cartRow.products;
     let UUIDCorrente = cartRow.user;
     let totaleOrdine = 0;
   

     let ean = '';
     let nomeProdotto = '';
     let prezzoProdotto ='';
     let rigaRicevuta = '';


     console.log('Utente corrente', UUIDCorrente, '\n')

     let user = core.getUser(UUIDCorrente);
     console.log('Utente completo: ', user, '\n');
     let nomeUtente = user.firstName + ' '+ user.lastName;
     let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);

    console.log(`${nomeUtente} ha IL CODICE PROMO  ${promoUtente}`)
    console.log(`${nomeUtente} ha ${rate} di sconto`)


     if (prodottiUtente.lenght < 1){
         console.log(`${nomeUtente} NON HA PRODOTI NEL CARRELLO.`)
     }
     if (disponibilitaUtente>0){
         console.log(`${nomeUtente} ha il portafoglio pieno.`)
         console.log ('Utente si chiama : ', nomeUtente, '\n');
         console.log('Utente ha disponibile: ', disponibilitaUtente, 'Euro \n')
        } else{
         console.log(`${nomeUtente} ha il portafoglio vuoto.`)
     }

     for(let item of prodottiUtente){
         let prodCorrente = core.getProduct(item);
         let ean = prodCorrente.ean;
         let nomeProdotto= prodCorrente.name;
         let prezzoProdotto= prodCorrente.price;
         console.log(`\t [${ean}] \t\t ${nomeProdotto} \t ${prezzoProdotto}`);
        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;
        }
        
        if (promoUtente !== ''
        && promoUtente !== undefined
        && promoUtente !== null){
            console.log(`\t CODICE PROMO: \t \t  ${promoUtente}`);
        let discountedPriceValue = core.discountedPrice(totaleOrdine, rate);
        console.log('discountedPriceValue', discountedPriceValue);  
       }


        if (disponibilitaUtente < totaleOrdine){
            console.log(`${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`)
        }

}