import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const createDelimiter = (openClose, symbol, times) => `${openClose} ${symbol.repeat(times)} ${openClose}`;

const printShopName = () => 
    `${os.userInfo().username.toUpperCase()} - Cart ${(process.pid)}`;


const getUser = (uuid) => (users.find(user => user.uuid === uuid));

const getData = () => {
    let formatData = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let data = new Date();

    return data.toLocaleString(`it-IT`, formatData);
}

const formatProductList = (lista) => {
    let listaProdotti = ``;
    lista.forEach(codice => {        
        let prodotto = products.find(product => product.ean === codice);
        listaProdotti += prodotto.ean 
        + `\t` 
        + prodotto.name + `\t`
        + prodotto.price + `\t\t\t`;
    });
    return listaProdotti;
}

const formatProductName = (product) => product;

const AlterType = (products, type) => products;

const sumCartItem = (lista) => {
    let somma = 0;
    lista.forEach(codice => {
        let prodotto = products.find(product => product.ean === codice);
        somma += prodotto.price;
    });
    return somma.toFixed(2);
}

const printReceipt = (testo, contatore) => {
    fs.writeFile(`./receipt/scontrino${contatore}.txt`, testo, err => {
        if (err) console.error(err);
        return
    });
    
}

const getProductByCart = (products) => products;

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';

const getProduct = (product) => products.find(product => product.ean);

export {
    discountedPrice,
    printShopName,
    getUser,
    formatProductName,
    AlterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getProductByCart,
    getUserDiscount,
    receiptFileName,
    getProduct,
    getData
};