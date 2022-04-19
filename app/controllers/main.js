import ProductServices from "../services/ProductServices.js";
import Products from "../models/Products.js";
import ObjectPro from "../models/ObjectProduct.js";
import ObjectBrand from "../models/ObjectBrand.js";
import LoginServices from "../services/LoginServices.js";
import UserType from "../models/UserType.js";



let proService = new ProductServices();
let loginService = new LoginServices();
let userActive = {};
let homeProducts = [];
let typeList = [];
let brandList = [];
let sortType = [];
let sortBrand = [];
let cartPro = [];

function getUserArr() {


    return userArr;
}

let userInput = () => {
    let acc = document.querySelector("#username").value;
    let pass = document.querySelector("#password").value;
    let newUser = { account: acc, password: pass }
    loginForm(newUser)
}

let loginForm = (userInfo) => {
    let userArr = []
    loginService.getUserList()
        .then(response => {
            userArr = [...response.data];
            let userMatch = userArr.find(user => {
                return user.account === userInfo.account && user.password === userInfo.password;
            })
            if (userMatch) {
                userActive = { ...userMatch }
                showUserLogin(userActive);
                document.querySelector(".bd-example-modal-md .close").click();
                setLocalStorage(userActive)
            } else {
                document.querySelector("#warring-login").innerHTML =
                    "Tên đăng nhập hoặc mật khẩu không đúng!"
            }
        })
        .catch(error => {
            console.log(error)
        })
}

window.userInput = userInput;

