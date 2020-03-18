'use strict'
window.onload = function() {
  //slider section
  const slides = document.querySelectorAll('.slide');
  slides.forEach((el,i) => {
    if (i !== 0) {
      toggleClass(el, 'hidden');
    } else {
      toggleClass(el, 'showed');
    }
  });
  slides[0].classList.add('showed');
  let counter = 1;

  let bg = document.querySelector('.slider-bg-wrap');

  function changeSlide(index) {
    if (index < 1) {
      counter = slides.length;
    } else if (index > slides.length) {
      counter = 1;
    }
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('showed')) {
        setTimeout(() => {
          toggleClass(slides[i], 'showed')
          setTimeout(() => {
            toggleClass(slides[i], 'hidden')
          }, 500);
        }, 0);
      }
    }
    setTimeout(() => {
      toggleClass(slides[counter - 1], 'hidden')
      setTimeout(() => {
        toggleClass(slides[counter - 1], 'showed')
      }, 500);
    }, 0);
    bg.classList.toggle('slider-bg-blue');
  }

  function toggleClass(elem,className) {
    elem.classList.toggle(className);
    return elem;
  }

  document.querySelector('.slider-nav-wrapper').addEventListener('click', (e) => {
    if (e.target.classList.contains('left-arrow')) {
      counter -= 1;
      changeSlide(counter);
    } else {
      counter += 1;
      changeSlide(counter);
    }
  });

  document.querySelector('.vertical-display').addEventListener("click", function() {
    this.classList.toggle('display-off');
  });
  document.querySelector('.horizontal-display').addEventListener("click", function () {
    this.classList.toggle('display-off');
  });

  // nav moving section
  let header = document.querySelector('.header-bg-wrap').offsetHeight;
  document.querySelector('.substrate').style.height = (header - 1) + "px";

  const navbarLinks = document.querySelectorAll('.navbar li a');

  document.querySelector('.navbar').addEventListener('click', (e) => {
    if (e.target.classList.contains('navlink')) {
      e.preventDefault();

      navbarLinks.forEach(el => el.classList.remove('selected'));
      e.target.classList.add('selected');

      const blockID = e.target.getAttribute('href');

      const elem = document.querySelector(blockID);
      const dest = elem.offsetTop - header + 1;

      window.scroll({
        top: dest,
        behavior: 'smooth',
      })
    }
  });

  document.addEventListener('scroll', () => {
    handleScroll(header, navbarLinks);
  });

  function handleScroll(header, navlinks) {
    let currentPosition = window.scrollY;

    const blocks = document.querySelectorAll('.section-block');

    blocks.forEach(el => {
      if (el.offsetTop - header <= currentPosition && (el.offsetTop + el.offsetHeight - header) > currentPosition) {
        navlinks.forEach(link => {
          link.classList.remove('selected');
          if (el.getAttribute('id') === link.getAttribute('href').substring(1)) {
            link.classList.add('selected');
          }
        });
      } else if (currentPosition === 0) {
        navlinks.forEach(link => link.classList.remove('selected'));
        navlinks[0].classList.add('selected');
      }
    });
  }

  // portfolio section
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioNav = document.querySelectorAll('.portfolio-tag');
  const portfolioParent = document.querySelector('.portfolio-content');

  document.querySelector('.potfolio-tags').addEventListener("click", (e) => {
    if (e.target.classList.contains('portfolio-tag')) {
      togglePortfolioNav(e.target, portfolioNav);
      portfolioItemsShake(portfolioItems);
    }
  });

  document.querySelector('.portfolio-content').addEventListener("click", handleItemClick);

  function togglePortfolioNav(elem, portfolioNav) {
    portfolioNav.forEach(item => item.classList.remove('portfolio-tag-selected'));
    elem.classList.add('portfolio-tag-selected');
  }

  function portfolioItemsShake(portfolioItems) {
    const newOrder = shuffle(portfolioItems);

    portfolioItems.forEach(item => item.classList.add('portfolio-transition'));
    setTimeout(() => {
      deleteNods(portfolioItems);
      newOrder.forEach(el => {
        portfolioParent.append(portfolioItems[el]);
        portfolioItems.forEach(item => item.classList.remove('portfolio-transition'));
        portfolioItems.forEach(item => item.classList.add('portfolio-transition2'));
        setTimeout(() => portfolioItems.forEach(item => item.classList.remove('portfolio-transition2')), 300)
      });
    }, 300);
  }

  function handleItemClick(e) {
    if (e.target.parentNode.classList.contains('portfolio-item')) {
      let elem = e.target.parentNode;
      if (elem.classList.contains('portfolio-item-selected')) {
        elem.classList.remove('portfolio-item-selected');
      } else {
        document.querySelectorAll('.portfolio-item').forEach(el => el.classList.remove('portfolio-item-selected'));
        elem.classList.add('portfolio-item-selected');
      }
    }
  }

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
    let j, temp;
    for (let i = indexArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = indexArray[j];
      indexArray[j] = indexArray[i];
      indexArray[i] = temp;
    }
    return indexArray;
  }

  // feedback form
  const feedbackForm = document.forms.quote.addEventListener("submit", function(e) {
    e.preventDefault();
    let form = e.target;
    let data = getFormInfo(form);

    // generate & show modal
    modalBuild(data);
    // clear form
    form.reset();
  });

  function modalBuild(data) {
    let modalInner = makeModal(data);
    let modal = generateDiv("modal");
    modal.append(modalInner);
    let overlay = generateDiv("overlay");
    overlay.append(modal);
    overlay.classList.add('modal-view');

    setTimeout(() => {
      document.body.append(overlay);
      document.querySelector('.overlay').addEventListener("click", removeModal);
      setTimeout(() => {
        overlay.classList.remove('modal-view');
      }, 300);
    }, 0);
  }

  function getFormInfo(form) {
    let result = {};
    result.name = form.elements.name.value;
    result.mail = form.elements.mail.value;
    result.subject = form.elements.subject.value ? `Subject: ${form.elements.subject.value}` : 'Without subject';
    result.details = form.elements.details.value ? `Description: ${form.elements.details.value}` : 'Without description';
    return result;
  };

  function generateDiv(classes) {
    let div = document.createElement('div');
    div.classList.add(classes);
    return div;
  }

  function makeModal(data) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('modal-wrapper');
    let close = `<span class="modal-close-button"></span>`;
    let h3 = `<h3 class="modal-header">The letter was sent</h3>`;
    let h4 = `<h4 class="modal-subject">${data.subject}</h4>`;
    let p = `<p class="modal-description">${data.details}</p>`;
    let btn = `<div class="modal-button-wrapper"><button class="modal-button">ok</button></div>`;
    let inner = close + '' + h3 + '' + h4 + '' + p + '' + btn;
    wrapper.innerHTML = inner;
    return wrapper;
  }

  function removeModal(e) {
    if (e.target.classList.contains('overlay') || e.target.classList.contains('modal-close-button') || e.target.classList.contains('modal-button')) {
      setTimeout(() => {
        let overlay = document.querySelector('.overlay');
        overlay.classList.add('modal-view');
        setTimeout(() => {
          document.querySelector('.overlay').remove();
        }, 300);
      }, 0);
    }
  }
}



