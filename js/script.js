document.addEventListener('DOMContentLoaded', () => {

  const images = Array.from(document.querySelectorAll('.works-grid img'));
  const lightbox = document.getElementById('lightbox-adv');
  const lightboxImg = document.getElementById('lightbox-adv-img');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

function animateSlide(direction) {
  const outClass = direction === 'next' ? 'out-left' : 'out-right';
  const inClass = direction === 'next' ? 'in-right' : 'in-left';

  lightboxImg.className = '';
  lightboxImg.classList.add(outClass);

  setTimeout(() => {
    currentIndex =
      direction === 'next'
        ? (currentIndex + 1) % images.length
        : (currentIndex - 1 + images.length) % images.length;

    lightboxImg.src = images[currentIndex].src;
    lightboxImg.className = '';
    lightboxImg.classList.add(inClass);

    requestAnimationFrame(() => {
      lightboxImg.className = '';
      lightboxImg.classList.add('reset');
    });
  }, 350);
}

function showNext() {
  animateSlide('next');
}

function showPrev() {
  animateSlide('prev');
}

  images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('show')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', e => {
  if (!lightbox.classList.contains('show')) return;
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', e => {
  if (!lightbox.classList.contains('show')) return;
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance < 0) {
    showNext();
  } else {
    showPrev();
  }
}

  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(0.96)';
      card.style.boxShadow = 'inset 0 8px 15px rgba(0,0,0,0.25)';
      card.classList.add('highlight');
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
      card.style.boxShadow = 'none';
      card.classList.remove('highlight');
    });

    card.addEventListener('mousedown', () => {
      card.style.transform = 'scale(0.94)';
    });

    card.addEventListener('mouseup', () => {
      card.style.transform = 'scale(0.96)';
    });
  });
});

const inputs = document.querySelectorAll('.contact-form [required]');

inputs.forEach(input => {
    input.addEventListener('invalid', () => {
        input.setCustomValidity('Заповніть це поле');
    });

    input.addEventListener('input', () => {
        input.setCustomValidity('');
    });
});

const emailInput = document.getElementById('email');

emailInput.addEventListener('input', () => {
    if (emailInput.value === '') {
        emailInput.setCustomValidity('');
        return;
    }

    if (!emailInput.value.includes('@')) {
        emailInput.setCustomValidity(
            'Додайте символ "@" у електронну адресу. У рядку "' +
            emailInput.value +
            '" відсутній "@"'
        );
        return;
    }

const parts = emailInput.value.split('@');
    if (parts[1] === '') {
        emailInput.setCustomValidity(
            'Введіть частину адреси після символу "@". Адреса "' +
            emailInput.value +
            '" — неповна'
        );
        return;
    }

        emailInput.setCustomValidity('');
});



