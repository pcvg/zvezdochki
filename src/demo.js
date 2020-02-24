import "./demo.scss";
import {Zvezdochki} from "./Zvezdochki";

require("microlight");

(function BasicUsage() {
  let output = document.querySelector('.output1');

  let ratingEl = document.querySelector(".star-rating--basic");

  new Zvezdochki(ratingEl);

  ratingEl.addEventListener("vote", ev => {
    output.innerText = "Clicked = " + ev.detail.star;
  });
})();

(function AdvancedUsage() {
  let output = document.querySelector('.output2');

  let ratingEl = document.querySelector(".emoji-rating");

  let options = {
    activeClass: "active",
    starDataAttr: "emoji",
    ratingDataAttr: "rating",
    votedClassName: 'emoji-rating--blocked',
    voted: true,
    fingerPrint: true,
  };

  let emojisRating = new Zvezdochki(ratingEl, options);

  ratingEl.addEventListener("vote", ev => {
    output.innerText = "Clicked = " + ev.detail.star + ". \n Browser fingerprint is = " + ev.detail.fingerPrint;
  });

  let unblockBtn = document.querySelector('.btn--unblock');

  unblockBtn.addEventListener('click', () => {
    emojisRating.unblockVotes();
  });
})();
