import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);

const printShopName = () =>  `${os.userInfo().username.toUpperCase()} - Cart ${process.pid}`;

const printDelimiter = (startFinisc, innerSymbol, n) => `${startFinisc} ${innerSymbol.repeat(n)} ${startFinisc}`;

const format = (word) => word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);

const formatList = (list) => {
    let counter = 0;
    let listaFormattata = ``;
    list.forEach( codice =>  {
        let prodotto = products.find(product => product.ean === codice);
        let formattedName = ``;
        let multiName = prodotto.name.split(' ');
        if (multiName.length > 1) {
            for (let word of multiName){
                if (counter === 0) {
                    formattedName += `${format(word)}`;
                    counter++;
                }else {
                    formattedName = formattedName.concat(` `,`${format(word)}`);
                }
            }
        }else {
            formattedName = `${format(prodotto.name)}`;
        }
        listaFormattata += `\n   [${codice}]\t${formattedName}${((prodotto.name.split(` `).length > 1 ) ? `\t`.repeat(2) : `\t`.repeat(3))}${prodotto.price.toFixed(2)}`;
    });
    return listaFormattata;
}

const sumTotale = (lista) => {
    let totale = 0;
    if (lista != null){
        lista.forEach(codice => {
            let prodotto = products.find(product => product.ean === codice);
            totale += prodotto.price;
        });
    }

    return totale.toFixed(2);
}

const printPromo = (lista, currentUser) => {
    let result = ``;
    let totale = sumTotale(lista)
    if (currentUser.promo !== `` && currentUser.promo != undefined) {
        let sconto = promoCode.find(code => code.name === currentUser.promo);
        totale = discountedPrice(totale, sconto.percentage);
        result = `   Sconto:${`\t`.repeat(4)}${(totale*sconto.percentage).toFixed(2)}\n   Totale scontato:${`\t`.repeat(3)}${totale}\n\n   CODICE SCONTO:${`\t`.repeat(3)}${sconto.name}`;
    }
    return result;
}

const totaleScontato = (currentUser, totaleNonScontato) => {
    
    if (currentUser.promo !== `` && currentUser.promo != undefined) {
        let sconto = promoCode.find(code => code.name === currentUser.promo);
        return discountedPrice(totaleNonScontato, sconto.percentage);
    }else {
        return 0;
    }
}

const getDate = () => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date();
    return date.toLocaleString(`it-IT`, options);
}

const genDate = () => {
    let today  = new Date();
;
    return today.getDay() + `-` +  today.getMonth() + `-` + today.getFullYear();
}

const getUser = (uuid) => users.find(user => user.uuid === uuid);

const printReceipt = (receiptText, uuid) => {
    fs.writeFile(`./receipts/${uuid}_receipt_${genDate()}.txt`, receiptText, err => {
        if (err) {
          console.error(err)
          return
        }
      });
}

export {
    discountedPrice,
    printShopName,
    getUser,
    printDelimiter,
    getDate,
    sumTotale,
    formatList,
    printPromo,
    printReceipt,
    totaleScontato
};