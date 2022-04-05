import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const helloworld = (name => `Hello ${name}`);

const printShopName = () => {
    const { username } = os.userInfo();     // ottiene il nome utente della macchina
    return `${machineName.toUpperCase()} = cart ${pid}`;
} 
 
 const getUser = (uuid) => users.find(user => user.uuid === uuid);
 
 const formatProductName = (product) => product;
 
 const filterType = (products, type) => product;

 const sumCartItem = (products, type) => (products);

 const formatProductList = (products) => (products);
 
 const printReceipt = (content, filename) => ``;

 const createDelimiter = (openClose, symbol, times);

 const getProductByCart = (products) => products;

 const getUserDiscount = () => 0;

 const receiptFileName = (uuid, date) => ``;
    

    
    


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
    getProductByCart,
    getUserDiscount,
    receiptFileName,
};