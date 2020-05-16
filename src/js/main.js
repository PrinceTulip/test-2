window.addEventListener('DOMContentLoaded', () => {
  (function () {
    const wrapper = document.querySelector('.main');
    const overlay = document.querySelector('.overlay');

    const gallery = document.querySelector('.gallery');
    const galleryContainer = document.querySelector('.gallery__imgs');
    const galleryBigImg = document.querySelector('.gallery__img-big');
    const close = document.querySelector('.gallery__close');
    const galleryPrev = document.querySelector('.gallery__prev');
    const galleryNext = document.querySelector('.gallery__next');

    const imgs = Array.from(document.querySelectorAll('.main img'));
    let gallerySmallImgs;
    let galleryIndex = 0;

    wrapper.addEventListener('click', onImgClick);
    close.addEventListener('click', onCloseClick);
    galleryContainer.addEventListener('click', onSmallImgClick);
    galleryPrev.addEventListener('click', onPrevImg);
    galleryNext.addEventListener('click', onNextImg);

    function onCloseClick(e) {
      e.preventDefault();
      overlay.classList.remove('overlay--show');
    }

    function onNextImg(e) {
      e.preventDefault();
      showGallery(galleryIndex += 1);
    }

    function onPrevImg(e) {
      e.preventDefault();
      showGallery(galleryIndex -= 1);
    }

    function onSmallImgClick(e) {
      e.preventDefault();

      const target = e.target;
      galleryIndex = +target.dataset.gallery_index;

      showGallery(galleryIndex);
    }

    function onImgClick(e) {
      e.preventDefault();
      const target = e.target;
      if (target.tagName === 'IMG') {
        hideGallery();

        galleryIndex = +target.dataset.gallery_index;
        overlay.classList.add('overlay--show');

        showGallery(galleryIndex);
      }
    }

    function hideGallery() {
      gallerySmallImgs.forEach((item) => {
        item.classList.remove('gallery__img--active');
      });
    }

    function showGallery(i) {
      if (i > gallerySmallImgs.length - 1) {
        galleryIndex = 0;
        i = 0;
      } else if (i < 0) {
        galleryIndex = gallerySmallImgs.length - 1;
        i = gallerySmallImgs.length - 1;
      }

      hideGallery();

      const src = imgs[i].getAttribute('src');

      gallerySmallImgs[i].classList.add('gallery__img--active');
      galleryBigImg.setAttribute('src', src);
    }

    function initGallery() {
      const frag = document.createDocumentFragment();

      imgs.forEach((item, i) => {
        item.dataset.gallery_index = i;

        const elem = item.cloneNode(true);
        elem.classList.add('gallery__img');
        frag.appendChild(elem);
      });

      galleryContainer.appendChild(frag);
      gallerySmallImgs = Array.from(galleryContainer.children)
    }

    initGallery();
  }());
});