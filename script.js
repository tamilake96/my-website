const modal = document.getElementById('modal');
const modalTitle = modal.querySelector('#modalTitle');
const modalBody = modal.querySelector('#modalBody');
const closeBtn = modal.querySelector('.closeModalBtn'); // Must match CSS

document.querySelectorAll('.openModalBtn').forEach(button => {
  button.addEventListener('click', () => {
    const modalType = button.classList.contains('recipe-modal') ? 'recipe' :
                      button.classList.contains('image-modal') ? 'image' : 'default';

    modalTitle.textContent = button.getAttribute('data-title') || 'No Title';

    if (modalType === 'recipe') {
      const bodyJSON = button.getAttribute('data-body');
      try {
        const body = JSON.parse(bodyJSON);
        let html = '';

        if (body.ingredients && Array.isArray(body.ingredients)) {
          html += '<h3>Ingredients:</h3><ul class="two-column-list">';
          body.ingredients.forEach(ingredient => {
            html += `<li>${ingredient}</li>`;
          });
          html += '</ul>';
        }

        if (body.directions && Array.isArray(body.directions)) {
          html += '<h3>Directions:</h3><ol>';
          body.directions.forEach(step => {
            html += `<li>${step}</li>`;
          });
          html += '</ol>';
        }

        modalBody.innerHTML = html || 'No content available.';
      } catch (e) {
        modalBody.textContent = 'Invalid recipe data.';
      }

    } else if (modalType === 'image') {
      const imageUrl = button.getAttribute('data-image');
      const description = button.getAttribute('data-description') || '';

      modalBody.innerHTML = `
        <img src="${imageUrl}" alt="${modalTitle.textContent}" style="max-width:100%; height:auto;">
        <p>${description}</p>
      `;
    } else {
      modalBody.textContent = button.getAttribute('data-body') || 'No content available.';
    }

    // Remove any previous modal type classes
    modal.classList.remove('modal-image', 'modal-recipe');

    // Add image-specific class if needed
    if (modalType === 'image') {
      modal.classList.add('modal-image');
    }

    // ✅ SHOW the modal
    modal.classList.add('active');
  });
});

// Close modal when "×" is clicked
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Close modal when clicking outside the content
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active'); // Hide modal on close button click
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active'); // Hide modal when clicking outside content
  }
});

/*For ToC in Books*/
document.querySelectorAll('.flipbook-toc a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = parseInt(link.getAttribute('data-page'), 10);
    if (!isNaN(page)) {
      // Change this line to match your flipbook instance:
      $('#flipbook').turn('page', page);
    }
  });
});

/*Download Resume PDF*/
document.getElementById('downloadBtn').addEventListener('click', function () {
    const a = document.createElement('a');
    a.href = 'files/TamiLake_Resume.pdf';
    a.setAttribute('download', 'TamiLake_Resume.pdf');
    a.click();
});

function initializeResponsiveFlipbook() {
  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  
  const bookWidth = Math.min(windowWidth - 30, 900);
  const bookHeight = Math.min(windowHeight - 50, 600);
  
  const $flipbook = $('#flipbook');

  $flipbook.css({
    width: bookWidth,
    height: bookHeight
  });

  if (!$flipbook.data('turn')) {
    $flipbook.turn({
      width: bookWidth,
      height: bookHeight,
      autoCenter: true
    });
  } else {
    $flipbook.turn('size', bookWidth, bookHeight);
  }

  // Only set wrapper height if wider than mobile breakpoint
  if(windowWidth > 520) {
    $('.flipbook-wrapper').css('height', bookHeight + 20 + 'px');
  } else {
    $('.flipbook-wrapper').css('height', '');
  }
}


// Initialize flipbook on page load
window.addEventListener('load', initializeResponsiveFlipbook);

// Resize flipbook on window resize with debounce
window.addEventListener('resize', () => {
  clearTimeout(window._resizeTimeout);
  window._resizeTimeout = setTimeout(() => {
    initializeResponsiveFlipbook();
  }, 150);
});

//OPEN LIGHTBOX
function openLightbox(imgElement) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  
  lightboxImg.src = imgElement.src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
