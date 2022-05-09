export default class CartProducts {
    constructor(id, name, image, cost, discount, amount) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.discount = discount
        this.costDiscount = this.cost * (100 - this.discount) / 100;
        this.total = this.costDiscount * this.amount
    }
}

