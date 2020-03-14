'use strict'
window.onload = function() {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((el,i) => {
    if (i !== 0) {
      addHidden(el);
    } else {
      addShowed(el);
    }
  });
  slides[0].classList.add('showed');
  let counter = 1;

  let prev = document.querySelector('.left-arrow');
  let next = document.querySelector('.right-arrow');
  let bg = document.querySelector('.slider-bg-wrap');

  function changeSlide(index) {
    if (index < 1) {
      counter = slides.length;
    } else if (index > slides.length) {
      counter = 1;
    }
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('showed')) {
        addHidden(removeShowed(slides[i]));
      }
    }
    addShowed(removeHidden(slides[counter - 1]));
    bg.classList.toggle('slider-bg-blue');
  }

  function addShowed(slide) {
    slide.classList.add('showed');
    return slide;
  }

  function removeShowed(slide) {
    slide.classList.remove('showed');
    return slide;
  }

  function addHidden(slide) {
    slide.classList.add('hidden');
    return slide;
  }

  function removeHidden(slide) {
    slide.classList.remove('hidden');
    return slide;
  }

  prev.addEventListener("click", function () {
    counter -= 1;
    changeSlide(counter);
  });
  next.addEventListener("click", function () {
    counter += 1;
    changeSlide(counter);
  });

  document.querySelector('.vertical-display').addEventListener("click", function() {
    this.classList.toggle('display-off');
  });
  document.querySelector('.horizontal-display').addEventListener("click", function () {
    this.classList.toggle('display-off');
  });

}



