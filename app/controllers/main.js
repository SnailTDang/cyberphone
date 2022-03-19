import ProductServices from "../services/ProductServices.js";
import Products from "../models/Products.js";

let proService = new ProductServices();

function getProducts() {
    // Các code xử lý lấy data từ API
    proService
        .getProductList()
        .then((response) => {
            showProducts(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getPhuKien() {
    // Các code xử lý lấy data từ API
    proService
        .getProductList()
        .then((response) => {
            console.log(response.data.phone);
            let { phone, phuKien } = response.data;
            showProducts(phuKien);
        })
        .catch(function (error) {
            console.log(error);
        });
}

getProducts();

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
        if (e.khoHang > 0) {
            status = `<button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i>Mua hàng</button>`;
        } else {
            status = `
              <div class="btnPhone-shadow sold-out">
                Hết hàng
              </div>`;
        }
        return `
        <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <a href="#" data-toggle="modal" data-target=".bd-example-modal-lg">
              <div class="card cardPhone">
                  <img src="${e.hinhAnh}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <div class="justify-content-between">
                          <div>
                              <h3 class="cardPhone__title">${e.tenSP}</h3>
                              <p class="cardPhone__text">Còn ${
                                  e.khoHang
                              } sản phẩm</p>
                          </div>
                          <div>
                              <h3 class="cardPhone__cost">${e.gia.toLocaleString()} ₫</h3>
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
