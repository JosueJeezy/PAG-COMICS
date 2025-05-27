document.addEventListener('DOMContentLoaded', function() {
    const comicTitleElement = document.getElementById('ComicTitle');
    const viewModeSelect = document.getElementById('viewMode');
    const issueSelectContainer = document.querySelector('.issue-container');
    const issueSelect = document.getElementById('issueSelect');
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
    let currentIssueIndex = 0;
    let currentPage = 1;
    let totalPages = 0;
    let zoomLevel = 1;
    let isDragging = false;
    let dragStartX, dragStartY, dragOffsetX = 0, dragOffsetY = 0;
    let isZoomed = false;
    
    // Obtener datos de sessionStorage
    const comicTitle = sessionStorage.getItem('selectedComicTitle') || "Comic Sin Título";
    let comicPages = [];
    let seriesComics = [];
    
    try {
        // Cargar las páginas del cómic actual
        const pagesData = sessionStorage.getItem('selectedComicPages');
        if (pagesData) {
            comicPages = JSON.parse(pagesData);
            console.log("Páginas cargadas:", comicPages.length);
        }
        
        // Cargar datos de la serie si existen
        const seriesData = sessionStorage.getItem('selectedSeriesComics');
        if (seriesData) {
            seriesComics = JSON.parse(seriesData);
            console.log("Cómics de la serie cargados:", seriesComics.length);
            
            // Encontrar el índice del cómic actual en la serie
            currentIssueIndex = seriesComics.findIndex(comic => comic.title === comicTitle);
            if (currentIssueIndex === -1) currentIssueIndex = 0;
        }
    } catch (e) {
        console.error('Error al cargar datos:', e);
        comicPages = [];
        seriesComics = [];
    }
    
    // Si no hay páginas, usar páginas de ejemplo
    if (!comicPages || comicPages.length === 0) {
        comicPages = [
            "/api/placeholder/800/1200?text=Página+de+ejemplo+1",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+2",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+3",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+4",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+5",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+6",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+7",
            "/api/placeholder/800/1200?text=Página+de+ejemplo+8"
        ];
    }
    
    // Función para obtener el cómic actual
    function getCurrentComic() {
        if (seriesComics && seriesComics.length > 0 && currentIssueIndex >= 0 && currentIssueIndex < seriesComics.length) {
            return seriesComics[currentIssueIndex];
        } else {
            return {
                title: comicTitle,
                comicPages: comicPages
            };
        }
    }
    
    const hasSeries = seriesComics && seriesComics.length > 0;
    
    // Configurar el botón de volver
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'all-comics-html.html';
        });
    }
    
    // Función para actualizar el título del cómic
    function updateComicTitle() {
        const comic = getCurrentComic();
        if (comicTitleElement && comic) {
            comicTitleElement.innerHTML = `<p>${comic.title}</p>`;
        }
    }
    
    // Función para configurar selector de issues
    function setupIssueSelector() {
        if (!issueSelect || !issueSelectContainer) return;
        
        if (!hasSeries || seriesComics.length <= 1) {
            issueSelectContainer.style.display = 'none';
            return;
        }
        
        issueSelectContainer.style.display = 'block';
        
        issueSelect.innerHTML = '';
        
        seriesComics.forEach((comic, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = comic.title;
            issueSelect.appendChild(option);
        });
        
        issueSelect.value = currentIssueIndex;
    }

    // Función para inicializar el lector
    function initReader() {
        const comic = getCurrentComic();
        totalPages = comic.comicPages.length;
        
        console.log("Inicializando lector con", totalPages, "páginas");
        
        updateComicTitle();
        setupIssueSelector();
        updatePageSelectOptions();
        loadPage(1);
        loadAllPages();
    }

    // Función para actualizar las opciones del selector de páginas
    function updatePageSelectOptions() {
        if (!pageSelect) return;
        
        // Obtener el número total de páginas del cómic actual
        const comic = getCurrentComic();
        totalPages = comic.comicPages.length;
        
        console.log("Actualizando selector de páginas con", totalPages, "páginas");
        
        pageSelect.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            pageSelect.appendChild(option);
        }
        
        pageSelect.value = currentPage > totalPages ? 1 : currentPage;
        
        if (currentPage > totalPages) {
            currentPage = 1;
        }
    }

    // Función para cargar una página específica
    function loadPage(pageNumber) {
        const comic = getCurrentComic();
        if (!comic || !comic.comicPages) return;
        
        pageNumber = Math.max(1, Math.min(pageNumber, totalPages));
        currentPage = pageNumber;
        
        if (pageSelect) pageSelect.value = currentPage;
        
        resetZoom();
        
        if (currentPageImg) {
            currentPageImg.src = comic.comicPages[pageNumber - 1];
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
        const comic = getCurrentComic();
        if (!comic || !comic.comicPages) return;
        
        if (pageNumber % 2 === 0) pageNumber--;
        if (pageNumber < 1) pageNumber = 1;
        
        const pageIdx1 = pageNumber - 1; 
        const pageIdx2 = pageNumber;     
        
        leftPageImg.src = comic.comicPages[pageIdx1];
        
        if (pageIdx2 < totalPages) {
            rightPageImg.src = comic.comicPages[pageIdx2];
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
        const comic = getCurrentComic();
        if (!comic || !comic.comicPages) return;
        
        // Limpiar el contenedor
        allPagesContainer.innerHTML = '';
        
        const pagesWrapper = document.createElement('div');
        pagesWrapper.className = 'all-pages-wrapper';
        
        // Cargar todas las páginas
        comic.comicPages.forEach((url, index) => {
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
    
    // Evento para cambiar de issue o numero de cómic
    if (issueSelect) {
        issueSelect.addEventListener('change', function() {
            const newIndex = parseInt(this.value);
            if (newIndex >= 0 && newIndex < seriesComics.length) {
                currentIssueIndex = newIndex;
                
                currentPage = 1;
                updateComicTitle();
                
                const comic = getCurrentComic();
                totalPages = comic.comicPages.length;
                
                updatePageSelectOptions();
                loadPage(1);
                
                if (viewModeSelect.value === 'all') {
                    loadAllPages();
                }
            }
        });
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
    if (leftPageImg) {
        leftPageImg.addEventListener('mousedown', function(e) {
            if (zoomLevel > 1) {
                isDragging = true;
                dragStartX = e.clientX - dragOffsetX;
                dragStartY = e.clientY - dragOffsetY;
                if (doublePageContainer) doublePageContainer.style.cursor = 'grabbing';
            }
        });
    }

    if (rightPageImg) {
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
        if (!viewModeSelect) return;
        
        const viewMode = viewModeSelect.value;
        
        if (viewMode === 'all') return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (viewMode === 'single') {
                navigateToPrevPage();
            } else {
                navigateToPrevDoublePage();
            }
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            if (viewMode === 'single') {
                navigateToNextPage();
            } else {
                navigateToNextDoublePage();
            }
            e.preventDefault();
        }
    });
    initReader();
});

document.addEventListener("DOMContentLoaded", () => {
    const volverBtn = document.querySelector(".volver-btn");

    if (volverBtn) {
        volverBtn.addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "all-comics.html";
        });
    }
});