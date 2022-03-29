import ObjectPro from "./ObjectProduct.js";

export default class Brand extends ObjectPro {
    constructor(...params) {
        super(...params);
    }
    countPros() {
        this.count = this.products.length;
    }
}
