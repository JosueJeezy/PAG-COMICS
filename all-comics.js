document.addEventListener('DOMContentLoaded', function() {
    // Base de datos simulada de cómics
    const comicsDatabase = [
        // Página 1
        [
            {
                id: 1,
                title: "SPIRITS OF VENGEANCE",
                author: "Gael Sanchez, Josué Reyes",
                cover: "imgcomic/SOV/SOV01.jpg",
                writer: "Gael Sanchez",
                artist: "Josué Reyes",
                pages: "6",
                releaseDate: "5 de Mayo, 2025",
                series: "SPIRITS OF VENGEANCE",
                comicPages: [
                    "imgcomic/SOV/SOV01.jpg",
                    "imgcomic/SOV/SOV02.jpeg",
                    "imgcomic/SOV/SOV03.jpeg",
                    "imgcomic/SOV/SOV04.png",
                    "imgcomic/SOV/SOV05.png"
                ]
            },
            {
                id: 2,
                title: "GENIS-VELL: CAPTAIN MARVEL",
                author: "Kelly Sue DeConnick",
                cover: "img/genis-vell.jpg",
                writer: "Kelly Sue DeConnick",
                artist: "David Lopez",
                pages: "28",
                releaseDate: "20 de Abril, 2025",
                series: "",
                comicPages: [
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg"
                ]
            },
            {
                id: 3,
                title: "BLACK PANTHER",
                author: "Ta-Nehisi Coates",
                cover: "img/bphanter.jpg",
                writer: "Ta-Nehisi Coates",
                artist: "Brian Stelfreeze",
                pages: "34",
                releaseDate: "5 de Mayo, 2025",
                series: "",
                comicPages: [
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg",
                    "imgcomic/.jpg"
                ]
            },
            {
                id: 4,
                title: "ULTIMATE SPIDER-MAN",
                author: "Dan Slott",
                cover: "img/ultspiderman.jpg",
                writer: "Dan Slott",
                artist: "Stuart Immonen",
                pages: "30",
                releaseDate: "10 de Junio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 5,
                title: "DOCTOR STRANGE DAMNATION",
                author: "Donny Cates",
                cover: "img/damnation.jpg",
                writer: "Donny Cates",
                artist: "Ryan Stegman",
                pages: "36",
                releaseDate: "25 de Junio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 6,
                title: "X-MEN: LEGENDS",
                author: "Jonathan Hickman",
                cover: "img/xmenlegends.jpg",
                writer: "Jonathan Hickman",
                artist: "Pepe Larraz",
                pages: "32",
                releaseDate: "15 de Abril, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 7,
                title: "IRON MAN",
                author: "Christopher Cantwell",
                cover: "img/ironman.jpg",
                writer: "Christopher Cantwell",
                artist: "CAFU",
                pages: "28",
                releaseDate: "5 de Mayo, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 8,
                title: "THOR: GOD OF THUNDER",
                author: "Jason Aaron",
                cover: "img/thorGOTT.jpg",
                writer: "Jason Aaron",
                artist: "Esad Ribic",
                pages: "34",
                releaseDate: "20 de Mayo, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 9,
                title: "HULK: IMMORTAL",
                author: "Al Ewing",
                cover: "img/immortalhulk.jpg",
                writer: "Al Ewing",
                artist: "Joe Bennett",
                pages: "30",
                releaseDate: "15 de Junio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 10,
                title: "FANTASTIC FOUR",
                author: "Dan Slott",
                cover: "img/ff4.jpg",
                writer: "Dan Slott",
                artist: "Sara Pichelli",
                pages: "32",
                releaseDate: "30 de Junio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            }
        ],
        // Página 2
        [
            {
                id: 11,
                title: "DAREDEVIL: RENACIDO",
                author: "Chip Zdarsky",
                cover: "img/daredevil2019.jpg",
                writer: "Chip Zdarsky",
                artist: "Marco Checchetto",
                pages: "32",
                releaseDate: "5 de Julio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 12,
                title: "VENOM: LETHAL PROTECTOR",
                author: "Donny Cates",
                cover: "img/venomlethal.jpg",
                writer: "Donny Cates",
                artist: "Ryan Stegman",
                pages: "28",
                releaseDate: "15 de Julio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 13,
                title: "PUNISHER: WAR ZONE",
                author: "Matthew Rosenberg",
                cover: "img/punisherwarz.jpg",
                writer: "Matthew Rosenberg",
                artist: "Szymon Kudranski",
                pages: "34",
                releaseDate: "25 de Julio, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 14,
                title: "MOON KNIGHT",
                author: "Jeff Lemire",
                cover: "img/moonknight2016.jpg",
                writer: "Jeff Lemire",
                artist: "Greg Smallwood",
                pages: "30",
                releaseDate: "5 de Agosto, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 15,
                title: "GHOST RIDER: INFIERNO",
                author: "Benjamin Percy",
                cover: "img/ghostrider20.jpg",
                writer: "Benjamin Percy",
                artist: "Cory Smith",
                pages: "36",
                releaseDate: "15 de Agosto, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 16,
                title: "DR. STRANGE: SURGEON SUPREME",
                author: "Mark Waid",
                cover: "img/surgeonsup.jpg",
                writer: "Mark Waid",
                artist: "Jesus Saiz",
                pages: "32",
                releaseDate: "20 de Agosto, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 17,
                title: "GUARDIANS OF THE GALAXY",
                author: "Al Ewing",
                cover: "img/gotgewing.jpg",
                writer: "Al Ewing",
                artist: "Juann Cabal",
                pages: "28",
                releaseDate: "1 de Septiembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 18,
                title: "NOVA: RESURRECTION",
                author: "Donny Cates",
                cover: "img/nova16.jpg",
                writer: "Donny Cates",
                artist: "Gabriel Walta",
                pages: "34",
                releaseDate: "10 de Septiembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 19,
                title: "BLADE: VAMPIRE HUNTER",
                author: "Bryan Hill",
                cover: "img/bladevol5.jpg",
                writer: "Bryan Hill",
                artist: "Szymon Kudranski",
                pages: "30",
                releaseDate: "20 de Septiembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 20,
                title: "SCARLET WITCH",
                author: "Steve Orlando",
                cover: "img/scarlet2023.jpg",
                writer: "Steve Orlando",
                artist: "Sara Pichelli",
                pages: "28",
                releaseDate: "30 de Septiembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            }
        ],
        // Página 3
        [
            {
                id: 21,
                title: "BLACK WIDOW: DEADLY ORIGIN",
                author: "Kelly Thompson",
                cover: "img/blackwidow2020.jpg",
                writer: "Kelly Thompson",
                artist: "Elena Casagrande",
                pages: "32",
                releaseDate: "5 de Octubre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 22,
                title: "HAWKEYE: FREEFALL",
                author: "Matthew Rosenberg",
                cover: "img/hawkeye.jpg",
                writer: "Matthew Rosenberg",
                artist: "Otto Schmidt",
                pages: "28",
                releaseDate: "15 de Octubre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 23,
                title: "AVENGERS: FOREVER",
                author: "Jason Aaron",
                cover: "img/avenger4ev.jpg",
                writer: "Jason Aaron",
                artist: "Aaron Kuder",
                pages: "34",
                releaseDate: "25 de Octubre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 24,
                title: "ETERNALS: NEW DAWN",
                author: "Kieron Gillen",
                cover: "img/eternals.jpg",
                writer: "Kieron Gillen",
                artist: "Esad Ribic",
                pages: "30",
                releaseDate: "5 de Noviembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 25,
                title: "SHANG-CHI: MASTER OF KUNG FU",
                author: "Gene Luen Yang",
                cover: "img/shangchi.jpg",
                writer: "Gene Luen Yang",
                artist: "Dike Ruan",
                pages: "36",
                releaseDate: "15 de Noviembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 26,
                title: "SILVER SURFER: BLACK",
                author: "Donny Cates",
                cover: "img/SSblack.jpg",
                writer: "Donny Cates",
                artist: "Tradd Moore",
                pages: "32",
                releaseDate: "25 de Noviembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 27,
                title: "HELLIONS",
                author: "Zeb Wells",
                cover: "img/hellions.jpg",
                writer: "Zeb Wells",
                artist: "Stephen Segovia",
                pages: "28",
                releaseDate: "5 de Diciembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 28,
                title: "STRANGE ACADEMY",
                author: "Skottie Young",
                cover: "img/strangeacad.jpg",
                writer: "Skottie Young",
                artist: "Humberto Ramos",
                pages: "34",
                releaseDate: "15 de Diciembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 29,
                title: "CHAMPIONS",
                author: "Eve L. Ewing",
                cover: "img/champions.jpg",
                writer: "Eve L. Ewing",
                artist: "Simone Di Meo",
                pages: "30",
                releaseDate: "25 de Diciembre, 2025",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 30,
                title: "POWER PACK",
                author: "Ryan North",
                cover: "img/powerpack.jpg",
                writer: "Ryan North",
                artist: "Nico Leon",
                pages: "28",
                releaseDate: "5 de Enero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            }
        ],
        // Página 4
        [
            {
                id: 31,
                title: "MS. MARVEL",
                author: "Saladin Ahmed",
                cover: "img/msmarvel.jpg",
                writer: "Saladin Ahmed",
                artist: "Minkyu Jung",
                pages: "32",
                releaseDate: "15 de Enero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 32,
                title: "MILES MORALES: SPIDER-MAN",
                author: "Saladin Ahmed",
                cover: "img/miles2018.jpg",
                writer: "Saladin Ahmed",
                artist: "Javier Garrón",
                pages: "28",
                releaseDate: "25 de Enero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 33,
                title: "AMERICA CHAVEZ",
                author: "Kalinda Vazquez",
                cover: "img/americachavez.jpg",
                writer: "Kalinda Vazquez",
                artist: "Carlos Gomez",
                pages: "34",
                releaseDate: "5 de Febrero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 34,
                title: "THE INVINCIBLE IRON MAN",
                author: "Eve L. Ewing",
                cover: "img/invincibleiron.jpg",
                writer: "Eve L. Ewing",
                artist: "Kevin Libranda",
                pages: "30",
                releaseDate: "15 de Febrero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 35,
                title: "SPIDER-WOMAN",
                author: "Karla Pacheco",
                cover: "img/spiderwomann.jpg",
                writer: "Karla Pacheco",
                artist: "Pere Pérez",
                pages: "36",
                releaseDate: "25 de Febrero, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 36,
                title: "WOLVERINE",
                author: "Benjamin Percy",
                cover: "img/wolverine2020.jpg",
                writer: "Benjamin Percy",
                artist: "Adam Kubert",
                pages: "32",
                releaseDate: "5 de Marzo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 37,
                title: "X-FORCE",
                author: "Benjamin Percy",
                cover: "img/xforce.jpg",
                writer: "Benjamin Percy",
                artist: "Joshua Cassara",
                pages: "28",
                releaseDate: "15 de Marzo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 38,
                title: "EXCALIBUR",
                author: "Tini Howard",
                cover: "img/excalibur.jpg",
                writer: "Tini Howard",
                artist: "Marcus To",
                pages: "34",
                releaseDate: "25 de Marzo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 39,
                title: "NEW MUTANTS",
                author: "Vita Ayala",
                cover: "img/newmutants.jpg",
                writer: "Vita Ayala",
                artist: "Rod Reis",
                pages: "30",
                releaseDate: "5 de Abril, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 40,
                title: "MARAUDERS",
                author: "Gerry Duggan",
                cover: "img/marauders.jpg",
                writer: "Gerry Duggan",
                artist: "Matteo Lolli",
                pages: "28",
                releaseDate: "15 de Abril, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            }
        ],
        // Página 5
        [
            {
                id: 41,
                title: "THE INCREDIBLE HULK",
                author: "Rainbow Rowell",
                cover: "img/incredhulk.jpg",
                writer: "Rainbow Rowell",
                artist: "Rogê Antônio",
                pages: "32",
                releaseDate: "25 de Abril, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 42,
                title: "MOON GIRL AND DEVIL DINOSAUR",
                author: "Brandon Montclare",
                cover: "img/moongirl.jpg",
                writer: "Brandon Montclare",
                artist: "Natacha Bustos",
                pages: "28",
                releaseDate: "5 de Mayo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 43,
                title: "RUNAWAYS",
                author: "Rainbow Rowell",
                cover: "img/runaways2017.jpg",
                writer: "Rainbow Rowell",
                artist: "Andrés Genolet",
                pages: "34",
                releaseDate: "15 de Mayo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 44,
                title: "SILK",
                author: "Maurene Goo",
                cover: "img/silk.jpg",
                writer: "Maurene Goo",
                artist: "Takeshi Miyazawa",
                pages: "30",
                releaseDate: "25 de Mayo, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 45,
                title: "MOON KNIGHT: MIDNIGHT MISSION",
                author: "Jed MacKay",
                cover: "img/moonknight2021.jpg",
                writer: "Jed MacKay",
                artist: "Alessandro Cappuccio",
                pages: "36",
                releaseDate: "5 de Junio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 46,
                title: "DARKHAWK: HEART OF THE HAWK",
                author: "Kyle Higgins",
                cover: "img/darkhawkhoth.jpg",
                writer: "Kyle Higgins",
                artist: "Juanan Ramírez",
                pages: "32",
                releaseDate: "15 de Junio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 47,
                title: "BETA RAY BILL",
                author: "Daniel Warren Johnson",
                cover: "img/BRB.jpg",
                writer: "Daniel Warren Johnson",
                artist: "Daniel Warren Johnson",
                pages: "28",
                releaseDate: "25 de Junio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 48,
                title: "SPIRITS OF VENGEANCE",
                author: "Taboo",
                cover: "img/spiritsofvngn.jpg",
                writer: "Taboo",
                artist: "Michael Sta. Maria",
                pages: "34",
                releaseDate: "5 de Julio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 49,
                title: "WEREWOLF BY NIGHT",
                author: "Taboo",
                cover: "img/werewolf.jpg",
                writer: "Taboo",
                artist: "Scot Eaton",
                pages: "30",
                releaseDate: "15 de Julio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            },
            {
                id: 50,
                title: "CAPTAIN AMERICA: SYMBOL OF TRUTH",
                author: "Tochi Onyebuchi",
                cover: "img/captainsot.jpg",
                writer: "Tochi Onyebuchi",
                artist: "R.B. Silva",
                pages: "28",
                releaseDate: "25 de Julio, 2026",
                series: "",
                comicPages: [
                    "imgcomic/CC/.jpg"
                ]
            }
        ]
    ];
    
    // Crear una lista plana de todos los cómics para búsqueda
    let allComics = [];
    comicsDatabase.forEach(page => {
        page.forEach(comic => {
            allComics.push(comic);
        });
    });
    
    // Elementos del DOM
    const comicsGrid = document.querySelector('.comics-grid');
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const mainTitle = document.querySelector('.main-title');
    
    // Elementos del modal
    const modal = document.getElementById('comicModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close');
    const readComicBtn = document.getElementById('readComicBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const seeSeriesBtn = document.getElementById('seeseriesbtn');
    
    // Variable para almacenar el cómic actual
    let currentComic = null;
    
    // Estado de la página
    let currentPage = 0;
    let isSearchMode = false;
    let isSeriesMode = false;
    let currentSeries = '';
    
    // Función para crear una tarjeta de cómic
    function createComicCard(comic) {
        const comicItem = document.createElement('div');
        comicItem.className = 'comic-item';
        comicItem.dataset.comicId = comic.id;
        
        comicItem.innerHTML = `
            <style>
                .modal-details-list{
                    color:black;
                }
                .ver-info-btn {
                    background-color:rgb(230, 12, 12);
                    color: var(--marvel-light);
                    border: none;
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: 18px;
                    border-radius: 3px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                }
                .ver-info-btn:hover{
                    background-color:rgb(255, 232, 232);
                    color: var(--marvel-dark);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                .comic-effect {
                animation: comicEffectAnim 0.5s ease-out;
            }
            </style>
            <img src="${comic.cover}" alt="${comic.title}" class="comic-cover">
            <div class="comic-info">
                <h3 class="comic-title">${comic.title}</h3>
                <p class="comic-author">${comic.author}</p>
                <div class="modal-section">
                    <h4 class="modal-section-title">DETALLES:</h4>
                    <ul class="modal-details-list">
                        <li class="modal-detail-item"><strong>Escritor:</strong> ${comic.writer}</li>
                        <li class="modal-detail-item"><strong>Dibujante:</strong> ${comic.artist}</li>
                        <li class="modal-detail-item"><strong>No. de páginas:</strong> ${comic.pages}</li>
                        <li class="modal-detail-item"><strong>Fecha de publicación:</strong> ${comic.releaseDate}</li>
                    </ul>
                </div>
                <button class="ver-info-btn">VER INFO</button>
            </div>
        `;
        
        return comicItem;
    }
    
    // Función para obtener todos los cómics de una serie específica
    function getSeriesComics(seriesName) {
        return allComics.filter(comic => comic.series === seriesName);
    }
    
    // Función para cargar los cómics de una página específica
    function loadComicsPage(pageIndex) {
        exitSearchMode();
        exitSeriesMode();
        
        comicsGrid.innerHTML = '';
        
        if (pageIndex >= 0 && pageIndex < comicsDatabase.length) {
            const comics = comicsDatabase[pageIndex];
            
            comics.forEach(comic => {
                const comicItem = createComicCard(comic);
                comicsGrid.appendChild(comicItem);
            });
            
            paginationBtns.forEach(btn => {
                btn.classList.remove('active');
                
                if (!btn.classList.contains('next') && parseInt(btn.innerText) === pageIndex + 1) {
                    btn.classList.add('active');
                }
            });
            
            currentPage = pageIndex;
            setupVerInfoButtons();
        }
    }
    
    // Función para mostrar cómics de una serie específica
    function loadSeriesComics(seriesName) {
        const seriesComics = getSeriesComics(seriesName);
        
        if (seriesComics.length === 0) {
            alert('No se encontraron cómics para esta serie');
            return;
        }
        
        isSeriesMode = true;
        currentSeries = seriesName;
        
        document.querySelector('.pagination').style.display = 'none';
        
        mainTitle.textContent = `SERIE: ${seriesName.toUpperCase()}`;
        
        let backButton;
        if (!document.querySelector('.back-to-comics')) {
            backButton = document.createElement('button');
            backButton.className = 'back-to-comics clear-search';
            backButton.textContent = 'VOLVER A TODOS LOS CÓMICS';
            backButton.addEventListener('click', exitSeriesMode);
            
            comicsGrid.parentNode.insertBefore(backButton, comicsGrid);
        }
        
        comicsGrid.innerHTML = '';
        
        seriesComics.forEach(comic => {
            const comicItem = createComicCard(comic);
            comicsGrid.appendChild(comicItem);
        });
        
        setupVerInfoButtons();
    }
    
    // Función para salir del modo serie
    function exitSeriesMode() {
        if (isSeriesMode) {
            isSeriesMode = false;
            currentSeries = '';
            
            mainTitle.textContent = 'ALL - COMICS';
            
            document.querySelector('.pagination').style.display = 'flex';
            
            const backButton = document.querySelector('.back-to-comics');
            if (backButton) {
                backButton.remove();
            }
            
            loadComicsPage(currentPage);
        }
    }
    
    // Función para buscar cómics
    function searchComics(term) {
        if (!term.trim()) {
            exitSearchMode();
            return;
        }
        
        // Convertir el término a minúsculas para una búsqueda insensible a mayúsculas
        const searchTerm = term.toLowerCase();
        
        // Filtrar cómics que coincidan con el término de búsqueda
        const results = allComics.filter(comic => 
            comic.title.toLowerCase().includes(searchTerm) || 
            comic.author.toLowerCase().includes(searchTerm) ||
            comic.series.toLowerCase().includes(searchTerm)
        );
        
        isSearchMode = true;
        
        document.querySelector('.pagination').style.display = 'none';
        
        // Mostrar sección de resultados de búsqueda
        searchResults.style.display = 'block';
        searchResults.innerHTML = `
            <div class="search-header">
                <h2 class="search-title">Resultados para: "${term}"</h2>
                <button class="clear-search">VOLVER</button>
            </div>
        `;
        
        comicsGrid.innerHTML = '';
        
        // Si no hay resultados, mostrar mensaje
        if (results.length === 0) {
            comicsGrid.innerHTML = `
                <div class="no-results">
                    <p>No se encontraron cómics que coincidan con "${term}".</p>
                    <p>Intenta con una búsqueda diferente.</p>
                </div>
            `;
        } else {
            // Mostrar los resultados
            results.forEach(comic => {
                const comicItem = createComicCard(comic);
                comicsGrid.appendChild(comicItem);
            });
        }
        
        // Configurar botón para volver a vista normal
        document.querySelector('.clear-search').addEventListener('click', exitSearchMode);
        
        // Reiniciar eventos para los nuevos botones
        setupVerInfoButtons();
    }
    
    // Función para salir del modo búsqueda
    function exitSearchMode() {
        if (isSearchMode) {
            isSearchMode = false;
            
            if (isSeriesMode) {
                searchResults.style.display = 'none';
                
                loadSeriesComics(currentSeries);
                
                searchInput.value = '';
                return;
            }
            
            searchResults.style.display = 'none';
            
            document.querySelector('.pagination').style.display = 'flex';
            
            loadComicsPage(currentPage);
            
            searchInput.value = '';
        }
    }
    
    // Función para encontrar un cómic por su ID
    function findComicById(id) {
        return allComics.find(comic => comic.id === id);
    }
    
    // Función para configurar los botones "VER INFO"
    function setupVerInfoButtons() {
        const verInfoBtns = document.querySelectorAll('.ver-info-btn');
        
        verInfoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const comicItem = this.closest('.comic-item');
                const comicId = parseInt(comicItem.dataset.comicId);
                
                // Encontrar el cómic por su ID
                currentComic = findComicById(comicId);
                
                if (currentComic) {
                    openComicModal(this);
                    createComicEffect('¡INFO!', this);
                }
            });
        });
    }
    
    // Función para abrir el modal
    function openComicModal(button) {
        const comicItem = button.closest('.comic-item');
        const title = comicItem.querySelector('.comic-title').innerText;
        const author = comicItem.querySelector('.comic-author').innerText;
        const imgSrc = comicItem.querySelector('.comic-cover').src;
        
        // Obtener la sección modal oculta
        const modalSection = comicItem.querySelector('.modal-section');
        const modalSectionClone = modalSection ? modalSection.cloneNode(true) : null;
        
        // Si tenemos la sección clonada, asegurarnos de que sea visible
        if (modalSectionClone) {
            modalSectionClone.style.display = 'block';
        }
        
        // Crear contenido del modal
        modalContent.innerHTML = `
            <div style="flex: 1;">
                <img src="${imgSrc}" alt="${title}" style="width: 100%; border-radius: 5px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
            </div>
            <div style="flex: 2; min-width: 300px;">
                <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; margin-bottom: 15px; color: var(--marvel-red);">${title}</h3>
                <p style="margin-bottom: 25px; line-height: 1.6;color: black;">${author}</p>
                <div id="details-container"></div>
            </div>
        `;
        
        // Agregar la sección de detalles al contenedor
        if (modalSectionClone) {
            document.getElementById('details-container').appendChild(modalSectionClone);
        }
        
        // Mostrar el modal
        modal.classList.add('active');
        
        // Prevenir scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Cerrar modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera de su contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Evento para el botón "LEER COMIC"
    readComicBtn.addEventListener('click', function() {
        createComicEffect('¡LEER!', this);
        
        if (currentComic) {
            sessionStorage.setItem('selectedComicTitle', currentComic.title);
            sessionStorage.setItem('selectedComicPages', JSON.stringify(currentComic.comicPages));
            
            if (currentComic.series) {
                const seriesComics = getSeriesComics(currentComic.series);
                if (seriesComics.length > 1) {
                    sessionStorage.setItem('selectedSeriesComics', JSON.stringify(seriesComics));
                } else {
                    sessionStorage.removeItem('selectedSeriesComics');
                }
            } else {
                sessionStorage.removeItem('selectedSeriesComics');
            }
            
            // Redirigir al lector de cómics
            window.location.href = 'comic-reader.html';
        } else {
            alert('Error: No se ha seleccionado un cómic');
        }
    });
    
    // Evento para el botón "VER SERIE"
    seeSeriesBtn.addEventListener('click', function() {
        createComicEffect('¡SERIE!', this);
        
        if (currentComic && currentComic.series) {
            closeModal();
            
            loadSeriesComics(currentComic.series);
        } else {
            alert('Este cómic no pertenece a ninguna serie');
        }
    });
    
    // Evento para el botón "DESCARGAR"
    downloadBtn.addEventListener('click', function() {
        createComicEffect('¡DESCARGA!', this);
        
        // Aquí se implementaría la funcionalidad para descargar el cómic
        alert('Funcionalidad para descargar el cómic en desarrollo');
    });
    
    // Configurar eventos para los botones de paginación
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('next')) {
                if (currentPage < comicsDatabase.length - 1) {
                    loadComicsPage(currentPage + 1);
                }
            } else {
                const pageIndex = parseInt(this.innerText) - 1;
                loadComicsPage(pageIndex);
            }
            
            // Scroll hacia arriba
            window.scrollTo({
                top: document.querySelector('.main-title').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Evento para el campo de búsqueda y botón
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchComics(searchTerm);
            createComicEffect('¡BÚSQUEDA!', this);
        }
    });
    
    // También buscar al presionar Enter en el campo de búsqueda
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                searchComics(searchTerm);
                createComicEffect('¡BÚSQUEDA!', searchButton);
            }
        }
    });
    
    // Añadir efectos de sonido cómic al hacer clic en botones
    function createComicEffect(text, element) {
        const effect = document.createElement('div');
        effect.className = 'comic-effect';
        effect.innerText = text;
        
        // Posicionar el efecto cerca del elemento
        const rect = element.getBoundingClientRect();
        effect.style.position = 'fixed';
        effect.style.top = `${rect.top - 50}px`;
        effect.style.left = `${rect.left + rect.width / 2}px`;
        effect.style.zIndex = '1000';
        effect.style.fontFamily = "'Bebas Neue', sans-serif";
        effect.style.fontSize = '3rem';
        effect.style.color = 'var(--marvel-red)';
        effect.style.textShadow = '2px 2px 0 black';
        effect.style.pointerEvents = 'none';
        
        effect.style.animation = 'comicEffectAnim 0.5s forwards';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 500);
    }
    
    // Agregar la animación al CSS si no existe
    if (!document.querySelector('#comic-effect-animation')) {
        const style = document.createElement('style');
        style.id = 'comic-effect-animation';
        style.textContent = `
            @keyframes comicEffectAnim {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.5); opacity: 1; }
                100% { transform: scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cargar la primera página de cómics al inicio
    loadComicsPage(0);
});