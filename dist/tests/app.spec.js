"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkout_1 = require("../src/checkout");
const pricingRules_1 = require("../src/pricingRules");
describe('test the functionalities of checkout class', () => {
    let pricingRules = new pricingRules_1.PricingRules();
    beforeEach(() => {
        pricingRules.setRules('ipd', 549.99);
        pricingRules.setRules('mbp', 1399.99);
        pricingRules.setRules('atv', 109.50);
        pricingRules.setRules('vga', 30);
    });
    it('test the  functionality in checkout class for 3 for 2 deal on apple tv', () => {
        const checkout = new checkout_1.Checkout(pricingRules);
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('vga');
        expect(checkout.total()).toEqual(249);
    });
    it('test the functionality in checkout class for bulk discounted on ipad', () => {
        const checkout = new checkout_1.Checkout(pricingRules);
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('ipd');
        expect(checkout.total()).toEqual(2718.95);
    });
    it('test the functionality for scan functionality when total is zero', () => {
        const checkout = new checkout_1.Checkout(pricingRules);
        expect(checkout.total()).toEqual(0);
    });
    it('when the pricing rule doesnt exist, skip scanning the item', () => {
        const checkout = new checkout_1.Checkout(pricingRules);
        expect(checkout.scan('abc')).toEqual('Warning: No price rule for item "abc" Hence skipping it');
    });
    it('should be easy to update the pricing rules', () => {
        pricingRules.removeRules('ipd');
        const checkout = new checkout_1.Checkout(pricingRules);
        expect(checkout.scan('ipd')).toEqual('Warning: No price rule for item "ipd" Hence skipping it');
    });
});
