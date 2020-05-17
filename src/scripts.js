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

export const setCurrentDate = () => {
  const footerDate = document.querySelector("#footerDate");

  const d = new Date();
  footerDate.innerHTML = d.getFullYear();
};

export const carouselControll = () => {
  const prevButton = document.querySelector(".btn-prev");
  const nextButton = document.querySelector(".btn-next");

  const carouselSlide = document.querySelector(".carousel__slide");

  const carouselImages = document.querySelectorAll(".carousel__slide img");

  let counter = 0;
  const size = 500;

  nextButton.addEventListener("click", () => {
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = `translateX(${-size * counter}px`;
    if (counter > 3) {
      carouselSlide.style.transition = "none";
      counter = 3;
      carouselSlide.style.transform = `translateX(${-size * counter}px`;
    }
  });

  prevButton.addEventListener("click", () => {
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = `translateX(${-size * counter}px`;
    if (counter < 0) {
      carouselSlide.style.transition = "none";
      counter = 0;
      carouselSlide.style.transform = `translateX(${-size * counter}px`;
    }
  });
};

export const getInitialData = () => {
  const carouselWrapper = document.querySelector(".carousel__slide");
  const productsWrapper = document.getElementById("products-container");
  const featuredWrapper = document.querySelector(".featured");
  const itemsCarousel = placeholdersCarousel(carouselWrapper);
  const itemsMain = placeholdersMain(productsWrapper, 8);
  const itemsFeatured = placeholdersFeatured(featuredWrapper);

  const axios = require("axios");
  axios({
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "asos2.p.rapidapi.com",
      "x-rapidapi-key": "dcf6400177msh6923d646ebad4f4p15c6f7jsn325ddc62d1b4",
      useQueryString: true,
    },
    params: {
      country: "US",
      currency: "USD",
      sort: "freshness",
      lang: "en-US",
      sizeSchema: "US",
      offset: "0",
      categoryId: "4209",
      limit: "48",
      store: "US",
    },
  })
    .then((response) => {
      const numCarousel = 10;
      const numMain = 8;
      const numFeatured = 4;

      for (let i = 0; i < numCarousel; i++) {
        itemsCarousel[
          i
        ].children[0].src = `https://${response.data.products[i].imageUrl}`;

        itemsCarousel[i].children[1].innerHTML = response.data.products[i].name;

        itemsCarousel[
          i
        ].children[2].innerHTML = `$${response.data.products[i].price.current.value}`;
      }

      for (let i = 0; i < numMain; i++) {
        itemsMain[i].children[0].children[0].src = `https://${
          response.data.products[i + numCarousel].imageUrl
        }`;

        itemsMain[i].children[1].innerHTML =
          response.data.products[i + numCarousel].name;

        itemsMain[i].children[2].innerHTML = `$${
          response.data.products[i + numCarousel].price.current.value
        }`;
      }

      for (let i = 0; i < numFeatured; i++) {
        itemsFeatured[i].children[0].src = `https://${
          response.data.products[i + numCarousel + numMain].imageUrl
        }`;

        itemsFeatured[i].children[1].children[0].innerHTML =
          response.data.products[i + numCarousel + numMain].name;
      }
    })
    .catch((error) => {
      clearContainer(carouselWrapper);
      clearContainer(productsWrapper);
      clearContainer(featuredWrapper);
      carouselWrapper.appendChild(errorMessage());
      productsWrapper.appendChild(errorMessage());
      featuredWrapper.appendChild(errorMessage());
      console.log(error);
    });
};

