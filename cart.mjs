import {carts, products} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

const today = new Date().toDateString();

for (let item of carts) {
    let receipt = '';
    // console.log(' CART CONTENT DEBUG:', item);
    const {user: userUUID, products: cartContent} = item;

    const user = core.getUser(userUUID);
    const {wallet, promo, firstName, lastName} = user;
    const userCartList = core.getProductByCart(cartContent)

    if (cartContent.length === 0) {
        console.error(`>> ${firstName} ${lastName} ha un CARRELLO SENZA PRODOTTI`)
        continue;
    }

    const cartTotal = core.sum(userCartList)
    const {percentage: discountPercentage} = core.getUserDiscount(promo)

    let total = core.discountedPrice(cartTotal, discountPercentage)
    const discount = (cartTotal - total).toFixed(2);

    if (total > wallet) {
        console.error(`>> ${firstName} ${lastName} ha un credito di ${wallet.toFixed(2)} e non può concludere l'acquisto di ${total}.`)
        continue;
    }

    receipt += core.createDelimiter('+');
    receipt += core.shopName();
    receipt += `\r\n${today}`;
    receipt += core.createDelimiter();
    userCartList.forEach(product => {
        let productName = core.formatProductNameMultiple(product.name);
        receipt += `\r\n   [${product.ean}]    ${productName}\t\t${product.price.toFixed(2)}`
    }, receipt)

    receipt += core.createDelimiter();
    receipt += `\r\n   Totale:\t\t\t ${cartTotal}`
    receipt += core.createDelimiter('+');
    if (discountPercentage > 0) {
        receipt += `\r\n   Sconto:\t\t\t ${discount}`
        receipt += `\r\n   Totale Scontato:\t\t ${total}`
        receipt += `\r\n\n   PROMO:\t\t\t ${user.promo}`
        receipt += core.createDelimiter('+');
    } else {
        total = cartTotal;
    }

    receipt += `\r\n`;
    receipt += core.createDelimiter('**');
    receipt += `\r\n   ${firstName} ${lastName} ha un credito residuo di ${(wallet - total).toFixed(2)}`
    receipt += core.createDelimiter('**');
    receipt += `\r\n`;

    core.printReceipt(receipt, `receipts/${userUUID}_receipt_${new Date().getTime()}.txt`)
    // console.log(receipt)
}

console.info(`\n>> Controlla le ricevute stampate.`)




