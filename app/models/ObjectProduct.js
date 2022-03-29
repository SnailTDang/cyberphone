export default class ObjectPro {
    constructor(name, products) {
        this.name = name;
        this.products = products;
        this.count = 0;
    }
    countPros() {
        this.count = this.products.length;
    }
}
