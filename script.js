const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnShowModal = document.querySelector(".btn--show-modal");

const productContainer = document.querySelector("#product-container");
const form = document.querySelector("#modal__form");
const imagePreview = document.querySelector("#img-preview");
const imageInput = document.querySelector("#image-input");
const nameInput = document.querySelector("#name-input");
const yearInput = document.querySelector("#year-input");
const brandInput = document.querySelector("#brand-input");
const priceInput = document.querySelector("#price-input");

const search = document.querySelector("#search");
const searchInput = document.querySelector("#search-input");

// function para cargar local storage;

function loadProducts(products) {
  productContainer.innerHTML = "";

  const productList = products.map((product) => {
    return `
    <div class="product-card">
          <img src="${product.img}" alt="${product.name}" />
          <div class="product__details">
            <div class="product__details-text">
              <p class="name">${product.name}</p>
              <p class="year">${product.year}</p>
              <p class="brand">${product.brand}</p>
              <p class="price"><span>$</span>${product.price}</p>
            </div>
            <div class="product__details-cta">
              <button><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>
        </div>`;
  });
  productContainer.insertAdjacentHTML("beforeend", productList.join(" "));
}

const data = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
loadProducts(data);

// show and close modal
btnShowModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// show preview of the image
imageInput.addEventListener("change", function (e) {
  const file = imageInput.files[0];
  const img = document.createElement("img");
  img.file = file;
  img.alt = file.name.substring(0, file.name.lastIndexOf("."));

  imagePreview.innerHTML = "";
  imagePreview.appendChild(img);

  const reader = new FileReader();
  reader.addEventListener("load", function (e) {
    img.src = e.target.result;
  });
  reader.readAsDataURL(file);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // crea el `product-card`
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");

  // crea imagen
  const file = imageInput.files[0];
  const img = document.createElement("img");
  img.file = file;
  img.alt = file.name.substring(0, file.name.lastIndexOf("."));

  const reader = new FileReader();
  reader.addEventListener("load", function (e) {
    img.src = e.target.result;

    //guardar imagen en el local storage

    const newProduct = {
      img: e.target.result,
      name: nameInput.value,
      year: yearInput.value,
      brand: brandInput.value,
      price: priceInput.value,
    };
    data.push(newProduct);
    localStorage.setItem("products", JSON.stringify(data));

    // resetea el valor de los input
    imagePreview.innerHTML = "";
    imageInput.files[0] = [undefined];
    imageInput.value = "";
    nameInput.value = "";
    brandInput.value = "";
    yearInput.value = "";
    priceInput.value = "";
  });
  reader.readAsDataURL(file);

  // crea el `product__details`
  const productDetails = document.createElement("div");
  productDetails.classList.add("product__details");

  // crea el `product__details-text`
  const productDetailsText = document.createElement("div");
  productDetailsText.classList.add("product__details-text");

  const productName = document.createElement("p");
  productName.classList.add("name");
  productName.textContent = nameInput.value;

  const productYear = document.createElement("p");
  productYear.classList.add("year");
  productYear.textContent = yearInput.value;

  const productBrand = document.createElement("p");
  productBrand.classList.add("brand");
  productBrand.textContent = brandInput.value;

  const productPrice = document.createElement("p");
  productPrice.classList.add("price");
  productPrice.innerHTML = `<span>$</span>${priceInput.value}`;

  productDetailsText.append(
    productName,
    productYear,
    productBrand,
    productPrice
  );
  productDetails.appendChild(productDetailsText);

  // crea el `product__details-cta`
  const productDetailsCta = document.createElement("div");
  productDetailsCta.classList.add("product__details-cta");

  const ctaButton = document.createElement("button");
  ctaButton.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';

  productDetailsCta.appendChild(ctaButton);
  productDetails.appendChild(productDetailsCta);

  // agrega la imagen y el productDetails a `productCard`
  productCard.append(img, productDetails);

  // agrega el productCard a `productContainer`
  productContainer.appendChild(productCard);

  // cierra el modal
  closeModal();
});

searchInput.addEventListener("input", searchfn);

search.addEventListener("submit", function (e) {
  e.preventDefault();
  searchfn();
  searchInput.value = "";
});

// Helpers
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function searchfn() {
  const searchCriteria = searchInput.value;

  if (!searchCriteria) loadProducts(data);

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(searchCriteria.toLowerCase())
  );
  loadProducts(filteredData);
}
