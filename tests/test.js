let chai = require('chai');
let should = chai.should();

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const {Zvezdochki} = require("../dist/Zvezdochki.3283b0c3");

let testOptions = {
  elementClass: "star-rating",
  activeClass: "active",
  votes: "votes",
  starDataAttr: "star",
  ratingDataAttr: "ratingValue",
  votedClassName: 'star-rating--blocked',
  voted: true
};

const STARS = `<div class="${testOptions.elementClass} ${testOptions.elementClass}--basic" data-ratingValue="4">
          <ul class="${testOptions.elementClass}__list">
            <li data-star="5"></li>
            <li data-star="4"></li>
            <li data-star="3"></li>
            <li data-star="2"></li>
            <li data-star="1"></li>
          </ul>
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

  it("styles file exists", function() {
    try {
      let styles = require('../dist/Zvezdochki.3283b0c3');
    } catch (e) {
      return false;
    }
  });
});

describe('functionality', function() {
  let DOM, starsEl;

  context('initializing', function() {
    before(function() {
      DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});
      global.window = DOM.window;
      global.document = window.document;

      let options = {voted: testOptions.voted};

      starsEl = document.querySelector(`.${testOptions.elementClass}`);
      new Zvezdochki(starsEl, options);
    });

    it('should highlight the initial rating', function() {
      let activeStar = document.querySelector(`.${testOptions.elementClass} .${testOptions.activeClass}`);
      activeStar.dataset.star.should.equal('4')
    });

    it('cannot vote if blocked', function() {
      starsEl.classList.contains(testOptions.votedClassName).should.be.true;
    })
  });

  context('clicks', function() {
    before(function() {
      DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});
      let window = DOM.window;
      let document = window.document;
      global.vote = null;

      starsEl = document.querySelector(`.${testOptions.elementClass}`);

      new Zvezdochki(starsEl);

      let star = document.querySelector(`.${testOptions.elementClass}__list > li:nth-child(3)`);

      starsEl.addEventListener("vote", ev => {
        vote = ev.detail;
      });

      let clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);
      star.dispatchEvent(clickEvent)

    });

    it('should block votes', function() {
      starsEl.classList.contains(testOptions.votedClassName).should.be.true;
    });

    it('should dispatch event', function() {
      vote.should.be.equal('3')
    });
  })
});
