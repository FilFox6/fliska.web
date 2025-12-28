document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. HAMBURGER MENU ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu-link');
  
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('open');
            menu.classList.toggle('open');
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                menu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- 2. PORTFOLIO POPUP (MODAL) ---
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioItems.length > 0 && modal) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                const title = this.getAttribute('data-title') || "Bez názvu";
                const desc = this.getAttribute('data-desc') || "";
                const src1 = this.getAttribute('data-src');
                const src2 = this.getAttribute('data-src2');
                const video = this.getAttribute('data-video');
                const mediaType = this.getAttribute('data-media');

                let mediaHtml = '<div class="modal-media-container">';

                // 1. První médium
                if (mediaType === 'image' && src1) {
                    mediaHtml += `<img src="${src1}" alt="${title}" style="margin-bottom: 20px;">`;
                } else if (mediaType === 'video' && src1) {
                    mediaHtml += `<iframe src="${src1}" allowfullscreen style="margin-bottom: 20px;"></iframe>`;
                }

                // 2. Druhá fotka
                if (src2) {
                    mediaHtml += `<img src="${src2}" alt="${title} - foto 2" style="margin-bottom: 20px;">`;
                }

                // 3. Přídavné video
                if (video) {
                    mediaHtml += `<iframe src="${video}" allowfullscreen style="margin-bottom: 20px;"></iframe>`;
                }

                mediaHtml += '</div>';

                modalBody.innerHTML = `
                    <h2>${title}</h2>
                    <p>${desc}</p>
                    ${mediaHtml}
                `;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // Zavírání okna křížkem
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modalBody.innerHTML = '';
            document.body.style.overflow = '';
        });
    }

    // Zavření kliknutím na pozadí
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            modalBody.innerHTML = '';
            document.body.style.overflow = '';
        }
    });
});