import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; 
import { printShopName } from "./core-cart.mjs";
import { discountedPrice } from "./core-cart.mjs";

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
    let del1=`+`
    let del2=`*`
    let del3=`**`
    
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
   
    console.log(core.righe(del1))

 //STAMPA SE IL CARRELLO NON HA PRODOTTI
    if(prodottiUtente<1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
        console.log(core.righe(del2))
    }

    else{

    //INTESTAZIONE SCONTRINO
    console.log(core.printShopName())        
    console.log(core.heading())
    console.log(core.righe(del1))
    //NOME UTENTE
    console.log(`${nomeUtente}\nDisponibilità: ${disponibilitaUtente}`)
    console.log(core.righe(del2))

    //STAMPATORE DI PRODOTTI PER IL CARRELLO DI UN UTENTE
    for(let prodotto of prodottiUtente){

        //RINOMINA VARIABILI PER OGNI PRODOTTO
        let prodottoCorrente = core.getProduct(prodotto);
        let codiceProdotto = prodottoCorrente.ean;
        let nomeProdotto =  core.formatCart(prodottoCorrente);
        let prezzoProdotto = prodottoCorrente.price;
        let rigaRicevuta = `\t [${codiceProdotto}]\t\t${nomeProdotto}\t ${prezzoProdotto}`

        //STAMPA PRODOTTO
        console.log(rigaRicevuta)

        //SOMMA PREZZO TOTALE CARRELLO
        totaleOrdine += prezzoProdotto
    }

    console.log(core.righe(del2))

    //STAMPA PREZZO TOTALE CARRELLO
    console.log(`Totale:\t\t\t\t\t\t${totaleOrdine.toFixed(2)}`);
    console.log(core.righe(del1))


        //STAMPA CODICE PROMO E PREZZO TOTALE CARRELLO SCONTATO
        if(promoUtente != '' && promoUtente != undefined && promoUtente != null) {

            let rate = core.getPercentageFromPromoCode(promoUtente);
            let discountedPrice = core.discountedPrice(totaleOrdine, rate)
            let sconto = totaleOrdine-discountedPrice;
    
            console.log('Sconto: \t\t\t\t\t',sconto.toFixed(2));
            console.log('Totale scontato: \t\t\t\t',discountedPrice);

            console.log(`CODICE PROMO: \t\t\t\t\t${promoUtente}  `);
            console.log(core.righe(del1))
    }

    //STAMPA AVVISO SE FONDI INSUFFICENTI
    let residuo= disponibilitaUtente-totaleOrdine;
    let residuoPromo= disponibilitaUtente-discountedPrice;
    let sconto = totaleOrdine-discountedPrice;

    console.log('\n')
    console.log(core.righe(del3))

    if(user.promo!=undefined && user.promo!='' && user.promo!= null)
        if(disponibilitaUtente<sconto){
            console.log(nomeUtente,'ha un credito insufficiente per l\'acquisto')
        }
        else 
            console.log(`${nomeUtente} ha un credito residuo di ${residuoPromo.toFixed(2)}`)
    else{
        if(disponibilitaUtente<totaleOrdine)
            console.log(nomeUtente,'ha un credito insufficiente per l\'acquisto')
        else
            console.log(`${nomeUtente} ha un credito residuo di ${residuo.toFixed(2)}`)
    }
    console.log(core.righe(del3))
}

console.log('\n\n');
}
