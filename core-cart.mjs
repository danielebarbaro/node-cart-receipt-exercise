import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";
import { privateDecrypt } from "crypto";


const separatore = `+ -------------------------------------------------- +`;
export {
    separatore
}

const listaProdotti = (prodotti) => {
    let stringa = ``;;
    for(let item of prodotti){
        if(item !== prodotti)
    }
}


const getTotale = (productsUser) => 

const getSconto = ()





const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);
export {
    discountedPrice,
};


const printShopName = () =>{
    const {username} =os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}

const getUser = (uuid) => users.find(users => users.uuid);

//let creditoResiduo(user)
const stringFormat = (string) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1)

const formatProductName = (product) => {

for (let item of products) {
    let formattedName = '';
    let productName = item.name

    let multiName = productName.split(' ');

    if (multiName.length > 1) {
        for (let piece of multiName) {
            formattedName += `${format(piece)} `;
        }
    } else {
        formattedName = format(productName);
    }

    item.name = formattedName;
    
}


const filterType = (products) => products;


const sumCartItem = (carts.products); => 
{
    let total = 0;
    for(let item of carts.products)
        total += carts.products.price
};

const stampaTotale = (users) => {
    console.log(`Totale:                ${sumCartItem()}`)
}


const formatProductList = (products) => products;
const printReceipt = (content, fileName) => ``;
const createDelimiter = (openClose, symbol, times) => ``;
const getProductByCart = (products) => products;
const getUserDiscount = () => 0;
const receiptFile = (uuid, date) => ``;

export{
    discountedPrice,
    helloWorld,
    printShopName,
    getUser,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,


}