import {carts, products, promoCode, users} from "./dataset.mjs"; // i dati sono presenti in dataset.mjs
import * as core from "./core-cart.mjs";                        // i metodi e ciò che è presente in core-cart.mjs può essere richiamato in cart.mjs scrivendo "core" prima del nome 
                                                               // della cosa da richiamare. Un po' come "ereditarli" da un' altra classe

import fs from 'fs';
var dir = './receipts';
if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

for (let cartRow of carts) {    
    // of vuol dire "fammi vedere l' oggetto del carrello". Se andiamo a vedere il file dataset vediamo che ogni cart contiene id utente  
    // e prodotti. questo for cicla i carrelli e stampa quelle proprietà cartRow si riferisce alla riga del carrello che stiamo ciclando (nell' insieme dei carts)
                              
    
    let user = core.getUser(cartRow.user);
    let uuid = user.uuid;
    let nome = user.firstName;
    let cognome = user.lastName;
    let prodottiUtente = cartRow.products;
    let promo = user.promo;
    let sconto = core.getPercentageFromPromoCode(promo);
    let scontoEffettivo;
    let totaleScontato;
    let residuo;
    let ricevuta = '';

    
    

    if(prodottiUtente.length > 0 ) {               // se il carrello dell' utente ha prodotti, può acquistare. il .length abbinato ad un array (come prodottiUtente 
        let totale = 0;                            // ritorna il numero di righe contenute in un array. I prodotti nel carrello erano tra []. una riga = 1 prodotto.
        let portafoglio=user.wallet;

        for (let oggetti of prodottiUtente) {
            let oggetto = core.getProduct(oggetti);
            let prezzo = oggetto.price;
            totale = prezzo + totale;
        }
        scontoEffettivo = sconto * totale;
        totaleScontato = totale - scontoEffettivo;
        residuo = portafoglio - totaleScontato;
    

        if((portafoglio + scontoEffettivo) > totale) {                    // inizia stampa scontrino se il portafoglio dell' utente, al netto degli sconti, è maggiore del totale
        
        var today = new Date();                                                             // crea un oggetto tipo Date
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }; // imposta le opzioni per la stampa della data
        const dataOggi = `${today.toLocaleDateString("it-IT", options)}`;                   // converti in stringa la data, in formato italiano gg mm aaaa       
        const currentTime = `${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`; // stringa con l' ora attuale, hh-mm-ss da usare nel nome file
        
        
        // per fare i +---------+ e *----------* contributo da: Marcello Borio
        const delimitatore = '-';
            ricevuta += `+${delimitatore.repeat(50)}+\n`
            ricevuta += `${core.printShopName()}\n`;
            ricevuta += `${dataOggi}\n`;
            ricevuta += `*${delimitatore.repeat(50)}*\n`;

            // per stampare prezzo, codice e nome prodotto
            for(let a of prodottiUtente) {
                let oggetto = core.getProduct(a);
                let prezzo = oggetto.price;    
                let codice = oggetto.ean;
                let nomeOggetto = oggetto.name;    
       
                ricevuta += (`${codice}\t${core.maiuscoloParole(nomeOggetto)}\t${prezzo.toFixed(2)}`);
                ricevuta += `\n`
            }    

            // stampa il totale, incorniciato coi delimitatori
            ricevuta += `*${delimitatore.repeat(50)}*\n`;
            ricevuta += `Totale: ${totale.toFixed(2)}\n`;
            ricevuta += `+${delimitatore.repeat(50)}+\n`;

            
            // per stampare lo sconto, se presente, e il credito residuo
            if (sconto !==0 ){
                ricevuta += `Sconto: ${scontoEffettivo.toFixed(2)}\n`;
                ricevuta += `Totale scontato: ${totaleScontato.toFixed(2)}\n`;
                ricevuta += ` \n`;
                ricevuta += `Codice Promo: ${promo}\n`;
                ricevuta += `**${delimitatore.repeat(50)}**\n`;
                ricevuta += `${nome} ${cognome} ha un credito residuo ${residuo.toFixed(2)}\n`;
            }
            else // se non c'è sconto, stampa solo il credito residuo
            {
                let residuo = portafoglio - totale;
                ricevuta += `${nome} ${cognome} ha un credito residuo ${residuo.toFixed(2)}\n`;
            }

            ricevuta += ``;
            ricevuta += `**${delimitatore.repeat(50)}**\n`;

            fs.writeFileSync(`./receipts/${uuid}_receipt_${dataOggi}_${currentTime}.txt`,ricevuta);
        }              

    } 
    console.log(ricevuta);
}
    