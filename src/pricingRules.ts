export class PricingRules{

    protected priceRule: Map<string, number>;; 
    constructor(){
        this.priceRule = new Map<string, number>
    }
    //
    setRules(item:string, price:number){
        this.priceRule.set(item, price)
    }

    removeRules(item:string){
        this.priceRule.delete(item)
    }
    getRules(item:string){
        return this.priceRule.get(item)
    }
}