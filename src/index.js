import "./styles/style.scss";
import * as Module from "./scripts";

window.addEventListener("DOMContentLoaded", (event) => {
  Module.getInitialData();
  Module.loadAdditionalData(4);
  Module.scrollToTop();
  Module.setCurrentDate();
  Module.carouselControll();
});
