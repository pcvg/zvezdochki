let chai = require('chai');
let should = chai.should();

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const {Zvezdochki} = require("../src/Zvezdochki");

let testOptions = {
  elementClass: "star-rating1",
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
  })
});


describe('functionality', function() {
  let DOM, starsEl, star;

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

      star = document.querySelector(`.${testOptions.elementClass}__list > li:nth-child(3)`);

      starsEl.addEventListener("vote", ev => {
        vote = ev.detail.star;
      });

      let clickEvent = document.createEvent("HTMLEvents");
      clickEvent.initEvent("click", true, true);
      star.dispatchEvent(clickEvent);

      let mouseenterEvent = document.createEvent("HTMLEvents");
      mouseenterEvent.initEvent("mouseenter", true, true);
      star.dispatchEvent(mouseenterEvent);

    });

    it('should block votes', function() {
      starsEl.classList.contains(testOptions.votedClassName).should.be.true;
    });

    it('should dispatch event', function() {
      vote.should.be.equal('3');
    });

    it('should delete active class', function() {
      star.classList.contains(testOptions.activeClass).should.be.false;
    });
  });

  context('mouse leave', function() {
    before(function() {
      DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});
      let window = DOM.window;
      let document = window.document;

      starsEl = document.querySelector(`.${testOptions.elementClass}`);

      star = document.querySelector(`.${testOptions.elementClass}__list > li:nth-child(2)`);

      let zvezdochki = new Zvezdochki(starsEl);

      zvezdochki.unblockVotes();

      let mouseleaveEvent = document.createEvent("HTMLEvents");
      mouseleaveEvent.initEvent("mouseleave", true, true);
      star.dispatchEvent(mouseleaveEvent);

    });

    it('should unblock votes', function() {
      starsEl.classList.contains(testOptions.votedClassName).should.be.false;
    });

    it('should return active class', function() {
      star.classList.contains(testOptions.activeClass).should.be.true;
    });

  });

});
