const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnShowModal = document.querySelector(".btn--show-modal");
const imageInput = document.querySelector("#image-input");
const imageBox = document.querySelector("#img-preview");

btnShowModal.addEventListener("click", function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//show preview of the image
imageInput.addEventListener("change", function (e) {
  const file = imageInput.files[0];

  const img = document.createElement("img");
  img.file = file;
  img.alt = file.name.substring(0, file.name.lastIndexOf("."));

  imageBox.innerHTML = "";
  imageBox.appendChild(img);

  const reader = new FileReader();
  reader.addEventListener("load", function (e) {
    img.src = e.target.result;
  });
  reader.readAsDataURL(file);
});

//HELPERS

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
