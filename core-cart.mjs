import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const printShopName = () =>  `${os.userInfo().username.toUpperCase()} - Cart ${process.pid}`;

const printDelimiter = (startFinisc, innerSymbol, n) => `${startFinisc} ${innerSymbol.repeat(n)} ${startFinisc}`;

const format = (word) => word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);

const formatList = (list) => {
    let prodotto;
    let counter = 0;
    for ( let codice of list ) {
        prodotto = products.find(product => product.ean === codice);
        let formattedName = ``;
        let multiName = prodotto.name.split(' ');
        if (multiName.length > 1) {
            for (let word of multiName){
                if (counter === 0) {
                    formattedName = formattedName.concat(`${format(word)}`);
                    counter++;
                }else {
                    formattedName = formattedName.concat(` `,`${format(word)}`);
                }
            }
        }else {
            formattedName = `${format(prodotto.name)}`;
        }
        console.log(`   [${codice}]\t${formattedName}${((prodotto.name.split(` `).length > 1 ) ? `\t\t` : `\t\t\t`)}${prodotto.price.toFixed(2)}`); ;
    }
}

const sumTotale = (lista, currentUser) => {
    let totale = 0;
    let prodotto;
    if (lista != null){
        for (let codice of lista) {
            prodotto = products.find(product => product.ean === codice);
            totale += prodotto.price;
        }
    }
    
    return totale.toFixed(2);
}

const printPromo = (lista, currentUser) => {
    let totale = 0;
    let prodotto;
    if (lista != null){
        for (let codice of lista) {
            prodotto = products.find(product => product.ean === codice);
            totale += prodotto.price;
        }
    }
    if (currentUser.promo !== `` && currentUser.promo != undefined) {
        let rate = promoCode.find(code => code.name === currentUser.promo);
        totale = totale - (totale * rate.percentage);
        console.log(`   ${rate.name}\t\t\t\t${(rate.percentage*100).toFixed(2)}%`);
        console.log(`   Totale scontato:\t\t\t${totale.toFixed(2)}`);
    }else {
        console.log(`\n`);
    }
   return totale;
}

const getDate = () => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date();
    return date.toLocaleString(`en-US`, options);
}

const getUser = (uuid) => users.find(user => user.uuid === uuid);

export {
    discountedPrice,
    printShopName,
    getUser,
    printDelimiter,
    getDate,
    sumTotale,
    formatList,
    printPromo
};