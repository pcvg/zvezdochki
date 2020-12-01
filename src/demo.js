import "./demo.scss";
import Zvezdochki from "./Zvezdochki";

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
    unblockBtn.innerText = "Unblocked";
    unblockBtn.setAttribute('disabled', 'disabled')
    emojisRating.unblockVotes();
  });
})();

(function LocalStorage() {
  let output = document.querySelector('.output3');

  let ratingEl = document.querySelector('.star-rating--storage');

  let clearStorageBtn = document.querySelector('.btn--clear-storage');

  let options = {
    id: ratingEl.dataset.id,
    localStorageName: 'votes'
  };

  new Zvezdochki(ratingEl, options);

  ratingEl.addEventListener('vote', ev => {
    output.innerText = "Clicked = " + ev.detail.star + ". \n  LocalStorage content is = " + window.localStorage.getItem('votes');
  });

  clearStorageBtn.addEventListener('click', ()=>{
    window.localStorage.clear();
    window.location.reload();
  })
})();
