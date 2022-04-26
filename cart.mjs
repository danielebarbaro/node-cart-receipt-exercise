import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; 

//STAMPATORE DI RICEVUTE PER UTENTI
for (let cartRow of carts) { 
    
    //RINOMINA VARIABILI PER IL CARRELLO DI UN UTENTE
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let user = core.getUser(UUIDCorrente);
    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    //PREPARA VARIABILI PER IL CARRELLO DI UN UTENTE
    let totaleOrdine = 0;
    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';
    
    /*
    console.log('Utente corrente', UUIDCorrente, '\n')
    console.log('Prodotti utente corrente',prodottiUtente, '\n')
    console.log(`${nomeUtente} ha ${rate} di sconto`)

    //STAMPA PORTAFOGLIO UTENTE
    if(disponibilitaUtente > 0){
        console.log('Utente si chiama',nomeUtente, '\n');
        console.log('Utente ha disponibilità',disponibilitaUtente, 'Euro \n');

    //STAMPA AVVISO SE FONDO = 0
    }else{
        console.log(`${nomeUtente} ha il portafoglio VUOTO `)
    }
    */
    core.printShopName
    console.log('+ -------------------------------------------------- +');
    console.log(core.heading);
    console.log('* -------------------------------------------------- *');
    //STAMPA SE IL CARRELLO NON HA PRODOTTI
    if(prodottiUtente<1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
    }

    else{
    //STAMPATORE DI PRODOTTI PER IL CARRELLO DI UN UTENTE
    for(let prodotto of prodottiUtente){

        //RINOMINA VARIABILI PER OGNI PRODOTTO
        let prodottoCorrente = core.getProduct(prodotto);
        let codiceProdotto = prodottoCorrente.ean;
        let nomeProdotto = prodottoCorrente.name;
        let prezzoProdotto = prodottoCorrente.price;
        let rigaRicevuta = ` \t [${codiceProdotto}] \t ${nomeProdotto} \t ${prezzoProdotto}`

        //STAMPA PRODOTTO
        console.log(rigaRicevuta,'\n')

        //SOMMA PREZZO TOTALE CARRELLO
        totaleOrdine += prezzoProdotto
    }


    console.log('* -------------------------------------------------- *');
    //STAMPA PREZZO TOTALE CARRELLO
    console.log("Totale: "+totaleOrdine.toFixed(2));
    }

    console.log('* -------------------------------------------------- *');
    //STAMPA CODICE PROMO E PREZZO TOTALE CARRELLO SCONTATO
    if(promoUtente != '' 
       && promoUtente != undefined
       && promoUtente != null) {

        let rate = core.getPercentageFromPromoCode(promoUtente);
        let discountedPrice = core.discountedPrice(totaleOrdine, rate)
        let sconto = totaleOrdine-discountedPrice;

        console.log('Sconto: ',sconto.toFixed(2));
        console.log('Totale scontato: ',discountedPrice);
        console.log('');
        console.log(`CODICE PROMO: \t\t ${promoUtente}  `);
    }
    else{
        console.log('');
    }

    console.log('* -------------------------------------------------- *');
    console.log('');
    console.log('* -------------------------------------------------- *');

    //STAMPA AVVISO SE FONDI INSUFFICENTI
    if(disponibilitaUtente < totaleOrdine){
    console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`)
    }

    else{
        let creditoResiduo = disponibilitaUtente - totaleOrdine;
        console.log(` ${nomeUtente} ha un credito residuo di ${creditoResiduo.toFixed(2)}`);
    }

    console.log('* -------------------------------------------------- *');

    console.log("");console.log("");console.log("");console.log("");
}