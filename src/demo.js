import "./demo.scss";
import Zvezdochki from "./index";

require("microlight");

(function BasicUsage() {
  let output = document.querySelector('.output1');

  let ratingEl = document.querySelector(".star-rating");

  new Zvezdochki(ratingEl);

  ratingEl.addEventListener("vote", ev => {
    output.innerText = "Clicked = " + ev.detail;
  });
})();
