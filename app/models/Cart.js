export default class Cart {
    constructor(products) {
        this.amount = products.length;
        this.products = products;
        this.total = 0
    }
    totalCart() {
        this.total = this.products.reduce((total, item) => {
            return total += Number(item.total)
        }, 0)
    }

}