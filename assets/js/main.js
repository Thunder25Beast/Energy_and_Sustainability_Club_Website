document.addEventListener("DOMContentLoaded", function() {

    const header = document.getElementById("main-header");
    const backToTopButton = document.getElementById("back-to-top");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section");

    // 1. Header background on scroll
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // 2. Back to Top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add("visible");
        } else {
            backToTopButton.classList.remove("visible");
        }

        // 3. Active Nav Link highlighting
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - header.offsetHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    });

    // 4. "Animate on Scroll" functionality
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // 5. Smooth scrolling for anchor links (even without CSS scroll-behavior)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // --- THIS IS THE FIX ---
                // Case 1: It's the "back-to-top" link (href="#")
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return; // We are done
                }
                // --- END OF FIX ---

                // Case 2: It's a link to a section like #about or #events
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - header.offsetHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    // 7. Slider Functionality
    function initSlider(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const wrapper = container.querySelector('.slider-wrapper');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (!wrapper || !prevBtn || !nextBtn) return;

        nextBtn.addEventListener('click', () => {
            const scrollAmount = wrapper.clientWidth * 0.8; // Scroll 80% of the visible width
            wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const scrollAmount = wrapper.clientWidth * 0.8;
            wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Initialize both sliders on the homepage
    initSlider('#blogs .slider-container');
    initSlider('#media .slider-container');
}); // This closing bracket should be the *very last* thing in your file