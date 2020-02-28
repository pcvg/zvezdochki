let chai = require('chai');
let should = chai.should();

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const {Zvezdochki} = require("../src/Zvezdochki");

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
                  <span data-emoji="love">😍</span>
                  <span data-emoji="yep">😃</span>
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

let starRating;

describe("initialize", function() {
  before(function() {
    let DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});

    let window = DOM.window;
    let document = window.document;

    starRating = new Zvezdochki(document.querySelector(`.${testOptions.elementClass}`), testOptions);
  });

  it("should initialize", function() {
    starRating.should.be.an('object');
  });

});
