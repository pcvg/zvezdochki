export default class {
  constructor(el, options) {
    this.ratingEl = el;

    this.options = {
      activeClass: "active",
      starDataAttr: "star",
      ratingDataAttr: "ratingValue",
      votedClassName: 'star-rating--blocked',
      id: null,
      voted: false,
      localStorageName: null
    };

    if (el && options) {
      this.options = Object.assign(this.options, options)
    }

    if (this.options.localStorageName) {
      this.storage = window.localStorage.getItem(this.options.localStorageName);
      this.votedIds = JSON.parse(this.storage) || [];
    }

    this.stars = this.ratingEl.querySelectorAll("[data-" + this.options.starDataAttr + "]");

    this.init();
  }

  init() {
    this.setInitialRating();

    if (!this.isVoted()) {
      this.handleHover();
      this.addClickHandler();
    } else {
      this.blockVotes();
    }
  }

  submit(star) {
    let eventData = {
      star: star
    };

    if (this.options.localStorageName) {
      this.addVoteToStorage();
    }

    let voteEvent = new CustomEvent('vote', {detail: eventData});
    this.ratingEl.dispatchEvent(voteEvent);
  }

  blockVotes() {
    this.ratingEl.classList.add(this.options.votedClassName);
    this.options.voted = true;
    this.ratingEl.style.pointerEvents = false;
  }

  unblockVotes() {
    this.handleHover();
    this.addClickHandler();

    this.ratingEl.classList.remove(this.options.votedClassName);
    this.options.voted = false;
    this.ratingEl.style.pointerEvents = '';
  }

  isVoted() {
    if (this.options.voted) {
      return true;
    }

    if (this.options.localStorageName && this.votedIds) {
      let id = this.options.id || 1;
      return this.votedIds.includes(id);
    }
  }

  addVoteToStorage() {
    let id = this.options.id || 1;
    this.votedIds = [...this.votedIds, id];
    window.localStorage.setItem(this.options.localStorageName, JSON.stringify(this.votedIds));
  }

  setInitialRating() {
    let initialRating = this.ratingEl.dataset[this.options.ratingDataAttr.toLowerCase()];
    this.setActiveStar(initialRating);
  }

  setActiveStar(rating) {
    if (rating && rating !== "0") {
      let activeEl = this.ratingEl.querySelector('*[data-' + this.options.starDataAttr + '="' + rating + '"]');
      activeEl.classList.add(this.options.activeClass);
    }
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
      let target;

      if (ev.target.dataset[this.options.starDataAttr]) {
        target = ev.target
      } else {
        target = ev.target.closest(`[data-${this.options.starDataAttr}]`)
      }

      if (!target) {
        return;
      }

      if (target.dataset[this.options.starDataAttr] && !this.options.voted) {
        let rating = target.dataset[this.options.starDataAttr];
        target.classList.add(this.options.activeClass);
        this.ratingEl.dataset[this.options.ratingDataAttr.toLowerCase()] = rating;

        this.submit(rating);

        this.blockVotes();
      }
    });
  }
}
