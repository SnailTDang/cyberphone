export default class Products {
    constructor(id, tenSP, giaSP, hinhAnh, daBan, rate, discount) {
        this.id = id;
        this.tenSP = tenSP;
        this.gia = giaSP;
        this.hinhAnh = hinhAnh;
        this.khoHang = daBan;
        this.rate = rate;
        this.discount = discount;
        this.giaKM = 0;
    }
    saleOff() {
        this.giaKM = (this.gia * (100 - this.discount)) / 100;
    }
}
