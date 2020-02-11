# Zvezdochki :star: :star: :star: :star: :star:
 (from Russian - _tiny stars_.)

The component for easy creation of star rating components 

[DEMO PAGE IS THERE](https://pcvg.github.io/zvezdochki/)

## Getting Started

Getting Started info goes there :-)

### Installing

A step by step instruction

### Usage

```
yarn add zvezdochki
```

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
import Zvezdochki from "zvezdochki";

let ratingEl = document.querySelector(".star-rating");

new Zvezdochki(ratingEl);

ratingEl.addEventListener("vote", ev => {
  console.log(ev.detail) //star number
});
```

More Examples and Documentation you can find on the [DEMO Page](https://pcvg.github.io/zvezdochki/)

### Building

```yarn build```


### Testing

```yarn test```

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
