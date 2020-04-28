export const scrollToTop = () => {
  const topButton = document.querySelector(".btn-up");

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.screen.height * 0.5) {
      topButton.style.display = "block";
    } else {
      topButton.style.display = "none";
    }
  });

  topButton.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
};

export const displayItems = (itemsAmount) => {
  const container = document.querySelector("#products-container");
  const btnItems = document.querySelector("#btn-items");

  btnItems.addEventListener("click", () => {
    const itemRow = document.createElement("div");
    itemRow.classList.add("row");
    container.appendChild(itemRow);

    for (let i = 0; i < itemsAmount; i++) {
      const itemWrapper = document.createElement("div");
      itemWrapper.classList.add("col-md-3", "col-6");

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("item");

      const itemImg = document.createElement("img");
      itemImg.src = "https://placekitten.com/309/390";

      const itemName = document.createElement("p");
      itemName.classList.add("name");
      itemName.innerHTML = "Product Name";

      const itemPrice = document.createElement("p");
      itemPrice.classList.add("price");
      itemPrice.innerHTML = "100 zł";

      itemRow.appendChild(itemWrapper);
      itemWrapper.append(imgWrapper, itemName, itemPrice);
      imgWrapper.appendChild(itemImg);
    }
  });
};

export const setCurrentDate = () => {
  const footerDate = document.querySelector("#footerDate");

  const d = new Date();
  footerDate.innerHTML = d.getFullYear();
};
