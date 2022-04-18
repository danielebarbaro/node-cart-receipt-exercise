import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { formatProductName } from "./core-cart.mjs";

for (let cartRow of carts) {// per tutti i carrelli fammi vedere la riga dei carrelli 

     //console.log(?RIGA DEL CARRELLO DA STAMPARE', ittem, '\n')
     let prodottiUtente= cartRow.products;
     let UUIDCorrente = cartRow.user;
     let totaleOrdine = 0;

     let ean = '';
     let nomeProdotto = '';
     let prezzoProdotto ='';
     let rigaRicevuta = '';

    let user = core.getUser(UUIDCorrente);
    
    let nomeUtente = user.firstName + ' '+ user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);

//CORNICETTA funzione presa da qui: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
    const cornicetta ='-';
    console.log(`+ ${cornicetta.repeat(50)} + \n`);

    //SHOPNAME
    console.log(core.printShopName(),`\n`);

    //DATA funzione presa da qui: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    let formatoData = {weekday: 'short', year: 'numeric',month: 'short', day:'numeric'};
    let day = new Date();
    console.log(day.toLocaleDateString(`it-IT`, formatoData),`\n`);
    
    //CORNICETTA*
    console.log(`* ${cornicetta.repeat(50)} *\n `);

      if (prodottiUtente.lenght == 0){
         console.log(`${nomeUtente} NON HA PRODOTI NEL CARRELLO.`)
     }
    
     for(let item of prodottiUtente){
         let prodCorrente = core.getProduct(item);
         let ean = prodCorrente.ean;
         let nomeProdotto= core.formatProductName(prodCorrente.name);
         let prezzoProdotto= prodCorrente.price;

         console.log(`   [${ean}] \t ${nomeProdotto} \t\t ${Number.parseFloat(prezzoProdotto).toFixed(2)} €`);
        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;
        }
       
        //TOTALE
        console.log(`* ${cornicetta.repeat(50)} * \n`)
        totaleOrdine += prezzoProdotto
        console.log(`Totale: \t\t\t\t ${Number.parseFloat(totaleOrdine).toFixed(2)}`)
        console.log(`\n+ ${cornicetta.repeat(50)} + `); 
        
        //SCONTO
        let sconto= core.getPercentageFromPromoCode(promoUtente)*totaleOrdine;
        console.log(`\nSconto : \t\t\t\t ${Number.parseFloat(sconto).toFixed(2)}`);

        let totaleScontato = core.discountedPrice(totaleOrdine, rate);
        
        if (promoUtente !== ''
        && promoUtente !== undefined
        && promoUtente !== null){
        //TOTALE SCONTATO
        console.log(`\nTotale scontato : \t\t\t`, totaleScontato); 
      
        //CODICE PROMO
        console.log(`\n\nCODICE PROMO: \t \t  ${promoUtente}`);

        
       }
       //CORNICETTE
       console.log(`+ ${cornicetta.repeat(50)} + `); 
       console.log(`\n\n\n** ${cornicetta.repeat(50)} ** \n`);

      // CREDITO RESIDUO SIA NEL CASO DI PROMO CHE SENZA 
    let residuo = disponibilitaUtente - totaleScontato;

    if (promoUtente !== ''
    && promoUtente !== undefined
    && promoUtente !== null)
            if(disponibilitaUtente< totaleScontato){
                console.log(`${nomeUtente} ha un credito insufficiente` )
            }
            else 
                console.log(`${nomeUtente} ha un credito residuo di ${Number.parseFloat(residuo).toFixed(2)}`)
        else{
            if(disponibilitaUtente < totaleOrdine)
            console.log(`${nomeUtente} ha un credito insufficiente`)

            else
                console.log(`${nomeUtente} ha un credito residuo di ${Number.parseFloat(residuo).toFixed(2)}`)
        }

    //CORNICETTA FINE SCONTRINO
        console.log(`\n** ${cornicetta.repeat(50)} ** \n\n`);
       


}

