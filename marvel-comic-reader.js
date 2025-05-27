document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del cómic de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('id');
    
    // Si no se encontró ID en la URL, intentar obtener del sessionStorage
    let comicTitle, comicPages;
    
    if (!comicId) {
        // Intentar cargar desde sessionStorage (compatibilidad con redirecciones desde marveluni-index.js)
        comicTitle = sessionStorage.getItem('selectedComicTitle');
        const pagesData = sessionStorage.getItem('selectedComicPages');
        if (pagesData) {
            comicPages = JSON.parse(pagesData);
            initializeReader(comicTitle, comicPages);
        } else {
            // Si no hay datos, redirigir a la página principal
            window.location.href = 'marveluni-index.html';
        }
    } else {
        // Si tenemos ID, usar los datos del archivo comics-data.js
        if (typeof comicsData !== 'undefined' && comicsData[comicId]) {
            const comic = comicsData[comicId];
            comicTitle = comic.title;
            comicPages = comic.comicPages;
            initializeReader(comicTitle, comicPages);
        } else {
            // Si el ID no existe en nuestros datos, redirigir a la página principal
            window.location.href = 'marveluni-index.html';
        }
    }
    
    function initializeReader(title, pages) {
        const comicTitleElement = document.getElementById('ComicTitle');
        const viewModeSelect = document.getElementById('viewMode');
        const pageSelect = document.getElementById('pageSelect');
        
        const singlePageView = document.getElementById('singlePageView');
        const doublePageView = document.getElementById('doublePageView');
        const allPagesView = document.getElementById('allPagesView');
        
        const pageContainer = document.querySelector('.page-container');
        const doublePageContainer = document.querySelector('.double-page-container');
        const currentPageImg = document.getElementById('currentPage');
        const leftPageImg = document.getElementById('leftPage');
        const rightPageImg = document.getElementById('rightPage');
        const allPagesContainer = document.querySelector('.all-pages-container');
        
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');
        const prevDoublePageBtn = document.getElementById('prevDoublePage');
        const nextDoublePageBtn = document.getElementById('nextDoublePage');
        
        const backButton = document.querySelector('.volver-btn');

        // Variables de estado
        let currentPage = 1;
        let totalPages = pages.length;
        let zoomLevel = 1;
        let isDragging = false;
        let dragStartX, dragStartY, dragOffsetX = 0, dragOffsetY = 0;
        let isZoomed = false;
        
        // Actualizar el título del cómic
        if (comicTitleElement) {
            comicTitleElement.textContent = title;
        }
        
        // Configurar el botón de volver
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'marveluni-index.html';
            });
        }
        
        // Función para actualizar las opciones del selector de páginas
        function updatePageSelectOptions() {
            if (!pageSelect) return;
            
            pageSelect.innerHTML = '';
            
            for (let i = 1; i <= totalPages; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                pageSelect.appendChild(option);
            }
            
            pageSelect.value = currentPage;
        }

        // Función para cargar una página específica
        function loadPage(pageNumber) {
            pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
            currentPage = pageNumber;
            
            if (pageSelect) pageSelect.value = currentPage;
            
            resetZoom();
            
            if (currentPageImg) {
                currentPageImg.src = pages[pageNumber - 1];
            }
            
            if (viewModeSelect.value === 'double') {
                loadDoublePage(pageNumber);
            }
            
            if (viewModeSelect.value === 'all') {
                const allPages = allPagesContainer.querySelectorAll('.comic-page');
                allPages.forEach(page => {
                    page.classList.remove('selected-page');
                });
                
                const selectedPage = allPagesContainer.querySelector(`.comic-page[data-page="${pageNumber}"]`);
                if (selectedPage) {
                    selectedPage.classList.add('selected-page');
                    selectedPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }

        // Función para cargar dos páginas a la vez
        function loadDoublePage(pageNumber) {
            if (pageNumber % 2 === 0) pageNumber--;
            if (pageNumber < 1) pageNumber = 1;
            
            const pageIdx1 = pageNumber - 1; 
            const pageIdx2 = pageNumber;     
            
            leftPageImg.src = pages[pageIdx1];
            
            if (pageIdx2 < totalPages) {
                rightPageImg.src = pages[pageIdx2];
                rightPageImg.style.display = 'block';
            } else {
                rightPageImg.style.display = 'none';
            }
            
            currentPage = pageNumber;
            if (pageSelect) pageSelect.value = currentPage;
            
            resetZoom();
        }

        // Función para cargar todas las páginas
        function loadAllPages() {
            // Limpiar el contenedor
            allPagesContainer.innerHTML = '';
            
            const pagesWrapper = document.createElement('div');
            pagesWrapper.className = 'all-pages-wrapper';
            
            // Cargar todas las páginas
            pages.forEach((url, index) => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Comic Page ${index + 1}`;
                img.className = 'comic-page';
                img.setAttribute('data-page', index + 1);
                
                // Marcar la página actual como seleccionada
                if (index + 1 === currentPage) {
                    img.classList.add('selected-page');
                }
                
                // Al hacer doble clic en una página, hacer zoom
                img.addEventListener('dblclick', function(e) {
                    e.preventDefault();
                    toggleZoomAllPages(e, img);
                });
                
                // Al hacer clic en una página, cargarla en vista individual
                img.addEventListener('click', function() {
                    currentPage = index + 1;
                    switchViewMode('single');
                    loadPage(currentPage);
                });
                
                pagesWrapper.appendChild(img);
            });
            
            allPagesContainer.appendChild(pagesWrapper);
            
            resetZoom();
            
            // Hacer scroll a la página actual
            const selectedPage = allPagesContainer.querySelector(`.comic-page[data-page="${currentPage}"]`);
            if (selectedPage) {
                setTimeout(() => {
                    selectedPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }

        // Función para cambiar de modo de visualización
        function switchViewMode(mode) {
            // Ocultar todas las vistas
            singlePageView.classList.remove('active');
            doublePageView.classList.remove('active');
            allPagesView.classList.remove('active');
            
            switch (mode) {
                case 'single':
                    singlePageView.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    loadPage(currentPage);
                    break;
                    
                case 'double':
                    doublePageView.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    if (currentPage % 2 === 0) currentPage--;
                    if (currentPage < 1) currentPage = 1;
                    
                    loadDoublePage(currentPage);
                    break;
                    
                case 'all':
                    allPagesView.classList.add('active');
                    document.body.style.overflow = 'auto';
                    loadAllPages();
                    break;
            }
            resetZoom();
        }

        // Funciones para el zoom
        function applyZoom(container, ...elements) {
            elements.forEach(element => {
                if (element && element.style) {
                    element.style.transform = `scale(${zoomLevel}) translate(${dragOffsetX}px, ${dragOffsetY}px)`;
                }
            });
            
            if (container && container.style) {
                container.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
            }
            
            isZoomed = zoomLevel > 1;
        }

        function resetZoom() {
            zoomLevel = 1;
            dragOffsetX = 0;
            dragOffsetY = 0;
            isZoomed = false;
            
            applyZoom(pageContainer, currentPageImg);
            applyZoom(doublePageContainer, leftPageImg, rightPageImg);
            
            if (allPagesContainer.querySelector('.all-pages-wrapper')) {
                allPagesContainer.querySelector('.all-pages-wrapper').style.transform = 'scale(1)';
                allPagesContainer.querySelector('.all-pages-wrapper').style.transformOrigin = 'center top';
            }
        }
        
        // Función para alternar zoom con doble clic
        function toggleZoom(e, container, ...elements) {
            if (isZoomed) {
                zoomLevel = 1;
                dragOffsetX = 0;
                dragOffsetY = 0;
            } else {
                zoomLevel = 2; 
                
                if (container && elements.length > 0) {
                    const rect = elements[0].getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    
                    dragOffsetX = (rect.width / 2 - mouseX) / zoomLevel;
                    dragOffsetY = (rect.height / 2 - mouseY) / zoomLevel;
                }
            }
            applyZoom(container, ...elements);
        }
        
        // Función para hacer zoom en vista de todas las páginas
        function toggleZoomAllPages(e, img) {
            if (viewModeSelect.value !== 'all') return;
            
            const wrapper = allPagesContainer.querySelector('.all-pages-wrapper');
            if (!wrapper) return;
            
            const currentTransform = wrapper.style.transform || 'scale(1)';
            const currentScale = parseFloat(currentTransform.replace('scale(', '')) || 1;
            
            if (currentScale > 1) {
                wrapper.style.transform = 'scale(1)';
                wrapper.style.transformOrigin = 'center top';
            } else {
                const rect = img.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();
                
                const relX = ((e.clientX - wrapperRect.left) / wrapperRect.width) * 100;
                const relY = ((e.clientY - wrapperRect.top) / wrapperRect.height) * 100;
                
                wrapper.style.transformOrigin = `${relX}% ${relY}%`;
                wrapper.style.transform = 'scale(2)';
            }
        }

        // Funciones de navegación
        function navigateToNextPage() {
            if (currentPage < totalPages) {
                loadPage(currentPage + 1);
            }
        }

        function navigateToPrevPage() {
            if (currentPage > 1) {
                loadPage(currentPage - 1);
            }
        }

        function navigateToNextDoublePage() {
            if (currentPage + 2 <= totalPages) {
                loadDoublePage(currentPage + 2);
            }
        }

        function navigateToPrevDoublePage() {
            if (currentPage > 2) {
                loadDoublePage(currentPage - 2);
            }
        }

        // Doble clic para zoom en vista de una página
        if (pageContainer) {
            pageContainer.addEventListener('dblclick', function(e) {
                toggleZoom(e, pageContainer, currentPageImg);
            });
        }
        
        // Doble clic para zoom en vista de doble página
        if (doublePageContainer) {
            doublePageContainer.addEventListener('dblclick', function(e) {
                toggleZoom(e, doublePageContainer, leftPageImg, rightPageImg);
            });
        }

        // Eventos para el zoom con rueda en vista de una página
        if (pageContainer) {
            pageContainer.addEventListener('wheel', function(e) {
                e.preventDefault();
                
                const oldZoom = zoomLevel;
                
                if (e.deltaY < 0) {
                    zoomLevel = Math.min(zoomLevel + 0.1, 3);
                } else {
                    zoomLevel = Math.max(zoomLevel - 0.1, 1);
                }
                
                if (zoomLevel === 1) {
                    dragOffsetX = 0;
                    dragOffsetY = 0;
                } else if (zoomLevel !== oldZoom) {
                    const rect = currentPageImg.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    
                    dragOffsetX = (mouseX / oldZoom - mouseX / zoomLevel + dragOffsetX);
                    dragOffsetY = (mouseY / oldZoom - mouseY / zoomLevel + dragOffsetY);
                }
                applyZoom(pageContainer, currentPageImg);
            });
        }

        // Eventos para el zoom en vista de dos páginas
        if (doublePageContainer) {
            doublePageContainer.addEventListener('wheel', function(e) {
                e.preventDefault();
                
                const oldZoom = zoomLevel;
                
                if (e.deltaY < 0) {
                    zoomLevel = Math.min(zoomLevel + 0.1, 3);
                } else {
                    zoomLevel = Math.max(zoomLevel - 0.1, 1);
                }
                
                if (zoomLevel === 1) {
                    dragOffsetX = 0;
                    dragOffsetY = 0;
                } else if (zoomLevel !== oldZoom && leftPageImg && rightPageImg) {
                    const rectLeft = leftPageImg.getBoundingClientRect();
                    const rectRight = rightPageImg.getBoundingClientRect();
                    
                    const centerX = (rectLeft.left + rectRight.right) / 2;
                    const centerY = (rectLeft.top + rectRight.bottom) / 2;
                    
                    const mouseX = e.clientX - centerX;
                    const mouseY = e.clientY - centerY;
                    
                    dragOffsetX = (mouseX / oldZoom - mouseX / zoomLevel + dragOffsetX);
                    dragOffsetY = (mouseY / oldZoom - mouseY / zoomLevel + dragOffsetY);
                }            
                applyZoom(doublePageContainer, leftPageImg, rightPageImg);
            });
        }
        
        // Eventos para el zoom en vista de todas las páginas
        if (allPagesContainer) {
            allPagesContainer.addEventListener('wheel', function(e) {
                if (!e.ctrlKey && !e.metaKey) return; // Solo hacer zoom si se presiona Ctrl/Cmd
                
                e.preventDefault();
                
                const wrapper = allPagesContainer.querySelector('.all-pages-wrapper');
                if (!wrapper) return;
                
                const currentTransform = wrapper.style.transform || 'scale(1)';
                const currentScale = parseFloat(currentTransform.replace('scale(', '')) || 1;
                
                let newScale = currentScale;
                if (e.deltaY < 0) {
                    newScale = Math.min(currentScale + 0.1, 3);
                } else {
                    newScale = Math.max(currentScale - 0.1, 1);
                }
                
                if (newScale !== currentScale) {
                    const rect = wrapper.getBoundingClientRect();
                    const relX = ((e.clientX - rect.left) / rect.width) * 100;
                    const relY = ((e.clientY - rect.top) / rect.height) * 100;
                    
                    wrapper.style.transformOrigin = `${relX}% ${relY}%`;
                    wrapper.style.transform = `scale(${newScale})`;
                }
            });
        }

        // Evento para arrastrar en vista de una página
        if (currentPageImg) {
            currentPageImg.addEventListener('mousedown', function(e) {
                if (zoomLevel > 1) {
                    isDragging = true;
                    dragStartX = e.clientX - dragOffsetX;
                    dragStartY = e.clientY - dragOffsetY;
                    if (pageContainer) pageContainer.style.cursor = 'grabbing';
                }
            });
        }

        // Eventos para arrastrar en vista de dos páginas
        if (leftPageImg && rightPageImg) {
            leftPageImg.addEventListener('mousedown', function(e) {
                if (zoomLevel > 1) {
                    isDragging = true;
                    dragStartX = e.clientX - dragOffsetX;
                    dragStartY = e.clientY - dragOffsetY;
                    if (doublePageContainer) doublePageContainer.style.cursor = 'grabbing';
                }
            });
            
            rightPageImg.addEventListener('mousedown', function(e) {
                if (zoomLevel > 1) {
                    isDragging = true;
                    dragStartX = e.clientX - dragOffsetX;
                    dragStartY = e.clientY - dragOffsetY;
                    if (doublePageContainer) doublePageContainer.style.cursor = 'grabbing';
                }
            });
        }

        // Eventos para el movimiento del ratón (arrastre)
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            dragOffsetX = e.clientX - dragStartX;
            dragOffsetY = e.clientY - dragStartY;
            
            applyZoom(pageContainer, currentPageImg);
            applyZoom(doublePageContainer, leftPageImg, rightPageImg);
        });

        // Evento para finalizar el arrastre
        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                if (pageContainer) pageContainer.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
                if (doublePageContainer) doublePageContainer.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
            }
        });

        // Cambiar modo de visualización
        if (viewModeSelect) {
            viewModeSelect.addEventListener('change', function() {
                switchViewMode(this.value);
            });
        }
        
        // Cambiar página
        if (pageSelect) {
            pageSelect.addEventListener('change', function() {
                currentPage = parseInt(this.value);
                
                switch (viewModeSelect.value) {
                    case 'single':
                        loadPage(currentPage);
                        break;
                    case 'double':
                        if (currentPage % 2 === 0) currentPage--;
                        loadDoublePage(currentPage);
                        break;
                    case 'all':
                        loadPage(currentPage);
                        break;
                }
            });
        }
        
        // Botones de navegación - vista de una página
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', navigateToPrevPage);
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', navigateToNextPage);
        }
        
        // Botones de navegación - vista de dos páginas
        if (prevDoublePageBtn) {
            prevDoublePageBtn.addEventListener('click', navigateToPrevDoublePage);
        }
        
        if (nextDoublePageBtn) {
            nextDoublePageBtn.addEventListener('click', navigateToNextDoublePage);
        }
        
        // Navegación con teclado
        document.addEventListener('keydown', function(e) {
            if (viewModeSelect.value === 'all') return;
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (viewModeSelect.value === 'single') {
                    navigateToPrevPage();
                } else {
                    navigateToPrevDoublePage();
                }
                e.preventDefault();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                if (viewModeSelect.value === 'single') {
                    navigateToNextPage();
                } else {
                    navigateToNextDoublePage();
                }
                e.preventDefault();
            }
        });

        // Navegación táctil (swipe)
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            if (viewModeSelect.value === 'all') return;
            
            if (touchEndX < touchStartX - 50) {
                // Swipe izquierda
                if (viewModeSelect.value === 'single') {
                    navigateToNextPage();
                } else {
                    navigateToNextDoublePage();
                }
            } else if (touchEndX > touchStartX + 50) {
                // Swipe derecha
                if (viewModeSelect.value === 'single') {
                    navigateToPrevPage();
                } else {
                    navigateToPrevDoublePage();
                }
            }
        }
        
        // Inicializar
        updatePageSelectOptions();
        loadPage(1);
    }
});