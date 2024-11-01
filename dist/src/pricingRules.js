"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingRules = void 0;
class PricingRules {
    ;
    constructor() {
        this.priceRule = new Map;
    }
    //
    setRules(item, price) {
        this.priceRule.set(item, price);
    }
    removeRules(item) {
        this.priceRule.delete(item);
    }
    getRules(item) {
        return this.priceRule.get(item);
    }
}
exports.PricingRules = PricingRules;
