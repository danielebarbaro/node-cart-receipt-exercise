import {carts, products, promoCodes, users} from "./dataset.mjs"; // Cambiato promoCode al plurale

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

export {
    discountedPrice,
};
