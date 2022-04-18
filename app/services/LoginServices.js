export default class LoginServices {
    getUserList() {
        return axios({
            method: "get",
            url: "https://6214ccb089fad53b1f1f676b.mockapi.io/User",
        });
    }
    addUser(user) {
        return axios({
            method: "post",
            url: "https://6214ccb089fad53b1f1f676b.mockapi.io/User",
            data: user
        });
    }
    getProduct(id) {
        return axios({
            method: "get",
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/Products/${id}`,
        });
    }
}
