import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);

const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}

const getUser = (uuid) => users.find(user => user.uuid === uuid);

const getProduct = (productId) => products.find(product => product.ean === productId)

const getPercentageFromPromocode = function (promoCodeName) {
    if(promoCodeName !== ''
        && promoCodeName !== undefined
        && promoCodeName !== null){
            let rate = promoCode.find(item => promoCodeName === item.name);
            return rate.percentage;
    }
    return 0;
}

const separatore = (div, lung) => {
    let result = ''
        for(let index = 0; index < lung; index++){
            if(index == 0 || index == lung-1)
                result += div
            else if(index == 1 || index == (lung-2))
                result += ' '
            else
                result += '-'
}
    return result;
}

const formatArrow = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);

function formatProductName (productName){
        let formattedName = '';

        let multiName = productName.split(' ');
        for (let piece of multiName) {
            if(piece !== multiName[0]){
                formattedName += ` `;
            }
            formattedName += `${formatArrow(piece)}`;

        }
        return formattedName;
    }
    



const creditoResiduo = (portafoglio,sconto) => portafoglio-sconto;

const filterType = (products, type) => product;

const sumCartItem = (products) => (products);

const formatProductList = (products) => products;

const printReceipt = (content, filename) => '';

const getProductByCart = (products) => products.formatProductName();

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';



export {
    discountedPrice,
    printShopName,
    getUser,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    getProductByCart,
    getUserDiscount,
    receiptFileName,
    getProduct,
    getPercentageFromPromocode,
    formatArrow,
    separatore,
    creditoResiduo,
    formatProductName
};