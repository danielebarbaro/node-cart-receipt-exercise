import * as fs from "fs";
import * as os from "os";
import {carts, products, promoCode, users} from "./dataset.mjs";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const formatProductName = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);

const sum = (products) =>  products
    .map(item => item.price)
    .reduce((prev, current) => prev + current, 0)
    .toFixed(2);

const formatProductNameMultiple = (name) => {
    let nameWithSpaces = name.split(' ');

    if (nameWithSpaces.length === 1) {
        name = formatProductName(name);
    } else {
        let res = [];
        for (let piece of nameWithSpaces) {
            res.push(formatProductName(piece));
        }
        name = res.join(' ')
    }

    return name;
};

const formatProductsList = (products) => products.map(item => {
    let {name} = item
    let nameWithSpaces = name.split(' ');

    if (nameWithSpaces.length === 1) {
        item.name = formatProductName(name);
    } else {
        let res = [];
        for (let piece of nameWithSpaces) {
            res.push(formatProductName(piece));
        }
        item.name = res.join(' ')
    }

    return item;
})

const shopName = () => {
    const cartCode = process.pid;
    const cartName = os.userInfo();
    const {username} = cartName;
    return `\r\n${username.toUpperCase()} &art - ${cartCode}`;
}

const printReceipt = (content, filename) => fs.writeFileSync(filename, content);

const createDelimiter = (openClose = '*', symbol = '-', times = 50) => `\r\n${openClose} ${symbol.repeat(times)} ${openClose}`;

const getUser = (uuid) => users.find(user => user.uuid === uuid)

const getProductByCart = (cartProducts) => products.filter(product => cartProducts.includes(product.ean))

const getUserDiscount = (code) => promoCode.filter(promo => promo.name === code).shift() || 0

export {
    discountedPrice,
    formatProductName,
    formatProductNameMultiple,
    formatProductsList,
    shopName,
    printReceipt,
    getUser,
    getProductByCart,
    getUserDiscount,
    createDelimiter,
    sum
};
