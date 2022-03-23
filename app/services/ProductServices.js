export default class ProductServices {
    getProductList() {
        return axios({
            method: "get",
            url: "http://localhost:3000/data",
        });
    }
    getProduct(id) {
        return axios({
            method: "get",
            url: `http://localhost:3000/data/${id}`,
        });
    }
}
