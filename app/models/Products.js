export default class Products {
    constructor(id,name, cost, image, amount, rate, discount, freeShip,type) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.image = image;
        this.amount = amount;
        this.rate = rate;
        this.discount = discount;
        this.costDiscount = 0;
        this.freeShip = freeShip;
        this.type = type;
    }
    saleOff() {
        this.costDiscount = (this.cost * (100 - this.discount)) / 100;
    }
}
