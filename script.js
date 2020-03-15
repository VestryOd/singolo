'use strict'
window.onload = function() {
  //slider section
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

  // nav moving section
  const header = document.querySelector('.header-bg-wrap').offsetHeight;
  document.querySelector('.substrate').style.height = (header - 1) + "px";

  const navbarLinks = document.querySelectorAll('.navbar li a');
  navbarLinks.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      navbarLinks.forEach(el => el.classList.remove('selected'));
      e.target.classList.add('selected');

      const blockID = e.target.getAttribute('href');
      console.log(blockID);

      const elem = document.querySelector(blockID);
      console.dir(elem);
      // const dest = (elem.getBoundingClientRect().top + document.body.scrollTop) - header - 1;
      const dest = elem.offsetTop  - header + 1;
      // console.log(dest);

      window.scroll({
        top: dest,
        behavior: 'smooth',
      })
    })
  });

  // portfolio section
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioNav = document.querySelectorAll('.portfolio-tag');
  const portfolioParent = document.querySelector('.portfolio-content');
  portfolioNav.forEach(el => {
    el.addEventListener("click", (e) => {
      portfolioNav.forEach(item => item.classList.remove('portfolio-tag-selected'));
      el.classList.add('portfolio-tag-selected');

      // randomize rotfolio items
      const newOrder = shuffle(portfolioItems);

      deleteNods(portfolioItems);
      newOrder.forEach(el => {
        portfolioParent.append(portfolioItems[el]);
      });
    });
  });

    document.querySelector('.portfolio-content').addEventListener("click", (e) => {
    if (e.target.parentNode.classList.contains('portfolio-item')) {
      let elem = e.target.parentNode;
      if (elem.classList.contains('portfolio-item-selected')) {
        elem.classList.remove('portfolio-item-selected');
      } else {
        document.querySelectorAll('.portfolio-item').forEach(el => el.classList.remove('portfolio-item-selected'));
        elem.classList.add('portfolio-item-selected');
      }
    }
  });

  function deleteNods(arr) {
    arr.forEach(el => {
      el.remove()
    });
    return arr;
  }

  function shuffle(arr) {
    let indexArray = [];
    for(let i=0; i<arr.length; i++) {
      indexArray.push(i);
    }
    var j, temp;
    for (var i = indexArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = indexArray[j];
      indexArray[j] = indexArray[i];
      indexArray[i] = temp;
    }
    return indexArray;
  }

}



