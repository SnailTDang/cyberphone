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
    getUser(id) {
        return axios({
            method: "get",
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/User/${id}`,
        });
    }
    updateSeen(id, user) {
        return axios({
            method: 'PUT',
            url: `https://6214ccb089fad53b1f1f676b.mockapi.io/User/${id}`,
            data: user
        });
    }
}
