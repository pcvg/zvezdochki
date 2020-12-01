let chai = require('chai');
let should = chai.should();

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

import Zvezdochki from "../src/Zvezdochki";

let testOptions = {
  elementClass: "emoji-rating",
  activeClass: "active",
  starDataAttr: "emoji",
  ratingDataAttr: "rating",
  votedClassName: 'emoji-rating--blocked',
  voted: false,
  fingerPrint: true
};

const STARS = `<div class="${testOptions.elementClass}" data-rating="hankey">
                <div class="${testOptions.elementClass}__list">
                  <span data-emoji="love"><span>😍</span></span>
                  <span data-emoji="yep"><span>😃</span></span>
                  <span data-emoji="maybe">😏</span>
                  <span data-emoji="nope">😐</span>
                  <span data-emoji="hankey">💩</span>
                </div>
              </div>`;

const DIST = `<link href="../dist/demo.d3b53871.css" rel="stylesheet">`;

const HTML = `<!DOCTYPE html>
  <html>
     <head>
     <title>Zvezdochki Tests</title>
     ${DIST}
     </head>
     <body>
      ${STARS}
    </body>
   </html>`;

describe("initialize with emoji", function() {
  let ratingEl, emojiClicked, starRating;

  before(function() {
    let DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});

    let window = DOM.window;
    let document = window.document;
    ratingEl = document.querySelector(`.${testOptions.elementClass}`)

    starRating = new Zvezdochki(ratingEl, testOptions);

    ratingEl.addEventListener("vote", function(ev) {
      emojiClicked = ev.detail.star;
    });
  });

  it("should initialize", function() {
    starRating.should.be.an('object');
  });

  it("should click on emojis", function() {
    let clickEvent = document.createEvent("HTMLEvents");
    clickEvent.initEvent("click", true, true);
    ratingEl.querySelector('span:nth-child(3)').dispatchEvent(clickEvent);

    emojiClicked.should.be.equal('maybe');
  });

  it("should click on emojis with nested elements", function() {
    starRating.unblockVotes();
    let clickEvent = document.createEvent("HTMLEvents");
    clickEvent.initEvent("click", true, true);
    ratingEl.querySelector('span:nth-child(2)').dispatchEvent(clickEvent);

    emojiClicked.should.be.equal('yep');
  });



});
