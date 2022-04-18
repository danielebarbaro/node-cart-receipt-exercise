import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; //estensione può essere mjs o js per aver facilità nell'importare i dati e le funzionalità
import { discountedPrice } from "./core-cart.mjs";




for (let cartRow of carts) { //in questo for viene indicato: quale utente appartiene questo carrello e quali prodotti ha comprato l'utente
    
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;
  
    let ean = ' ';
    let nomeProdotto = ' ';
    let prezzoProdotto = ' ';
    let rigaRicevuta = ' ';

    let user = core.getUser(UUIDCorrente);

    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    
    //intestazione ricevuta
    console.log('\n')
    const cornice = '-';
    console.log(`+ ${cornice.repeat(50)} +`)
    console.log(core.printShopName());

    //inserimento della data
    let  optionsData = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let day  = new Date();
    console.log(day.toLocaleString(`it-IT`, optionsData)); 
    console.log(`* ${cornice.repeat(50)} *`)
    
    //elenco prodotti utente 
    if(prodottiUtente < 1){
      
        console.log(`  ${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
        
    }
    for(let item of prodottiUtente){
        

        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = core.formatProductName(prodCorrente.name);
        let prezzoProdotto = prodCorrente.price;
        
        let rigaRicevuta =`   [${ean}]  ${nomeProdotto}   \t      ${prezzoProdotto.toFixed(2)}`
       
        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;   
    }

    //calcolo del totale ordine
    totaleOrdine += prezzoProdotto;
    console.log(`* ${cornice.repeat(50)} *`) 
    console.log(`   Totale:                     ${Number.parseFloat(totaleOrdine).toFixed(2)}`);
    console.log(`+ ${cornice.repeat(50)} +`)

    //calcolo dell'importo scontato e il totale scontato se presente
    let rate = core.getPercentageFromPromoCode(promoUtente);

    if(promoUtente !== '' 
       && promoUtente !== undefined
       && promoUtente !== null) {
        
            let discountedPrice = core.discountedPrice(totaleOrdine, rate)
            let discountedPriceValue = totaleOrdine - discountedPrice;
            
           
            console.log(`   Sconto:                     ${Number.parseFloat(discountedPriceValue).toFixed(2)} `);
            console.log(`   Totale Scontato:            ${discountedPrice}`);
            
            console.log(`\n\n   CODICE PROMO: \t ${promoUtente} `);
            console.log(`+ ${cornice.repeat(50)} +\n`)
        
        }
        
       
        console.log(`\n**${cornice.repeat(50)}**`)
        //calcolo inerente al credito residuo
        if(promoUtente !== '' 
       && promoUtente !== undefined
       && promoUtente !== null) {
      
  

        if(disponibilitaUtente < discountedPrice)
            console.log(`${nomeUtente} non ha abbastanza soldi per comprare.`)
        else{
            let prezzoScontato = core.discountedPrice(totaleOrdine, rate)
            let creditoResiduo = (disponibilitaUtente - prezzoScontato);
          
            console.log(`   ${nomeUtente}`,'ha un credito residuo di', Number.parseFloat(creditoResiduo).toFixed(2));
            }
        }
        else{
            if(disponibilitaUtente < totaleOrdine){
                console.log(` ${nomeUtente} non ha abbastanza soldi per comprare.`)
            }
            else{
                let creditoResiduo = (disponibilitaUtente - totaleOrdine);
                console.log(`   ${nomeUtente}`,'ha un credito residuo di', Number.parseFloat(creditoResiduo).toFixed(2)); 
            }    
}
//console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow, '\n')
console.log(`**${cornice.repeat(50)}**`)  
}
