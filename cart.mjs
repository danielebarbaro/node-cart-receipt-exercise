
import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import * as fs from "fs";
/*receipt +=('Promo', promoCode);
receipt +=('Products', products);
receipt +=('Users', users);
receipt +=('Cart', carts);*/

//receipt +=('Discount', core.discountedPrice(100, 0.2));
//receipt +=(core.calculateDiscountedPrice(100,0.2));

let receipt = ''
//per ogni carts fammi vedere cartRow, per ogni carrello voglio uno scontrino
for(let item of carts){
    

    //receipt +=('Riga del carrello da stampare', item, '\n')
    let prodottiUtente = item.products;
    let UUIDCorrente = item.user;
    let creditoResiduo = 0;
    let totOrdine = 0;
    
    let user = core.getUser(UUIDCorrente)
    let promoUtente = user.promo
    let rate = core.getPercentFromPromocode(promoUtente)
    let nomeUtente = user.firstName  +' '+ user.lastName;
    let disponibilitaUtente = user.wallet;
    
    receipt=''


    // inizio
    
        receipt +=core.divisorio('+',55) + '\n'
        receipt += core.printShopName() + '\n'
        receipt += core.formatData() + '\n'
       
    
    

        if (prodottiUtente.lenght<1){
            receipt +=nomeUtente + 'ha il carrello vuoto'

        }   
        
        receipt +=core.divisorio('*',55)+'\n';
    
        for(let item of prodottiUtente){
            let prodCorrente= core.getProduct(item)
            let ean = prodCorrente.ean;
            let nomeProdotto = prodCorrente.name;
            let prezzoProdotto = prodCorrente.price;
            let rigaRicevuta = `\t[${ean}]\t${core.formatProductName(nomeProdotto)}\t${prezzoProdotto}`
            totOrdine +=  prezzoProdotto;
            receipt += rigaRicevuta +'\n'
    }   
    receipt +=core.divisorio('*',55)+'\n';
        receipt += '\tTotale Ordine:\t\t' +  totOrdine.toFixed(2) + '\n'
    receipt += core.divisorio('+',55) + '\n';
    if(promoUtente !== '' && promoUtente !== undefined && promoUtente !== null){
           
            receipt +=`\tSconto:\t ${(totOrdine*rate).toFixed(2)}\n`
            let discountetPriceValue = core.discountedPrice(totOrdine, rate)
            receipt +=`\tProdotto Scontato:\t ${discountetPriceValue}\n`
            creditoResiduo = disponibilitaUtente - discountetPriceValue
            receipt +=`\n\tCodice Promo:\t ${promoUtente}\n`
            
    } else{
           creditoResiduo = disponibilitaUtente - totOrdine;
        }
        receipt += core.divisorio('+',55)+'\n';
        receipt += core.divisorio('**',55)+'\n';
        if(creditoResiduo>=0){
            receipt += `\t${nomeUtente} ha un credito residuo di ${creditoResiduo.toFixed(2)}\n`
    
        receipt += core.divisorio('**',55,)+'\n\n'
        
    //$UserUUID_receipt_$DATAORAGENERAZIONE.txt
    let path =process.cwd()+'/receipts/' + UUIDCorrente + '_' + 'receipt' + '_' +new Date().toDateString()+'.txt';
    fs.writeFile(path,receipt,(err) => { if (err) throw err; })
    }
}