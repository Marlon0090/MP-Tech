/* =========================================================
   MP TECH — SCRIPT V2
   ========================================================= */


/* =========================================================
   INICIALIZAÇÃO PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* Inicializa os ícones Lucide */
    refreshIcons();

    /* Recursos principais */
    initLoader();
    initMobileMenu();
    initHeader();
    initScrollAnimations();
    initTypingEffect();
    initProjectFilters();
    initCounters();
    initSmoothScroll();
    initCardEffects();
    initBackToTop();
    initHeroParallax();
    initMouseGlow();
    animateProgressBars();
    initExternalLinks();
    initImageErrors();

});


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

function refreshIcons() {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


/* =========================================================
   LOADER
   ========================================================= */

function initLoader() {

    const loader =
        document.querySelector(".loader");

    if (!loader) return;


    setTimeout(() => {

        loader.classList.add(
            "loader-hidden"
        );


        setTimeout(() => {

            loader.remove();

        }, 600);


    }, 800);

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function initMobileMenu() {

    const menuButton =
        document.getElementById("menuMobile");

    const nav =
        document.getElementById("nav");


    if (!menuButton || !nav) return;


    menuButton.addEventListener(
        "click",
        () => {

            const isActive =
                nav.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                isActive
            );


            const icon =
                menuButton.querySelector("i");


            if (icon) {

                icon.setAttribute(
                    "data-lucide",
                    isActive
                        ? "x"
                        : "menu"
                );

                refreshIcons();

            }

        }
    );


    /* Fecha o menu ao clicar em um link */

    const navLinks =
        nav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove(
                    "active"
                );

                menuButton.classList.remove(
                    "active"
                );


                const icon =
                    menuButton.querySelector("i");


                if (icon) {

                    icon.setAttribute(
                        "data-lucide",
                        "menu"
                    );

                    refreshIcons();

                }

            }
        );

    });

}


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

function initHeader() {

    const header =
        document.querySelector(".header");


    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   ANIMAÇÕES AO ROLAR
   ========================================================= */

function initScrollAnimations() {

    const elements =
        document.querySelectorAll(
            ".project-card, .service-card, .step, .price-card, .about-text, .about-visual, .contact-box, .section-title"
        );


    if (!elements.length) return;


    elements.forEach(element => {

        element.classList.add(
            "scroll-hidden"
        );

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "scroll-show"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   EFEITO DE DIGITAÇÃO
   ========================================================= */

function initTypingEffect() {

    const typingElement =
        document.querySelector(
            "[data-typing]"
        );


    if (!typingElement) return;


    const words = [
        "sites.",
        "soluções.",
        "experiências.",
        "resultados."
    ];


    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function type() {

        const currentWord =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;


            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;


                setTimeout(
                    type,
                    1800
                );


                return;

            }

        } else {

            characterIndex--;


            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            if (characterIndex === 0) {

                deleting = false;

                wordIndex++;


                if (
                    wordIndex >=
                    words.length
                ) {

                    wordIndex = 0;

                }

            }

        }


        const speed =
            deleting
                ? 50
                : 90;


        setTimeout(
            type,
            speed
        );

    }


    type();

}


/* =========================================================
   FILTRO DOS PROJETOS
   ========================================================= */

function initProjectFilters() {

    const filters =
        document.querySelectorAll(
            ".filter-btn"
        );


    const projects =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !filters.length ||
        !projects.length
    ) {
        return;
    }


    /* =====================================================
       FUNÇÃO RESPONSÁVEL PELO FILTRO
       ===================================================== */

    function filterProjects(category) {

        projects.forEach(project => {

            const projectCategory =
                project.getAttribute(
                    "data-category"
                );


            const showProject =
                category === "all" ||
                projectCategory === category;


            if (showProject) {

                /*
                   IMPORTANTE:

                   O display é alterado
                   diretamente pelo JavaScript.

                   Isso evita problemas caso
                   o CSS tenha regras de
                   display, grid ou animação.
                */

                project.style.setProperty(
                    "display",
                    "",
                    "important"
                );


                project.classList.remove(
                    "project-hidden"
                );


                project.classList.add(
                    "project-visible"
                );


                /*
                   Pequeno reset da animação
                   para o projeto voltar
                   corretamente.
                */

                project.classList.add(
                    "scroll-show"
                );


            } else {

                /*
                   Esconde completamente
                   o projeto.
                */

                project.style.setProperty(
                    "display",
                    "none",
                    "important"
                );


                project.classList.remove(
                    "project-visible"
                );


                project.classList.add(
                    "project-hidden"
                );

            }

        });


        refreshIcons();

    }


    /* =====================================================
       BOTÕES
       ===================================================== */

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                const category =
                    filter.getAttribute(
                        "data-filter"
                    );


                /* Remove ativo dos outros */

                filters.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                /* Ativa botão atual */

                filter.classList.add(
                    "active"
                );


                /* Executa filtro */

                filterProjects(
                    category || "all"
                );

            }
        );

    });


    /*
       Estado inicial:

       Todos os projetos aparecem.
    */

    filterProjects("all");

}


