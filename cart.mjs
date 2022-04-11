import {carts, products, promoCode as promoCodes, users} from "./dataset.mjs"; // Importo "promoCode" come "promoCodes" per consistenza con tutti gli altri array (carts, products, users)
import * as core from "./core-cart.mjs";

import * as fs from "fs";
import * as os from "os";


// Costanti
const machine = os.userInfo();
const myUsername = machine.username.toUpperCase(); // Nessuno di questi valori dovrebbe poter cambiare a runtime quindi non serve ricalcolarli ogni volta
const myPid = String(process.pid);



// Funzioni

const checkout = function(cart) {
    
    // Elaboro carrello

    let cartUser = core.getUserByUuid(cart.user);
    
    console.log(`Processing ${core.capitalize(cartUser.firstName)} ${core.capitalize(cartUser.lastName)}'s cart... `); // Facciamo sapere all'utente che stiamo facendo.
    
    if (cart.products.length === 0)
        throw {name : "CartEmptyError", message : "This cart is empty!"};
    
    let cartProducts = cart.products.map(ean => core.getProductByEan(ean));
    
    let cartDiscount = (cartUser.promo === undefined || cartUser.promo.length === 0) ? 0 : core.getPromoByName(cartUser.promo).percentage; // Se promo è undefined o stringa vuota imposto lo sconto a zero, altrimenti imposto lo sconto secondo la promozione.
    
    let totalUndiscounted = cartProducts.reduce( (subtotal, product) => core.safeSum(subtotal, product.price), 0); // Lo zero alla fine è il valore iniziale di subtotal.
    let totalDiscounted = cartProducts.reduce( (subtotal, product) => core.safeSum(subtotal, core.discountedPrice(product.price, cartDiscount)), 0); // Lo zero alla fine è il valore iniziale per subtotal.
    
    if (core.safeSubtraction(cartUser.wallet, totalDiscounted) < 0)
        throw {name : "BalanceTooLowError", message : "This user's balance is too low to purchase the products in their cart!"};
    
    cartUser.wallet = core.safeSubtraction(cartUser.wallet, totalDiscounted);
    
    console.log("Done!"); // La parte dove qualcosa poteva andare storta dovrebbe essere passata.
    
    
    
    // Prepararo ricevuta
        
    let receipt = []; // Per comodità gestiamo la ricevuta come un array di stringhe e solo all'ultimo le uniamo insieme (così evitiamo problemi con concat ed è anche tutto più leggibile).

    receipt.push(core.frame("+", "-", 54));
    
    receipt.push(`${myUsername} Cart - ${myPid}`);
    receipt.push(`${new Date().toDateString()}`);
    
    receipt.push(core.frame("*", "-", 54));
    
    cartProducts.forEach(product => receipt.push(core.alignLeftRight(`   [${product.ean}]    ${core.capitalize(product.name)}`, `${product.price.toFixed(2)}    `, 54)));
    
    receipt.push(core.frame("*", "-", 54));
    
    receipt.push(core.alignLeftRight("   Totale:", `${totalUndiscounted.toFixed(2)}    `, 54));
    
    receipt.push(core.frame("+", "-", 54));
    
    if (cartDiscount > 0) {
        
        receipt.push(core.alignLeftRight("   Sconto:", `${core.safeSubtraction(totalUndiscounted,totalDiscounted).toFixed(2)}    `, 54));
        receipt.push(core.alignLeftRight("   Totale scontato:", `${totalDiscounted.toFixed(2)}    `, 54));
        receipt.push("");
        receipt.push(core.alignLeftRight("   CODICE PROMO:", `${cartUser.promo.toUpperCase()}    `, 54));
        receipt.push(core.frame("+", "-", 54));
        
    }
    
    receipt.push("");
    
    receipt.push(core.frame("**", "-", 54));
    
    receipt.push(`   ${core.capitalize(cartUser.firstName)} ${core.capitalize(cartUser.lastName)} ha un credito residuo di ${cartUser.wallet.toFixed(2)}`);
    
    receipt.push(core.frame("**", "-", 54));
    
    
    
    // Restituisco ricevuta
    
    return receipt.join("\n");
    
}



// MAIN CODE BLOCK

// Controllo che la cartella per le ricevute esista e se non esiste la creo. Se ci sono problemi, piuttosto che fare qualche casino (ad esempio cancellare qualche file o una cartella), esco con errore.

const receiptsFolder = "receipts";

try {    
    
    if (!fs.existsSync(receiptsFolder)) {
        
        fs.mkdirSync(receiptsFolder);
        
    } else {
        
        fs.readdirSync(receiptsFolder); // fs.existsSync non distingue tra cartelle e file. Se receiptsFolder dovesse essere un file tentare di leggere il suo contenuto come cartella causerà un eccezione (che è quello che vogliamo in questo caso).
        
    }
    
} catch (exception) {
    
    console.error(exception.message);
    
    process.exit(1); // Se siamo finiti qui significa che la cartella dove scrivere i file non esiste/non è stata creata e non c'è nulla che possiamo farci, tanto vale uscire.
    
}



// Processiamo i carrelli e creiamo le ricevute.

let receipts = []; // Raccogliamo qui tutte le ricevute (sono oggetti di due stringhe: la ricevuta vera e propria e l'uuid).

for (const cart of carts) {
    
    console.log("\n\n");
    
    try {
        
        receipts.push({
            content : checkout(cart),
            uuid : cart.user,
            time : new Date()
        });
        
    } catch (exception) {
        
        console.log(`${exception.name}: ${exception.message}`); // Queste eccezioni in realtà sono più dei "warning", non dovrebbe succedere nulla di catastrofico (per questo console.log invece di console.error).
        
    }

}



// Spostiamoci nella cartella creata prima e stampiamo le ricevute su file.

try {
    
    // Spostiamoci nella cartella delle ricevute.
    
    process.chdir(receiptsFolder);
    
    
    
    // Scriviamo su file le ricevute.
    
    for (let receipt of receipts) {
        
        let datetime = `${receipt.time.toISOString().slice(0,10)}_${receipt.time.toISOString().slice(11,-5).split(":").join("-")}`;
        
        fs.writeFileSync(`${receipt.uuid}_receipt_${datetime}.txt`, receipt.content);
        
        //fs.writeFileSync(`${receipt.uuid}_receipt_${receipt.time.getTime()}.txt`, receipt.content);
                
    }
    
} catch (exception) {
    
    console.error(exception.message);
    
    process.exit(1);
    
}



// Se tutto è andato bene usciamo con successo.

process.exit(0);
