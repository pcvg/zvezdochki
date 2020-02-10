import "./index.scss";

export default class Zvezdochki {
  constructor(el, options) {
    this.ratingEl = el;

    this.options = {
      activeClass: "active",
      votes: "votes",
      starDataAttr: "star",
      ratingDataAttr: "ratingValue",
      votedClassName: 'star-rating--blocked',
      voted: false
    };

    if (el && options) {
      this.options = Object.assign(this.options, options)
    }

    this.init();

  }

  submit(star) {
    let voteEvent = new CustomEvent('vote', {detail: star});
    this.ratingEl.dispatchEvent(voteEvent);
  }

  init() {
    this.setRating();

    if (!this.options.voted) {
      this.handleHover();
      this.addClickHandler();
    } else {
      this.blockVotes();
    }
  }

  blockVotes() {
    this.ratingEl.classList.add(this.options.votedClassName);
    this.options.voted = true;
  }

  setRating() {
    let initialRating = this.ratingEl.dataset[this.options.ratingDataAttr.toLowerCase()];
    let activeEl = this.ratingEl.querySelector('*[data-' + this.options.starDataAttr + '="' + initialRating + '"]')
    activeEl.classList.add(this.options.activeClass);
  }

  handleHover() {
    let stars = this.ratingEl.querySelectorAll("[data-" + this.options.starDataAttr + "]");
    this.ratingEl.addEventListener("mouseenter", () => {
      stars.forEach(el => {
        el.classList.remove(this.options.activeClass)
      })
    });
    this.ratingEl.addEventListener("mouseleave", () => {
      this.setRating()
    })
  }

  addClickHandler() {
    this.ratingEl.addEventListener('click', ev => {
      ev.preventDefault();
      ev.stopPropagation();

      if (ev.target.dataset[this.options.starDataAttr] && !this.options.voted) {
        ev.target.classList.add(this.options.activeClass);
        this.submit(ev.target.dataset[this.options.starDataAttr]);

        this.blockVotes();
      }
    });
  }
}

