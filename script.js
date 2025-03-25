/**
 * Portfolio Interactive Elements
 * Elegant animations and user experience enhancements
 * @author Nazmul Haque
 */

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling with easing effect for navigation
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only apply smooth scroll to internal links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                    
                    // Add active state to clicked nav item
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Advanced animations for sections on scroll with staggered effect
    const sectionContainers = document.querySelectorAll('.section-container');
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    }

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay based on index
                setTimeout(() => {
                    entry.target.classList.add('section-animate');
                    
                    // Animate child elements with cascade effect
                    const children = entry.target.querySelectorAll('.skill-card, .contact-card');
                    children.forEach((child, i) => {
                        setTimeout(() => {
                            child.classList.add('element-animate');
                        }, i * 150);
                    });
                }, index * 100);
                
                sectionObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, sectionObserverOptions);

    sectionContainers.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

    // Create theme toggle button
    createThemeToggle();

    // Animate skill bars when they come into view
    const skillObserverOptions = {
        threshold: 0.5
    }

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    // Observe the skills section
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Add active class to navigation items based on scroll position
    const allSections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});

    
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.setAttribute('title', 'Toggle dark/light mode');
    
    // Apply styles
    Object.assign(themeToggle.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '1000',
        background: 'linear-gradient(135deg, #4158D0, #C850C0)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggle.style.background = 'linear-gradient(135deg, #FF8C00, #FF2D00)';
    }
    
    // Theme toggle functionality with animation
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Change icon based on theme
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.style.background = 'linear-gradient(135deg, #FF8C00, #FF2D00)';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.style.background = 'linear-gradient(135deg, #4158D0, #C850C0)';
            localStorage.setItem('theme', 'light');
        }
        
        // Add rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    