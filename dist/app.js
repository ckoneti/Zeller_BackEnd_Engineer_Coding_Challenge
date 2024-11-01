"use strict";
// create a map to store the pricing details ( make it flexible to change)
// error handling for test cases
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkout = void 0;
let pricingRules = new Map();
pricingRules.set("ipd", 549.99);
pricingRules.set("mbp", 1399.99);
pricingRules.set("atv", 109.5);
pricingRules.set("vga", 30);
/* function generatePricingRules(key:string, value:number): Map<string,number>{
    let pricingRules = new Map<string, number>()
    pricingRules.set(key, value)
    return pricingRules;
} */
//checkout functionality for scanning and retrieving the total of all items scanned
class Checkout {
    constructor(pricingRules) {
        this.pricingRules = pricingRules;
        this.totalItems = new Map();
    }
    // scan functionality gets the count of  every item being scanned and add its to Map which contains the item and count of it.
    scan(item) {
        if (this.pricingRules.get(item)) {
            let itemCount = this.totalItems.get(item) || 0;
            this.totalItems.set(item, itemCount + 1);
        }
        else {
            // will skip adding the item to totalItems as price rule doesn't exists.
            return `Warning: No price rule for item "${item}" Hence skipping it`;
        }
    }
    // total functionality checks the special  discounted rules and applies them to retrieve the total amount
    total() {
        let totalSale = 0;
        try {
            if (this.totalItems.size > 0) {
                for (let [key, value] of this.totalItems) {
                    if (key === "atv" && value >= 3) {
                        const dealQuantity = Math.floor(value / 3); // How many deals of 3
                        const regularQuantity = value % 3; // Remaining items that do not form a complete deal
                        totalSale += dealQuantity * 2 * this.pricingRules.get(key) + regularQuantity * this.pricingRules.get(key);
                        console.log(`DealQuantity for ${key} is ${dealQuantity} and discounted price is ${dealQuantity * 2 * this.pricingRules.get(key)}`);
                        console.log(`RegularQuantity for ${key} is ${regularQuantity} and price is ${regularQuantity * this.pricingRules.get(key)}`);
                        console.log(`The ${key} scanned items is ${value} and total price is ${totalSale}`);
                    }
                    else if (key === "ipd" && value > 4) {
                        totalSale += 499.99 * value;
                        const dealQuantity = Math.floor(value / 5); // How many deals of 3
                        console.log(`DealQuantity for ${key} is ${value} and discounted price is ${499.99 * value}`);
                    }
                    else {
                        totalSale += this.pricingRules.get(key) * value;
                        console.log(`The ${key} scanned items is ${value} and total price is ${this.pricingRules.get(key) * value}`);
                    }
                }
                return totalSale;
            }
        }
        catch (error) {
            throw new Error(`Error calculating the total:${error}`);
        }
        return 0;
    }
}
exports.Checkout = Checkout;
const co = new Checkout(pricingRules);
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('ipd');
console.log(`Total Price is ${co.total()}`);
