document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    const sectionContainers = document.querySelectorAll('.section-container');
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('section-animate');
                    
                    const children = entry.target.querySelectorAll('.skill-card, .contact-card');
                    children.forEach((child, i) => {
                        setTimeout(() => {
                            child.classList.add('element-animate');
                        }, i * 150);
                    });
                }, index * 100);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sectionContainers.forEach(section => {
        sectionObserver.observe(section);
    });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            
            const profileCard = document.querySelector('.profile-card');
            if (profileCard) {
                profileCard.style.transform = `translateY(${scrollPosition * 0.1}px) scale(${1 - scrollPosition * 0.0005})`;
                profileCard.style.boxShadow = `0 ${5 + scrollPosition * 0.05}px ${10 + scrollPosition * 0.1}px rgba(0, 0, 0, 0.2)`;
            }
        });
        
        const nameTitle = document.querySelector('.name-title');
        if (nameTitle) {
            nameTitle.innerHTML = nameTitle.textContent.split('').map(
                letter => `<span class="animated-letter">${letter}</span>`
            ).join('');
            
            document.querySelectorAll('.animated-letter').forEach((letter, i) => {
                letter.style.animationDelay = `${i * 0.1}s`;
            });
        }
    }

    const skillObserverOptions = {
        threshold: 0.5
    };

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

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

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
    
    enhanceHomepage();
});

const enhanceHomepage = () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('bounce-in');
        
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('pulse');
        });
        
        icon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                icon.classList.remove('pulse');
            }, 300);
        });
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.innerHTML = `<span class="title-underline">${title.textContent}</span>`;
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('skill-card-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('skill-card-hover');
        });
    });
    
    document.body.classList.add('enhanced');
};