export const loadAdditionalData = (itemsAmount) => {
  let loadCounter = 0;

  const btnItems = document.getElementById("btn-items");

  btnItems.addEventListener("click", () => {
    const productsWrapper = document.getElementById("products-container");
    const itemsMain = placeholdersMain(productsWrapper, itemsAmount);

    const axios = require("axios");
    axios({
      method: "GET",
      url: "https://asos2.p.rapidapi.com/products/v2/list",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "asos2.p.rapidapi.com",
        "x-rapidapi-key": "dcf6400177msh6923d646ebad4f4p15c6f7jsn325ddc62d1b4",
        useQueryString: true,
      },
      params: {
        country: "US",
        currency: "USD",
        sort: "freshness",
        lang: "en-US",
        sizeSchema: "US",
        offset: loadCounter * itemsAmount,
        categoryId: "4210",
        limit: "4",
        store: "US",
      },
    })
      .then((response) => {
        for (let i = 0; i < itemsAmount; i++) {
          itemsMain[
            i
          ].children[0].children[0].src = `https://${response.data.products[i].imageUrl}`;

          itemsMain[i].children[1].innerHTML = response.data.products[i].name;

          itemsMain[
            i
          ].children[2].innerHTML = `$${response.data.products[i].price.current.value}`;
        }
        loadCounter++;

        console.log();
      })
      .then()
      .catch((error) => {
        const row =
          productsWrapper.children[productsWrapper.children.length - 1];
        console.log(row);
        clearContainer(row);
        productsWrapper.appendChild(errorMessage());
        console.log(error);
      });
  });
};

const placeholdersCarousel = (carouselWrapper) => {
  const itemsCarousel = [];
  for (let i = 0; i < 10; i++) {
    const item = carouselProduct();
    carouselWrapper.appendChild(item);
    itemsCarousel.push(item);
  }
  return itemsCarousel;
};

const placeholdersMain = (productsWrapper, amount) => {
  const itemsMain = [];

  const itemRow = document.createElement("div");
  itemRow.classList.add("row");
  productsWrapper.appendChild(itemRow);

  for (let i = 0; i < amount; i++) {
    const item = mainProduct();
    itemRow.appendChild(item);
    itemsMain.push(item);
  }
  return itemsMain;
};

const placeholdersFeatured = (featuredWrapper) => {
  const itemsFeatured = [];

  itemsFeatured.push(featuredItems(547, 630));
  itemsFeatured.push(featuredItems(380, 310));
  itemsFeatured.push(featuredItems(380, 310));
  itemsFeatured.push(featuredItems(769, 310));

  itemsFeatured.forEach((item) => featuredWrapper.appendChild(item));
  return itemsFeatured;
};

const clearContainer = (container) => {
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
};

const errorMessage = () => {
  const message = document.createElement("h1");
  message.classList.add("error__message");
  message.innerHTML = "Couldn't get data, try again later";
  return message;
};

const carouselProduct = () => {
  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("item");

  const itemImg = document.createElement("img");
  itemImg.classList.add("item__image");
  itemImg.src = "https://placekitten.com/268/338";

  const itemName = document.createElement("p");
  itemName.classList.add("item__name");
  itemName.innerHTML = "Product Name";

  const itemPrice = document.createElement("p");
  itemPrice.classList.add("item__price");
  itemPrice.innerHTML = "Product Price";

  itemWrapper.append(itemImg, itemName, itemPrice);

  return itemWrapper;
};

const mainProduct = () => {
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

  itemWrapper.append(imgWrapper, itemName, itemPrice);
  imgWrapper.appendChild(itemImg);

  return itemWrapper;
};

const featuredItems = (width, height) => {
  const itemWrapper = document.createElement("div");
  itemWrapper.classList.add("featured__item");

  const itemLabel = document.createElement("div");
  itemLabel.classList.add("featured__label");

  const itemImg = document.createElement("img");
  itemImg.classList.add("featured__image");
  itemImg.src = `https://placekitten.com/${width}/${height}`;

  const itemName = document.createElement("p");
  itemName.classList.add("featured__name");
  itemName.innerHTML = "Product Name";

  const itemButton = document.createElement("button");
  itemButton.classList.add("featured__button");
  itemButton.innerHTML = "Shop now";

  itemLabel.append(itemName, itemButton);
  itemWrapper.append(itemImg, itemLabel);

  return itemWrapper;
};