function getHomeProducts() {
    // Các code xử lý lấy data từ API
    proService
        .getProductList()
        .then((response) => {
            response.data.map((e) => {
                let {
                    id,
                    name,
                    brand,
                    cost,
                    image,
                    amount,
                    rate,
                    discount,
                    freeship,
                    type,
                } = e;
                let prod = new Products(
                    id,
                    name,
                    brand,
                    cost,
                    image,
                    amount,
                    rate,
                    discount,
                    freeship,
                    type
                );
                prod.saleOff();
                homeProducts.push(prod);
                typeList.push(type);
                brandList.push(brand);
            });
            // showProducts(homeProducts);
            typeList = Array.from(new Set(typeList));
            brandList = Array.from(new Set(brandList));
            typeList.map((e) => {
                let value = homeProducts.filter((prod) => {
                    return prod.type == e;
                });
                let obj = new ObjectPro(e, value);
                obj.countPros();
                sortType.push(obj);
            });

            brandList.map((e) => {
                let value = homeProducts.filter((prod) => {
                    return prod.brand == e;
                });
                let obj = new ObjectBrand(e, value);
                obj.countPros();
                sortBrand.push(obj);
            });
            showAllProducts(sortType);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getHomeProducts();
window.getHomeProducts = getHomeProducts;

let backHome = () => {
    getHomeProducts();
    for (let type of menuType) {
        type.classList.remove("active");
    }
};
window.backHome = backHome;

let getTypeProduct = (type) => {
    let newList = [];
    sortType.map((e) => {
        if (e.name == type) {
            newList = e.products;
        }
    });
    let content = `                
        <div class="type-box">
            <div class="type-name row">
                <div class="col">
                    <div class="d-flex">
                        <a href="#productsList" onclick="backHome()" class="home-link">
                            <h2>PRODUCTS</h2><span>&nbsp</span><span>&nbsp</span>
                        </a>
                        <h2>  &gt; ${type.toUpperCase()}</h2>
                    </div>
                </div>
            </div>
            <div class="type-products row">
                ${showProducts(newList)}
            </div>
        <div/>`;
    document.querySelector("#productsList").innerHTML = content;
};
let getBrandProduct = (type) => {
    let newList = [];
    sortBrand.map((e) => {
        if (e.name == type) {
            newList = e.products;
        }
    });
    let content = `   
    <div class="type-box">
        <div class="type-name row">
            <div class="col">
                <div class="d-flex">
                    <a href="#productsList" onclick="backHome()" class="home-link">
                        <h2>PRODUCTS</h2><span>&nbsp</span><span>&nbsp</span>
                    </a>
                    <h2>  &gt; ${type.toUpperCase()}</h2>
                </div>
            </div>
        </div>                                  
        <div class="type-products row">
            ${showProducts(newList)}
        </div>
    <div/>`;
    document.querySelector("#productsList").innerHTML = content;
};

window.getTypeProduct = getTypeProduct;
window.getBrandProduct = getBrandProduct;

function showAllProducts(array) {
    let content = array.map((e) => {
        let hightLight = "";
        let i = 0;
        do {
            hightLight += `<a href="#" class="product-link" title="${e.products[i].name}"><p>${e.products[i].name}</p></a>`;
            i++;
        } while (i < 3);
        let prod = [];
        for (let j = 0; j < 4; j++) {
            prod.push(e.products[j]);
        }
        return `
        <div class="type-box">
            <div class="type-name row">
                <div class="col-3"><h2>${e.name.toUpperCase()}</h2></div>
                <div class="type-tags col-9">
                    ${hightLight}
                    <a href="#productsList" class="product-link" onclick="getTypeProduct('${e.name
            }')"><p>Xem tất cả ${e.count} sản phẩm</p></a>
                </div>
            </div>
            <div class="type-products row">
                ${showProducts(prod)}
            </div>
        </div>
        `;
    });
    document.querySelector("#productsList").innerHTML = content.join("");
}
function showProducts(mangSP) {
    let content = mangSP.map((e) => {
        let star = () => {
            let star = "";
            for (let i = 0; i < e.rate.star; i++) {
                star += `<i class="fa fa-star yellow-star"></i>`;
            }
            for (let i = e.rate.star; i < 5; i++) {
                star += `<i class="fa fa-star trans-star"></i>`;
            }
            return star;
        };
        let status = "";
        if (e.amount > 0) {
            status = `<button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i>Mua hàng</button>`;
        } else {
            status = `
            <button class="btnPhone-shadow sold-out">
            Hết hàng
            </button>`;
        }
        let price = 0;
        let discount = "";
        if (e.discount > 0) {
            price = e.cost.toLocaleString() + "đ";
            discount = `
            <div class="discount">
                <p>${e.discount}%</p>
                <p>OFF</p>
            </div>`;
        } else {
            discount = "";
            price = "";
        }
        let iconShip = "";
        if (e.freeship) {
            iconShip = `
            <svg fill="none" viewBox="0 0 24 24" size="24" class="css-9w5ue6" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2437 8.8V10.077H10.5287C10.6548 10.077 10.7384 10.0429 10.7939 9.98729C10.8495 9.93171 10.8837 9.84817 10.8837 9.722V9.155C10.8837 9.02883 10.8495 8.94529 10.7939 8.88971C10.7384 8.83413 10.6548 8.8 10.5287 8.8H10.2437Z" fill="#30CD60"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6C4.44772 6 4 6.44771 4 7V7.74985H0.625014C0.280006 7.74985 0 8.02986 0 8.37486C0 8.71987 0.280006 8.99988 0.625014 8.99988H4V10.2494H1.87453C1.52952 10.2494 1.24951 10.5294 1.24951 10.8744C1.24951 11.2194 1.52952 11.4994 1.87453 11.4994H4V12.75H3.12697C2.78196 12.75 2.50195 13.03 2.50195 13.375C2.50195 13.72 2.78196 14 3.12697 14H4V15C4 15.5523 4.44772 16 5 16L6.00197 16C6.05465 17.3322 7.15515 18.4 8.5 18.4C9.84482 18.4 10.9453 17.3322 10.998 16.0001L16.002 16.0002C16.0547 17.3323 17.1552 18.4 18.5 18.4C19.8448 18.4 20.9452 17.3323 20.998 16.0003L23.3751 16.0003C23.7201 16.0003 24.0002 15.7203 24.0002 15.3753V12.2502C24.0002 12.1365 23.9701 12.0252 23.9114 11.9289L22.0364 8.80388C21.9239 8.61512 21.7201 8.50012 21.5001 8.50012H20V7C20 6.44772 19.5523 6 19 6H5ZM22.6458 12.2499H20V9.74988H21.1458L22.6458 12.2499ZM7.5 15.9C7.5 15.35 7.948 14.9 8.5 14.9C9.052 14.9 9.5 15.35 9.5 15.9C9.5 16.45 9.052 16.9 8.5 16.9C7.948 16.9 7.5 16.45 7.5 15.9ZM18.5 14.9C17.948 14.9 17.5 15.35 17.5 15.9C17.5 16.45 17.948 16.9 18.5 16.9C19.052 16.9 19.5 16.45 19.5 15.9C19.5 15.35 19.052 14.9 18.5 14.9ZM6.30615 7.9H8.57815V8.8H7.24815V10.035H8.29815V10.935H7.24815V13H6.30615V7.9ZM9.30166 7.9H10.5637C10.9398 7.9 11.2496 8.01459 11.4818 8.25169C11.7138 8.48397 11.8257 8.79355 11.8257 9.169V9.708C11.8257 9.94543 11.7786 10.1598 11.6816 10.3487C11.5966 10.5142 11.4795 10.6493 11.3311 10.7527L11.9701 13H10.9908L10.4518 10.977H10.2437V13H9.30166V7.9ZM15.0007 7.9H12.6937V13H15.0007V12.1H13.6357V10.865H14.7207V9.965H13.6357V8.8H15.0007V7.9ZM15.7712 7.9H18.0782V8.8H16.7132V9.965H17.7982V10.865H16.7132V12.1H18.0782V13H15.7712V7.9Z" fill="#30CD60">
            </path>
            </svg>`;
        } else {
            iconShip = "";
        }
        return `
        <div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <a href="javascript:void(0)" data-toggle="modal" data-target=".bd-example-modal-xl">
                <div class="card cardPhone">
                    <div class="card-img">
                        <img src="${e.image}" class="card-img-top" alt="...">
                        ${discount}
                    </div>
                    <div class="card-body">
                        <div class="justify-content-between">
                            <div>
                                <h3 class="cardPhone__title">${e.name}</h3>
                                <p class="cardPhone__text">Còn ${e.amount
            } sản phẩm</p>
                            </div>
                            <div>
                                <h4 class="cardPhone__cost-old">${price}</h4>
                                <h3 class="cardPhone__cost">
                                    ${e.costDiscount.toLocaleString() + "₫"}
                                    ${iconShip}
                                </h3>
                            </div>
                            <div class="cardPhone__rating">
                                <div>
                                ${star()}
                                </div>
                                <span>${e.rate.comments} Đánh giá</span>
                            </div>
                        </div>
                    </div>
                    <div class="cardphone-footer">
                        <div class="justify-content-between">
                            <div>
                            ${status}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    `;
    });
    return content.join("");
}

function showUserLogin(user) {
    let account = `
    <ul class="sub-nav-list" style="text-align:left">
        <li>
            <a href="#">
                <i class="fa fa-user-circle"></i>
                <span>Thông tin tài khoản</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fa fa-clipboard-list"></i>
                <span>Quản lí đơn hàng</span>
            </a>
        </li>
        <li>
            <a href="#">
                <i class="fa fa-map-marked-alt"></i>
                <span>Sổ địa chỉ</span>
            </a>
        </li>
        <button class="btn btn-info" onclick="logOut()">Đăng xuất</button>
    </ul>
    `
    let noti = `
        <ul class="sub-nav-list" style="text-align:left">
        ${user.notica.map((e) => {
        return `
                <li>
                    <a href="#">
                        <span>${e.content}</span>
                    </a>
                </li>
                `
    }).join("")}
        </ul>
    `
    if (user.notica.length > 0) {
        let notiCount = document.createElement("div");
        notiCount.className = "count-noti";
        notiCount.innerHTML = user.notica.length;
        document.querySelector("#noti-item").append(notiCount);
        document.querySelector("#notification").innerHTML = noti;
    }
    document.querySelector("#fullname-account").innerHTML = user.name;
    document.querySelector("#user-login").innerHTML = account;
}

function getProduct(id) {
    proService.getProduct(id).then((result) => {
        let { id, name, cost, image, amount, rate, discount } = result;
        let prod = new Products(id, name, cost, image, amount, rate, discount);
        console.log(prod);
        showDetails(prod);
    });
}

function showDetails(product) {
    return `

    `;
}

document.querySelector("#login-modal-button").addEventListener("click", () => {
    document.querySelector(".bd-example-modal-md").innerHTML =
        `
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="register">
                    <button class="btn btn-info">Đăng nhập</button>
                    <button class="btn btn-success">Đăng ký</button>
                </div>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                >
                    X
                </button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <div class="container">
                    <div
                        id="login-row"
                        class="row justify-content-center align-items-center"
                    >
                        <div id="login-column" class="col">
                            <div id="login-box" class="col-md-12">
                                <form
                                    id="login-form"
                                    class="form"
                                    action="javascript:void(0)"
                                >
                                    <h3 class="text-center text-info">
                                        Login
                                    </h3>
                                    <div class="form-group">
                                        <label
                                            for="username"
                                            class="text-info"
                                            >Username:</label
                                        >
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            class="form-control"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label
                                            for="password"
                                            class="text-info"
                                            >Password:</label
                                        >
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            class="form-control"
                                        />
                                        <span
                                            class="warring"
                                            id="warring-login"
                                        ></span>
                                    </div>
                                    <div class="form-group">
                                        <label
                                            for="remember-me"
                                            class="text-info"
                                            ><span>Remember me</span
                                            >&nbsp;<span
                                                ><input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox" /></span></label
                                        ><br />
                                        <button
                                            name="submit"
                                            class="btn btn-info btn-md"
                                            onclick="userInput()"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div
                                        id="register-link"
                                        class="text-right"
                                    >
                                        <a href="#" class="text-info"
                                            >Register here</a
                                        >
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
                <button class="btn btn-danger" data-dismiss="modal">
                    Close
                </button>
            </div>
        </div>
    </div>
    `
});

let logOut = () => {
    localStorage.removeItem("User");
    location.reload();
}

window.logOut = logOut;

function setLocalStorage(user) {
    localStorage.setItem("User", JSON.stringify(user));
}

function loginAuto() {
    if (localStorage.getItem("User")) {
        let userLocal = JSON.parse(localStorage.getItem("User"))
        loginForm(userLocal)
    }
}

loginAuto()