/* =========================================================
   CONTADORES
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const counter =
                        entry.target;


                    const target =
                        parseInt(
                            counter.getAttribute(
                                "data-counter"
                            )
                        ) || 0;


                    let current = 0;


                    const duration =
                        1500;


                    const increment =
                        target /
                        (duration / 16);


                    function updateCounter() {

                        current += increment;


                        if (
                            current >=
                            target
                        ) {

                            counter.textContent =
                                target;

                            return;

                        }


                        counter.textContent =
                            Math.floor(
                                current
                            );


                        requestAnimationFrame(
                            updateCounter
                        );

                    }


                    updateCounter();


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   SCROLL SUAVE
   ========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length < 2
                ) {
                    return;
                }


                let target = null;


                try {

                    target =
                        document.querySelector(
                            targetId
                        );

                } catch (error) {

                    return;

                }


                if (!target) return;


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    10;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   EFEITOS NOS CARDS
   ========================================================= */

function initCardEffects() {

    const cards =
        document.querySelectorAll(
            ".project-card, .service-card, .price-card"
        );


    if (!cards.length) return;


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                /*
                   Desativa o efeito em
                   dispositivos pequenos.
                */

                if (
                    window.innerWidth < 768
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                if (
                    centerX === 0 ||
                    centerY === 0
                ) {
                    return;
                }


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   BOTÃO VOLTAR AO TOPO
   ========================================================= */

function initBackToTop() {

    let button =
        document.querySelector(
            ".back-to-top"
        );


    /*
       Se não existir no HTML,
       cria automaticamente.
    */

    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.className =
            "back-to-top";


        button.setAttribute(
            "type",
            "button"
        );


        button.setAttribute(
            "aria-label",
            "Voltar ao topo"
        );


        button.innerHTML =
            '<i data-lucide="arrow-up"></i>';


        document.body.appendChild(
            button
        );


        refreshIcons();

    }


    function updateBackToTop() {

        if (window.scrollY > 600) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   PARALLAX DO HERO
   ========================================================= */

function initHeroParallax() {

    const hero =
        document.querySelector(
            ".hero"
        );


    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        !hero ||
        !visual
    ) {
        return;
    }


    /*
       Não executa em celulares.
    */

    if (
        window.innerWidth < 768
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            if (
                rect.width === 0 ||
                rect.height === 0
            ) {
                return;
            }


            const x =
                (event.clientX -
                    rect.left) /
                    rect.width -
                0.5;


            const y =
                (event.clientY -
                    rect.top) /
                    rect.height -
                0.5;


            visual.style.transform =
                `translate(
                    ${x * 10}px,
                    ${y * 10}px
                )`;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            visual.style.transform =
                "translate(0, 0)";

        }
    );

}


/* =========================================================
   ANIMAÇÃO DO CURSOR / GLOW
   ========================================================= */

function initMouseGlow() {

    const hero =
        document.querySelector(
            ".hero"
        );


    if (!hero) return;


    /*
       Desativa em dispositivos
       que normalmente não possuem
       mouse.
    */

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            hero.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            hero.style.setProperty(
                "--mouse-y",
                `${y}px`
            );

        }
    );

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function openWhatsApp(message = "") {

    /*
       Número da MP Tech

       Formato:
       55 + DDD + número
    */

    const phone =
        "55159972506701";


    const defaultMessage =
        "Olá! Conheci a MP Tech e gostaria de saber mais sobre criação de sites para minha empresa.";


    const text =
        message &&
        message.trim()
            ? message
            : defaultMessage;


    const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(
            text
        )}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   BOTÕES DE ORÇAMENTO / WHATSAPP
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-whatsapp]"
            );


        if (!button) return;


        event.preventDefault();


        const message =
            button.getAttribute(
                "data-whatsapp"
            ) || "";


        openWhatsApp(message);

    }
);


