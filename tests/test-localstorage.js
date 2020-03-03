let chai = require('chai');
let should = chai.should();
let expect = require('chai').expect;

const jsdom = require("jsdom");
const {JSDOM} = jsdom;

import Zvezdochki from "../src/Zvezdochki";

global.window = {};
import 'mock-local-storage';
window.localStorage = global.localStorage;

let testOptions = {
  elementClass: "star-rating1",
  activeClass: "active",
  votes: "votes",
  starDataAttr: "star",
  ratingDataAttr: "ratingValue",
  votedClassName: 'star-rating--blocked',
  voted: false,
  fingerPrint: true,
  id: null,
  localStorageName: 'votes'
};

const STARS = `<div class="${testOptions.elementClass} ${testOptions.elementClass}--storage" data-id="321" data-ratingValue="4">
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

describe("initialize with localstorage", function() {
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

describe('functionality', function() {
  let DOM, starsEl, star;

  context('localstorage', function() {
    before(function() {

      DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});
      let window = DOM.window;
      let document = window.document;

      starsEl = document.querySelector(`.${testOptions.elementClass}`);

      testOptions.id = starsEl.dataset.id;

      let zvezdochki = new Zvezdochki(starsEl, testOptions);

      zvezdochki.addVoteToStorage();
    });

    it('add vote to localStorage', function() {
      expect(window.localStorage).to.have.deep.property(testOptions.localStorageName);
      expect(typeof(JSON.parse(window.localStorage[testOptions.localStorageName]))).equal('object');
    });
  });

  context('submit new vote to localstorage', function() {
    before(function() {

      DOM = new JSDOM(HTML, {resources: "usable", runScripts: "dangerously"});
      let window = DOM.window;
      let document = window.document;

      starsEl = document.querySelector(`.${testOptions.elementClass}`);

      let zvezdochki = new Zvezdochki(starsEl, testOptions);

      zvezdochki.submit(4);
    });

    it('submited', function() {
      JSON.parse(window.localStorage[testOptions.localStorageName]).length.should.equal(2);
    });
  });
});
