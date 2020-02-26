# Zvezdochki :star: :star: :star: :star: :star: [![Coverage Status](https://coveralls.io/repos/github/pcvg/zvezdochki/badge.svg?branch=master)](https://coveralls.io/github/pcvg/zvezdochki?branch=master)
 (from Russian - _tiny stars_.)

The component for easy creation of star rating components

[DEMO PAGE IS THERE](https://pcvg.github.io/zvezdochki/)

## Getting Started

Getting Started info goes there :-)

### Installing

A step by step instruction

### Usage

`yarn add @savingsunited/zvezdochki`

Or
`npm add @savingsunited/zvezdochki
`

```html
<div class="star-rating star-rating--basic" data-ratingValue="4">
  <ul class="star-rating__list">
    <li data-star="5"></li>
    <li data-star="4"></li>
    <li data-star="3"></li>
    <li data-star="2"></li>
    <li data-star="1"></li>
  </ul>
</div>
```

```javascript
import Zvezdochki from "@savingsunited/zvezdochki";
require("@savingsunited/zvezdochki/dist/Zvezdochki.5e2a2fb4.css"); //If you need css

let ratingEl = document.querySelector(".star-rating");

new Zvezdochki(ratingEl);

ratingEl.addEventListener("vote", ev => {
  console.log(ev.detail.star) //star number
});
```

More Examples and Documentation you can find on the [DEMO Page](https://pcvg.github.io/zvezdochki/)

### Building

```yarn build```


### Testing

```yarn test```

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
