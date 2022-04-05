import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";
import { privateDecrypt } from "crypto";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

export {
    discountedPrice,
};

const helloWorld = (name => `Hello ${name}`);

const printShopName = () =>{
    const {username} =os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}

const getUser = (uuid) => users.find(users => users.uuid);


const formatProductName = (product) => {
    return product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1)
}

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

    cart.push(item);
}


const filterType = (products) => products;


const sumCartItem = (products) => {
    let total = 0;
    for(let item of products)
        total += products.price
};


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