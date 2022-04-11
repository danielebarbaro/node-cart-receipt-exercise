import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

console.log('MATTEOPC');

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const helloworld = (name => ' hello $ {name}');

const printShopName = () => {
    const {username} = os.userInfo();
    return '${name.toUpperCase()} - Cart ${process.pid}';

}

const getUser = (uuid) => users.find(user => user.uuid === uuid);

//funzioni
function nomeprodotto(product){
    const formatProductName = (product) => product;
    return formatProductName;
}
console.log(nomeprodotto, formatProductName);

function tipo(prodfuct, Type){
    const filterType = (product, Type ) => product;
    return filterType;
}
console.log(tipo, filterType);

function somma(product){
    const sumCartItem= (products) => (products);
    //ho dei dubbi per come farla
    return sumCartItem;
}
const formatProductList= (products) => products;
const printReceipt= (uuid, receipt) => {
    fs.writeFile('./receipts/${uuid}_recepit_${genDate()}.txt', receipt, err =>{
        if(err){
            console.log(err)
            return
        }
    });

};
const createDelimiter= (openClose, symbol, times) => '${openClose} ${symbol.repeat(times)} ${openClose}';


const getUserDiscount = () =>0;

const receiptFileName = (uuid, date) => '';


const getPRoduct = (productId) => products.find(product => product.ean === productId)


export {
    discountedPrice,
    helloworld,
    printShopName,
    getUser,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getUserDiscount,
    receiptFileName
};