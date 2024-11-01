import { Price } from "../types";
import { PricingRules } from "./pricingRules";

let pricingRules: PricingRules = new PricingRules();
pricingRules.setRules("ipd", 549.99);
pricingRules.setRules("mbp", 1399.99);
pricingRules.setRules("atv", 109.5);
pricingRules.setRules("vga", 30);
pricingRules.setRules("ipd", 658.99);

//checkout functionality for scanning and retrieving the total of all items scanned
export class Checkout {
    private pricingRules: PricingRules
    private totalItems: Map<string, number>;
    constructor(pricingRules: PricingRules) {
        this.pricingRules = pricingRules;
        this.totalItems = new Map<string, number>();
    }
    // scan functionality to get the count of every item being scanned and add its to Map which contains the item and quantity of it.
    scan(item: string) {
        if (this.pricingRules.getRules(item)) {
            let itemCount = this.totalItems.get(item) || 0;
            this.totalItems.set(item, itemCount + 1);
        } else {
            // will skip adding the item to totalItems as price rule for the items that doesn't exists.
            return `Warning: No price rule for item "${item}" Hence skipping it`;
        }
    }
    // total functionality checks the special discounted rules and applies them wherever required and retrieves the total amount
    total(): number {
        let totalSale: number = 0;
        try {
            if (this.totalItems.size > 0) {
                for (let [key, value] of this.totalItems) {
                    if (key === "atv" && value >= 3) {
                        const dealQuantity = Math.floor(value / 3); // gets the quantity into groups of 3 
                        const regularQuantity = value % 3; // Remaining items that are not part of deal
                        totalSale += dealQuantity * 2 * this.pricingRules.getRules(key)! + regularQuantity * this.pricingRules.getRules(key)!;
                        console.log(`DealQuantity for ${key} is ${dealQuantity} and discounted price is ${dealQuantity * 2 * this.pricingRules.getRules(key)!}`)
                        console.log(`RegularQuantity for ${key} is ${regularQuantity} and price is ${regularQuantity * this.pricingRules.getRules(key)!}`,)
                        console.log(`The ${key} scanned items is ${value} and total price is ${totalSale}`)
                    }
                    else if (key === "ipd" && value > 4) {
                        totalSale += 499.99 * value
                        const dealQuantity = Math.floor(value / 5); // more than 4 ipds forms a deal
                        console.log(`DealQuantity for ${key} is ${value} and discounted price is ${499.99 * value}`)
                    }
                    else {
                        totalSale += this.pricingRules.getRules(key)! * value; // rest all items that don't have special discount
                        console.log(`The ${key} scanned items is ${value} and total price is ${this.pricingRules.getRules(key)! * value}`)
                    }
                }
                return totalSale;
            }
        }
        catch (error) {
            throw new Error(`Error calculating the total:${error}`)
        }
        return 0;
    }
}

const co = new Checkout(pricingRules);
co.scan('atv')
co.scan('atv')
co.scan('atv')
co.scan('atv')
co.scan('atv')
co.scan('atv')
co.scan('atv')
co.scan('ipd')
console.log(`Total Price is ${co.total()}`);
