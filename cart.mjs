import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));*/

for (let cartRow of carts) { 
    
    
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;
    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';
    let delimeter ='';

    if(prodottiUtente < 1){
        continue;
    } else {

    delimeter = core.createDelimiter('+','-',60);
    console.log(delimeter);

    let intestazione = core.printShopName();
    console.log(intestazione);

    core.data();

    delimeter = core.createDelimiter('*','-',60);
    console.log(delimeter);
    
    let user = core.getUser(UUIDCorrente);
    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;
    let rate = core.getPercentageFromPromoCode(promoUtente);
    let nomePromo = core.getNameFromPromoCode(promoUtente);

    if(prodottiUtente < 1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`);
    } else{
        for(let item of prodottiUtente){
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = prodCorrente.name;
        let prezzoProdotto = prodCorrente.price;
        let rigaRicevuta = `\t[${ean}]\t ${nomeProdotto}\t${prezzoProdotto}`;

        console.log(rigaRicevuta,'\n');
        totaleOrdine += prezzoProdotto;
    }}

    

    delimeter = core.createDelimiter('*','-',60);
    console.log(delimeter);

    let sconto;
    let totaleOrdineScontato;

    if(nomePromo === null || nomePromo === ''){
        sconto = totaleOrdine * 0;
    } else{
        sconto = totaleOrdine * rate;
    }
    
    totaleOrdineScontato = totaleOrdine - sconto;

    console.log(`Totale: ${totaleOrdine.toFixed(2)}`);
    
    delimeter = core.createDelimiter('+','-',60);
    console.log(delimeter);
    
    console.log(`Sconto: ${sconto.toFixed(2)}`);
    console.log(`Totale scontato: ${totaleOrdineScontato.toFixed(2)}\n`);
    
    if(nomePromo == 'SPRING' || nomePromo == 'PROMO-10'){
        console.log(`Codice PROMO: ${nomePromo}`);
    } 

   

    delimeter = core.createDelimiter('+','-',60);
    console.log(delimeter);

    console.log('\n');

    delimeter = core.createDelimiter('**','-',60);
    console.log(delimeter);

    if(disponibilitaUtente < totaleOrdineScontato){
        console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`);
        continue;
    }

    let disponibilitaRimanente = 0;

    disponibilitaRimanente = disponibilitaUtente - totaleOrdineScontato;


    if(disponibilitaUtente > 0)
    {
        console.log(`${nomeUtente} ha un credito residuo di ${disponibilitaRimanente.toFixed(2)} euro \n`);

    }else{
        console.log(`${nomeUtente} ha il portafoglio VUOTO `);
    }

    delimeter = core.createDelimiter('**','-',60);
    console.log(delimeter);

    console.log('\n\n');

    }



    
 
}
