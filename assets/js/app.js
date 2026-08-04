/* =====================================================
   IEM CIUDAD EBEN EZER
   app.js
   BLOQUE 1 - BASE DEL SISTEMA
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header?.classList.add("scrolled");
        } else {
            header?.classList.remove("scrolled");
        }
    });


    /* =========================================
       MENÚ HAMBURGUESA (MÓVIL)
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }


    /* =========================================
       DROPDOWN MENÚ (CLICK)
    ========================================= */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });
    });

    document.addEventListener("click", () => {
        dropdowns.forEach(d => d.classList.remove("active"));
    });

});


/* =====================================================
   CARRUSEL AUTOMÁTICO - HERO INICIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    let currentIndex = 0;
    let intervalTime = 5000;
    let autoSlide;

    /* mostrar slide */
    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            dots[i]?.classList.remove("active");

            if (i === index) {
                slide.classList.add("active");
                dots[i]?.classList.add("active");
            }
        });

        currentIndex = index;
    }

    /* siguiente slide */
    function nextSlide() {
        let next = currentIndex + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showSlide(next);
    }

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

});


/* =====================================================
   ANIMACIONES DE SCROLL (FADE-IN)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        observer.observe(el);
    });

});


/* =====================================================
   MEJORAS UX Y UTILIDADES GLOBALES
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector("nav");
    const menuLinks = document.querySelectorAll("nav ul li a");
    const menuToggle = document.querySelector(".menu-toggle");

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav?.classList.remove("active");
        });
    });

    const scrollBtn = document.createElement("div");
    scrollBtn.classList.add("floating-btn");
    scrollBtn.innerHTML = "↑";
    document.body.appendChild(scrollBtn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const dropdowns = document.querySelectorAll(".dropdown");

    window.addEventListener("scroll", () => {
        dropdowns.forEach(d => d.classList.remove("active"));
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            nav?.classList.remove("active");
            dropdowns.forEach(d => d.classList.remove("active"));
        }
    });

});


/* =====================================================
   PQRS - VALIDACIÓN Y MANEJO DEL FORMULARIO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".pqrs-form");

    if (!form) return;

    const inputs = form.querySelectorAll("input, select, textarea");

    function validateField(field) {
        if (!field.value.trim()) {
            field.style.border = "2px solid #c0392b";
            return false;
        } else {
            field.style.border = "1px solid #DDDDDD";
            return true;
        }
    }

    function validateForm() {
        let valid = true;

        inputs.forEach(input => {
            const ok = validateField(input);
            if (!ok) valid = false;
        });

        return valid;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Por favor completa todos los campos del formulario PQRS.");
            return;
        }

        alert("PQRS enviada correctamente. Gracias por tu solicitud.");

        form.reset();

        inputs.forEach(input => {
            input.style.border = "1px solid #DDDDDD";
        });
    });

});


/* =====================================================
   CARRUSEL AUTOMÁTICO - HERO INICIO (SLIDE CORREGIDO)
===================================================== */

let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide() {

    if (slides.length === 0) return;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    index = (index + 1) % slides.length;
}

showSlide();
setInterval(showSlide, 4000);