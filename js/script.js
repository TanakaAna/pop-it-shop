class BurgerMenu {
    constructor() {
        this.burger = document.querySelector('.header__burger');
        this.nav = document.querySelector('.header__nav');
        this.body = document.body;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.burger.addEventListener('click', () => this.toggle());
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.nav.contains(e.target) && !this.burger.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.nav.classList.add('header__nav--active');
        this.burger.classList.add('header__burger--active');
        this.body.style.overflow = 'hidden';
        this.isOpen = true;
    }
    
    close() {
        this.nav.classList.remove('header__nav--active');
        this.burger.classList.remove('header__burger--active');
        this.body.style.overflow = '';
        this.isOpen = false;
    }
}
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new BurgerMenu();
    new SmoothScroll();
    const style = document.createElement('style');
    style.textContent = `
        .header__burger--active .burger__line:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .header__burger--active .burger__line:nth-child(2) {
            opacity: 0;
        }
        .header__burger--active .burger__line:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);
});
