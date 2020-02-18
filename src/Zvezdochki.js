export class Zvezdochki {
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

    this.stars = this.ratingEl.querySelectorAll("[data-" + this.options.starDataAttr + "]");

    this.init();
  }

  init() {
    this.setInitialRating();

    if (!this.options.voted) {
      this.handleHover();
      this.addClickHandler();
    } else {
      this.blockVotes();
    }
  }

  submit(star) {
    let voteEvent = new CustomEvent('vote', {detail: star});
    this.ratingEl.dispatchEvent(voteEvent);
  }

  blockVotes() {
    this.ratingEl.classList.add(this.options.votedClassName);
    this.options.voted = true;
    this.ratingEl.style.pointerEvents = false;
  }

  setInitialRating() {
    let initialRating = this.ratingEl.dataset[this.options.ratingDataAttr.toLowerCase()];
    this.setActiveStar(initialRating);
  }

  setActiveStar(rating) {
    let activeEl = this.ratingEl.querySelector('*[data-' + this.options.starDataAttr + '="' + rating + '"]');
    activeEl.classList.add(this.options.activeClass);
  }

  handleHover() {
    this.stars.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.stars.forEach(el => {
          el.classList.remove(this.options.activeClass);
        })
      });

      el.addEventListener("mouseleave", () => {
        this.setInitialRating();
      })
    });
  }

  addClickHandler() {
    this.ratingEl.addEventListener('click', ev => {
      ev.preventDefault();
      ev.stopPropagation();

      if (ev.target.dataset[this.options.starDataAttr] && !this.options.voted) {
        let rating = ev.target.dataset[this.options.starDataAttr];
        ev.target.classList.add(this.options.activeClass);
        this.ratingEl.dataset[this.options.ratingDataAttr.toLowerCase()] = rating;

        this.submit(rating);

        this.blockVotes();
      }
    });
  }
}

