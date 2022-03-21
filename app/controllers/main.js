import ProductServices from "../services/ProductServices.js";
import Products from "../models/Products.js";

let proService = new ProductServices();
let homeProducts = [];

function getHomeProducts() {
    // Các code xử lý lấy data từ API
    proService
        .getProductList()
        .then((response) => {
            response.data.map((e) => {
                let { id, tenSP, gia, hinhAnh, khoHang, rate, discount } = e;
                let prod = new Products(
                    id,
                    tenSP,
                    gia,
                    hinhAnh,
                    khoHang,
                    rate,
                    discount
                );
                prod.saleOff();
                homeProducts.push(prod);
            });
            showProducts(homeProducts);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getPhoneProduct() {
    let phonelist = [];
    // Các code xử lý lấy data từ API
    proService
        .getProductList()
        .then((response) => {
            response.data.phonelist.map((e) => {
                let { id, tenSP, gia, hinhAnh, khoHang, rate, discount } = e;
                let prod = new Products(
                    id,
                    tenSP,
                    gia,
                    hinhAnh,
                    khoHang,
                    rate,
                    discount
                );
                prod.saleOff();
                phonelist.push(prod);
            });
            showProducts(phonelist);
        })
        .catch(function (error) {
            console.log(error);
        });
}

window.getPhoneProduct = getPhoneProduct;

getHomeProducts();

function showProducts(mangSP) {
    let content = mangSP.map((e) => {
        console.log(e);
        // e.saleOff();
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
        if (e.khoHang > 0) {
            status = `<button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i>Mua hàng</button>`;
        } else {
            status = `
            <button class="btnPhone-shadow sold-out">
            Hết hàng
            </button>`;
        }
        let discount = "";
        if (e.discount > 0) {
            discount = `
            <div class="discount">
                <p>${e.discount}%</p>
                <p>OFF</p>
            </div>`;
        } else {
            discount = "";
        }
        return `
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
            <a href="#" data-toggle="modal" data-target=".bd-example-modal-lg">
                <div class="card cardPhone">
                    <div class="card-img">
                        <img src="${e.hinhAnh}" class="card-img-top" alt="...">
                        ${discount}
                    </div>
                    <div class="card-body">
                        <div class="justify-content-between">
                            <div>
                                <h3 class="cardPhone__title">${e.tenSP}</h3>
                                <p class="cardPhone__text">Còn ${
                                    e.khoHang
                                } sản phẩm</p>
                            </div>
                            <div>
                                <h4 class="cardPhone__cost-old">${e.gia.toLocaleString()}₫</h4>
                                <h3 class="cardPhone__cost">${e.giaKM.toLocaleString()}₫</h3>
                            </div>
                            <div class="cardPhone__rating">
                                <div>
                                ${star()}
                                </div>
                                <span>${e.rate.comments}</span>
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
    document.querySelector("#productsList").innerHTML = content.join("");
}

// SWIPER

const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

const swiperCarou = new Swiper(".swiperCarousel", {
    // Optional parameters
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 3800,
        disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

const headerMenu = document.querySelector(".headerPhone");
const menuItems = headerMenu.querySelectorAll(".menu-link");

window.addEventListener("scroll", function () {
    if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
    ) {
        headerMenu.classList.add("menu-scroll");
        for (let menuItem of menuItems) {
            menuItem.querySelector("span").style.display = "none";
        }
    } else {
        headerMenu.classList.remove("menu-scroll");
        for (let menuItem of menuItems) {
            menuItem.querySelector("span").style.display = "inline-block";
        }
    }
});
