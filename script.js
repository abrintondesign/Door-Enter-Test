document.addEventListener('DOMContentLoaded', () => {
    // 1. Entrance Animations
    const triggerEntrances = () => {
        const elements = document.querySelectorAll('.entrance-animate');
        elements.forEach(el => {
            el.classList.add('active');
        });
    };
    
    // Slight delay for the browser to register styles
    setTimeout(triggerEntrances, 100);

    // 2. Scroll-Driven Door Animation
    const doorPanel = document.getElementById('door-panel');
    const doorSheen = document.getElementById('door-sheen');
    const interiorReveal = document.getElementById('interior-reveal');
    const infinity = document.getElementById('bg-infinity');
    const heroContent = document.getElementById('hero-content');
    const experienceContainer = document.getElementById('main-experience');

    // Smooth state variables (Spring imitation)
    let currentScrollProgress = 0;
    let targetScrollProgress = 0;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animateScroll = () => {
        const rect = experienceContainer.getBoundingClientRect();
        const scrollRange = experienceContainer.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        
        targetScrollProgress = Math.max(0, Math.min(1, scrolled / scrollRange));
        
        // Smooth interpolation (Stiffness 0.1)
        currentScrollProgress = lerp(currentScrollProgress, targetScrollProgress, 0.1);

        const p = currentScrollProgress;

        // Door Rotation (-35 to -115 based on [0, 0.45])
        let rotationProgress = p / 0.45;
        rotationProgress = Math.max(0, Math.min(1, rotationProgress));
        const rotationVal = -35 + (rotationProgress * (-115 - (-35)));
        
        // Door Z (0 to 100 based on [0, 0.45])
        const zVal = rotationProgress * 100;

        doorPanel.style.transform = `rotateY(${rotationVal}deg) translateZ(${zVal}px)`;

        // Sheen X (-100% to 100%) and Opacity
        const sheenProgress = Math.max(0, Math.min(1, p / 0.45));
        doorSheen.style.transform = `translateX(${-100 + (sheenProgress * 200)}%)`;
        
        let sheenOpacity = 0;
        if (p > 0.05 && p < 0.2) sheenOpacity = (p - 0.05) / 0.15;
        else if (p >= 0.2 && p < 0.4) sheenOpacity = 1 - ((p - 0.2) / 0.2);
        doorSheen.style.opacity = Math.max(0, sheenOpacity);

        // Interior Reveal (Opacity 0->1, Scale 1.1->1.0 based on [0.1, 0.45])
        let revealProgress = (p - 0.1) / (0.45 - 0.1);
        revealProgress = Math.max(0, Math.min(1, revealProgress));
        interiorReveal.style.opacity = revealProgress;
        interiorReveal.style.transform = `scale(${1.1 - (revealProgress * 0.1)})`;

        // Hero Text Fade/Parallax ([0, 0.2])
        let heroProgress = p / 0.2;
        heroProgress = Math.max(0, Math.min(1, heroProgress));
        heroContent.style.opacity = 1 - heroProgress;
        heroContent.style.transform = `translateY(${heroProgress * -100}px)`;

        // Background Infinity Parallax
        infinity.style.transform = `translateY(${p * 200}px)`;

        requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);

    // 3. Reveal on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-scroll');
    revealElements.forEach(el => revealObserver.observe(el));
});
