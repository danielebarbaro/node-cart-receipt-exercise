import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; //estensione può essere mjs o js per aver facilità nell'importare i dati e le funzionalità
import { discountedPrice } from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());


for (let cartRow of carts) { //quale utente appartiene questo carrelo e quali prodotti ha comprato l'utente
    

    //console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow, '\n')
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;
    
    
    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';
    
    let user = core.getUser(UUIDCorrente);
    //  console.log('Utente completo',user, '\n');

    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    
    ///////////////////////   inizio scontrino     /////////////////////
    
    console.log('\n\n');
    console.log('+ ------------------------------------------------------ +');
    
    //intestazione scontrino
    console.log(core.printShopName());


    //data corrente
    var data = new Date();
    var set, gg, mm, aaaa;
    
    //Crea la tabella dei mesi
    var mesi = new Array();
    mesi[0] = "Jan";
    mesi[1] = "Feb";
    mesi[2] = "Mar";
    mesi[3] = "Apr";
    mesi[4] = "May";
    mesi[5] = "Jun";
    mesi[6] = "Jul";
    mesi[7] = "Aug";
    mesi[8] = "Sept";
    mesi[9] = "Oct";
    mesi[10] = "Nov";
    mesi[11] = "Dec";

    //Crea la tabella dei giorni della settimana
    var giorni = new Array();
    giorni[0] = "Sun";
    giorni[1] = "Mon";
    giorni[2] = "Tue";
    giorni[3] = "Wed";
    giorni[4] = "Thu";
    giorni[5] = "Fri";
    giorni[6] = "S";
    
    //Estrae dalla tabella il giorno della settimana
    set = giorni[data.getDay()] + " ";
    gg = data.getDate() + " ";

    //Estrae dalla tabella il mese
    mm = mesi[data.getMonth()] + " ";
    aaaa = data.getFullYear();
    console.log(set + gg + mm + aaaa);
    


    console.log('* ------------------------------------------------------ *');
    
    //lista di prodotti
    if(prodottiUtente.lenght < 1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
    }
    
    for(let item of prodottiUtente){
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = prodCorrente.name;
        let prezzoProdotto = prodCorrente.price;
        let rigaRicevuta = ` \t [${ean}] \t ${nomeProdotto} \t ${prezzoProdotto}`
        
        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;
    }
    
    console.log('* ------------------------------------------------------ *');
    
    //totale ordine
    totaleOrdine += prezzoProdotto;
    console.log('\t', 'Totale: ', '\t\t\t', Number.parseFloat(totaleOrdine).toFixed(2));
    
    console.log('+ ------------------------------------------------------ +');
    
    //sconto + totale scontato + codice promo
    
    let rate = core.getPercentageFromPromoCode(promoUtente);


    if(promoUtente !== '' 
       && promoUtente !== undefined
       && promoUtente !== null) {
        let discountedPrice = core.discountedPrice(totaleOrdine, rate)
        let discountedPriceValue = totaleOrdine - discountedPrice;

        console.log('\tSconto: ', '\t\t\t', Number.parseFloat(discountedPriceValue).toFixed(2));
        console.log('\tTotale Scontato: ', '\t\t', discountedPrice);
        console.log('\n');
        console.log(`\t CODICE PROMO: \t\t ${promoUtente}  `);
        
    }
    
    console.log('+ ------------------------------------------------------ + \n');
    console.log('** ------------------------------------------------------ **');
    
    //credito residuo oppure soldi insufficienti
    if(promoUtente !== '' 
        && promoUtente !== undefined
        && promoUtente !== null){
            if(disponibilitaUtente < discountedPrice)
                console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`)
            else{
                let prezzoScontato = core.discountedPrice(totaleOrdine, rate)
                let creditoResiduo = (disponibilitaUtente - prezzoScontato);
                console.log('\t',nomeUtente, 'ha un credito residuo di', Number.parseFloat(creditoResiduo).toFixed(2));
            }
        }
    else{
        if(disponibilitaUtente < totaleOrdine){
                console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`)
            }
            else{
                let creditoResiduo = (disponibilitaUtente - totaleOrdine);
                console.log('\t',nomeUtente, 'ha un credito residuo di', Number.parseFloat(creditoResiduo).toFixed(2));
            }
    }
    
    
    console.log('** ------------------------------------------------------ ** \n');
    console.log('\n\n');
    ///////////////////////   fine scontrino     /////////////////////
    

}