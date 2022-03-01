
// Solution:
// ES5: callback function => ít dùng => truyền quá nhiều hàm callback function lồng nhau => callback hell
// ES6: Prmoise => ít dùng (quá phức tạp)
// Promise => fetchAPI, asyn - await
// Library: dựa trên cơ chế Promise => thư viện Axios 

// Info: Data đã qua xử lí, và đã được hiển thị trên giao diện
// Data: dữ liệu dạng JSON/XML (Backend cung cấp);

function getProducts() {
  // Các code xử lý lấy data từ API
  axios({
    method: 'get',
    url: 'https://6214ccb089fad53b1f1f676b.mockapi.io/Products',
  })
    .then(function (response) {
      // Lấy dữ liệu thành công
      console.log(response);
      console.log(response.data)
      showProducts(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

getProducts();

function showProducts(mangSP) {
  var content = mangSP.map(e => {
    return `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card cardPhone">
            <img src="${e.hinhAnh}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="cardPhone__title">${e.tenSP}</h3>
                        <p class="cardPhone__text">${e.moTa}</p>
                    </div>
                    <div>
                        <h3 class="cardPhone__title">${e.gia}$</h3>
                    </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="cardPhone__rating">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
              </div>
              <div>
                  <button class="btnPhone-shadow"><i class="fa fa-shopping-cart"></i> Buy Now</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    `
  })
  document.querySelector("#productsList").innerHTML = content.join("")
}