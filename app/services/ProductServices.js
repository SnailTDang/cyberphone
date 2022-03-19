export default class ProductServices {
    getProductList() {
        return axios({
            method: "get",
            url: "https://6214ccb089fad53b1f1f676b.mockapi.io/Products",
        });
    }
}
