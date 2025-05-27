document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carouselContainer');
    const items = document.querySelectorAll('.carousel-item');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = index === 0 ? 'indicator active' : 'indicator';
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    let currentSlide = 0;
    const maxSlides = items.length;
    
    function goToSlide(slideIndex) {
        items[currentSlide].classList.remove('active');
        indicatorsContainer.children[currentSlide].classList.remove('active');
        
        currentSlide = slideIndex;
        
        items[currentSlide].classList.add('active');
        indicatorsContainer.children[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => {
        let prevSlide = (currentSlide - 1 + maxSlides) % maxSlides;
        goToSlide(prevSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        let nextSlide = (currentSlide + 1) % maxSlides;
        goToSlide(nextSlide);
    });
    
    let slideInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % maxSlides;
        goToSlide(nextSlide);
    }, 5000);
    
    const pauseAutoplay = () => {
        clearInterval(slideInterval);
        setTimeout(() => {
            slideInterval = setInterval(() => {
                let nextSlide = (currentSlide + 1) % maxSlides;
                goToSlide(nextSlide);
            }, 5000);
        }, 10000);
    };
    
    prevBtn.addEventListener('click', pauseAutoplay);
    nextBtn.addEventListener('click', pauseAutoplay);
    indicatorsContainer.addEventListener('click', pauseAutoplay);
    
    const carousel = document.querySelector('.comic-carousel');
    carousel.addEventListener('mouseover', () => {
        items[currentSlide].style.transform = 'scale(1.02) rotateY(0deg)';
    });
    
    carousel.addEventListener('mouseout', () => {
        items[currentSlide].style.transform = 'rotateY(0deg)';
    });
    
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const effects = ['POW!', 'BOOM!', 'WHAM!', 'ZAP!', 'BAM!'];
            const effect = document.createElement('div');
            effect.className = 'comic-effect';
            effect.innerText = effects[Math.floor(Math.random() * effects.length)];
            
            const rect = this.getBoundingClientRect();
            const randomOffset = Math.random() * 100 - 50;
            effect.style.top = `${rect.top - 100 + randomOffset}px`;
            effect.style.left = `${rect.left + rect.width / 2 + randomOffset}px`;
            
            document.body.appendChild(effect);
            
            this.classList.add('shake-animation');
            
            setTimeout(() => {
                effect.remove();
                this.classList.remove('shake-animation');
            }, 500);
            
            openComicModal(this);
        });
    });
    
    const modal = document.getElementById('comicModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close');
    const closeModalBtn = document.getElementById('closeModal');
    
    function openComicModal(button) {
        const card = button.closest('.comic-card');
        const title = card.querySelector('.card-title').innerText;
        const text = card.querySelector('.card-text').innerText;
        const imgSrc = card.querySelector('.card-img').src;

        const modalSection = card.querySelector('.details-list');
        const modalSectionHTML = modalSection ? modalSection.innerHTML : '';
        
        modalContent.innerHTML = `
            <style>
                .modal-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                }
                
                .modal-image-container {
                    padding-left: 25px;
                    flex: 1;
                    min-width: 300px;
                }
                
                .modal-image {
                    width: 90%;
                    border-radius: 5px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                
                .modal-info-container {
                    flex: 2;
                    min-width: 300px;
                }
                
                .modal-comic-title {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 2rem;
                    margin-bottom: 15px;
                    color: var(--marvel-red);
                }
                
                .modal-description {
                    color: black;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                
                .modal-section {
                    color: black;
                    list-style: none;
                    padding-bottom: 5px;
                }
                
                .modal-section-title {
                    color: black;
                    font-family: 'Oswald', sans-serif;
                    margin-bottom: 10px;
                }
            </style>
            
            <div class="modal-container">
                <div class="modal-image-container">
                    <img src="${imgSrc}" alt="${title}" class="modal-image">
                </div>
                <div class="modal-info-container">
                    <h3 class="modal-comic-title">${title}</h3>
                    <p class="modal-description">${text}</p>
                    
                    <div class="modal-section">
                        <h4 class="modal-section-title">DETALLES:</h4>
                        ${modalSectionHTML}
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    const elements = document.querySelectorAll('.comic-card, .character-card, .section-title, .newsletter');
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
            rect.bottom >= 0
        );
    }
    
    function handleScrollAnimations() {
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in-up', 'animated');
            }
        });
    }
    
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    handleScrollAnimations();
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            const star = document.createElement('div');
            star.className = 'impact-star';
            star.style.position = 'absolute';
            star.style.top = '-10px';
            star.style.left = '50%';
            star.style.transform = 'translateX(-50%)';
            star.style.zIndex = '-1';
            star.style.opacity = '0.3';
            
            this.style.position = 'relative';
            this.appendChild(star);
            
            setTimeout(() => {
                star.remove();
            }, 300);
        });
    });
    
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            const name = this.querySelector('.character-name').innerText;
            
            let sound;
            switch(name) {
                case 'SPIDER-MAN':
                    sound = 'THWIP!';
                    break;
                case 'GHOST RIDER':
                    sound = 'BURN!';
                    break;
                case 'BLADE':
                    sound = 'SLASH!';
                    break;
                case 'DAREDEVIL':
                    sound = 'RADAR!';
                    break;
                default:
                    sound = 'WHAM!';
            }
            
            const effect = document.createElement('div');
            effect.className = 'comic-effect';
            effect.innerText = sound;
            effect.style.fontSize = '2rem';
            effect.style.opacity = '0.7';
            
            const rect = this.getBoundingClientRect();
            effect.style.top = `${rect.top + 50}px`;
            effect.style.left = `${rect.left + rect.width / 2}px`;
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 500);
        });
    });

    const navButtons = {
        'navHome': '#',
        'navComics': '#content-section',
        'navCharacters': '#character-section',
        'navMovies': '#',
        'navNews': '#newsletter',
        'navContact': '#footer'
    };
    
    for (const [id, href] of Object.entries(navButtons)) {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const effect = document.createElement('div');
                effect.className = 'comic-effect';
                effect.innerText = '¡CLICK!';
                effect.style.fontSize = '2rem';
                
                const rect = this.getBoundingClientRect();
                effect.style.top = `${rect.top - 30}px`;
                effect.style.left = `${rect.left + rect.width / 2}px`;
                
                document.body.appendChild(effect);
                
                setTimeout(() => {
                    effect.remove();
                }, 500);
                
                if (href !== '#') {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            alert(`Has hecho clic en: ${this.textContent}`);
        });
    });

    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.classList.add('shake-animation');
            
            setTimeout(() => {
                this.classList.remove('shake-animation');
            }, 500);
            
            alert(`Siguiendo en redes sociales: ${this.textContent}`);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextBtn.click();
        } else if (touchEndX > touchStartX + 50) {
            prevBtn.click();
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const characterCards = document.querySelectorAll('.character-card');
    
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const characterName = this.querySelector('.character-name').textContent.trim();
            
            let sound;
            switch(characterName) {
                case 'SPIDER-MAN':
                    sound = 'THWIP!';
                    break;
                case 'GHOST RIDER':
                    sound = 'BURN!';
                    break;
                case 'BLADE':
                    sound = 'SLASH!';
                    break;
                case 'DAREDEVIL':
                    sound = 'RADAR!';
                    break;
                default:
                    sound = 'WHAM!';
            }
            
            createSoundEffect(sound, this);
        });
    });
    
    function createSoundEffect(text, element) {
        const effect = document.createElement('div');
        effect.className = 'comic-effect';
        effect.textContent = text;
        effect.style.fontSize = '2.5rem';
        effect.style.color = 'var(--marvel-red)';
        effect.style.textShadow = '2px 2px 0 black';
        effect.style.zIndex = '1000';
        
        const rect = element.getBoundingClientRect();
        effect.style.position = 'fixed';
        effect.style.top = `${rect.top + 100}px`;
        effect.style.left = `${rect.left + rect.width / 2}px`;
        effect.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 1000);
    }
});

function setupReadComicButtons() {
    const readComicBtn = document.getElementById('readComicBtn');
    const modal = document.getElementById('comicModal');
    
    if (readComicBtn) {
        readComicBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener información del cómic desde el modal
            const modalContent = document.getElementById('modalContent');
            const comicTitle = modalContent.querySelector('.modal-comic-title').innerText;
            
            // Determinar qué cómic es basado en el título
            let comicId;
            switch (comicTitle) {
                case "AMAZING SPIDER-MAN: BLOOD HUNT":
                    comicId = "amazing-spiderman";
                    break;
                case "DOCTOR STRANGE: DAMNATION":
                    comicId = "doctor-strange";
                    break;
                case "DAREDEVIL: KNOW FEAR":
                    comicId = "daredevil";
                    break;
                case "SPIRITS OF VENGEANCE":
                    comicId = "spirits-vengeance";
                    break;
                default:
                    // Si no coincide con ninguno de los títulos conocidos
                    // podemos usar un valor genérico o guardar la información en sessionStorage
                    sessionStorage.setItem('selectedComicTitle', comicTitle);
                    
                    // Guardar la imagen de portada como primera página
                    const comicCover = modalContent.querySelector('.modal-image').src;
                    const comicPages = [
                        comicCover,
                        "/api/placeholder/800/1200?text=Página+2",
                        "/api/placeholder/800/1200?text=Página+3",
                        "/api/placeholder/800/1200?text=Página+4",
                        "/api/placeholder/800/1200?text=Página+5",
                        "/api/placeholder/800/1200?text=Página+6"
                    ];
                    sessionStorage.setItem('selectedComicPages', JSON.stringify(comicPages));
                    
                    // Redirigir al lector sin ID específico
                    window.location.href = 'marvel-comic-reader.html';
                    return;
            }
            
            // Cerrar el modal
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Redirigir al lector de cómics con el ID correspondiente
            window.location.href = `marvel-comic-reader.html?id=${comicId}`;
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupReadComicButtons();
});