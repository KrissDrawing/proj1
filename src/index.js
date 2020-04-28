import "./styles/style.scss";
import * as Module from "./scripts";

window.addEventListener("DOMContentLoaded", (event) => {
  Module.scrollToTop();
  Module.displayItems(4);
  Module.setCurrentDate();
});