/* =========================================================
   LINKS EXTERNOS
   ========================================================= */

function initExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

}


/* =========================================================
   ANIMAÇÃO DAS BARRAS
   ========================================================= */

function animateProgressBars() {

    const bars =
        document.querySelectorAll(
            "[data-progress]"
        );


    if (!bars.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const bar =
                        entry.target;


                    const value =
                        parseFloat(
                            bar.getAttribute(
                                "data-progress"
                            )
                        );


                    if (
                        Number.isNaN(value)
                    ) {
                        return;
                    }


                    const safeValue =
                        Math.min(
                            100,
                            Math.max(
                                0,
                                value
                            )
                        );


                    bar.style.width =
                        `${safeValue}%`;


                    observer.unobserve(
                        bar
                    );

                });

            },
            {
                threshold: 0.4
            }
        );


    bars.forEach(bar => {

        observer.observe(bar);

    });

}


/* =========================================================
   LINK DO JOGO — MP TECH LAB
   ========================================================= */

function openSnakeGame() {

    window.open(
        "https://marlon0090.github.io/Jogo-da-Cobrinha/",
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   PREVENÇÃO DE ERROS EM IMAGENS
   ========================================================= */

function initImageErrors() {

    const images =
        document.querySelectorAll(
            "img"
        );


    if (!images.length) return;


    images.forEach(img => {

        img.addEventListener(
            "error",
            () => {

                img.classList.add(
                    "image-error"
                );

            }
        );


        /*
           Caso a imagem já tenha
           falhado antes do JS carregar.
        */

        if (
            img.complete &&
            img.naturalWidth === 0
        ) {

            img.classList.add(
                "image-error"
            );

        }

    });

}


/* =========================================================
   TECLA ESC — FECHAR MENU MOBILE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        const nav =
            document.getElementById(
                "nav"
            );


        const menuButton =
            document.getElementById(
                "menuMobile"
            );


        if (!nav || !menuButton) {
            return;
        }


        nav.classList.remove(
            "active"
        );


        menuButton.classList.remove(
            "active"
        );


        const icon =
            menuButton.querySelector(
                "i"
            );


        if (icon) {

            icon.setAttribute(
                "data-lucide",
                "menu"
            );


            refreshIcons();

        }

    }
);


/* =========================================================
   DETECÇÃO DE VISIBILIDADE DA PÁGINA
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        /*
           Quando o usuário volta para
           a aba, atualiza os ícones.
        */

        if (
            document.visibilityState ===
            "visible"
        ) {

            refreshIcons();

        }

    }
);


/* =========================================================
   LOG DO PROJETO
   ========================================================= */

console.log(
    "%c MP TECH ",
    "font-size:22px;font-weight:bold;"
);


console.log(
    "Sites profissionais, modernos e pensados para negócios."
);


console.log(
    "Desenvolvido por MP Tech."
);