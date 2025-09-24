// RCB Fan Website - Animations JavaScript
(function() {
    'use strict';

    // Animation configuration
    const animationConfig = {
        duration: 800,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        stagger: 100,
        threshold: 0.1
    };

    // Initialize animations when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeScrollAnimations();
        initializeHoverAnimations();
        initializeLoadingAnimations();
        initializeCounterAnimations();
        initializeParallaxEffects();
        initializeTypewriterEffects();
        initializeMorphingEffects();
        initializeParticleEffects();
    });

    // Scroll-triggered animations
    function initializeScrollAnimations() {
        // Create intersection observer
        const observerOptions = {
            threshold: animationConfig.threshold,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-animate');
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;

                    setTimeout(() => {
                        animateElement(element, animationType);
                    }, delay);

                    // Stop observing once animated
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Auto-add animations to common elements
        addAutoAnimations();
    }

    // Add automatic animations to common elements
    function addAutoAnimations() {
        const elementsToAnimate = [
            { selector: '.player-card', animation: 'fadeInUp', delay: 0 },
            { selector: '.news-card', animation: 'fadeInUp', delay: 100 },
            { selector: '.stat-item', animation: 'slideInLeft', delay: 200 },
            { selector: '.section-title', animation: 'fadeInDown', delay: 0 },
            { selector: '.hero-content', animation: 'fadeIn', delay: 300 }
        ];

        elementsToAnimate.forEach(config => {
            const elements = document.querySelectorAll(config.selector);
            elements.forEach((element, index) => {
                if (!element.hasAttribute('data-animate')) {
                    element.setAttribute('data-animate', config.animation);
                    element.setAttribute('data-delay', config.delay + (index * 100));
                    
                    // Add initial state
                    element.style.opacity = '0';
                    element.style.transform = getInitialTransform(config.animation);
                }
            });
        });
    }

    // Get initial transform for animation
    function getInitialTransform(animationType) {
        const transforms = {
            fadeInUp: 'translateY(50px)',
            fadeInDown: 'translateY(-50px)',
            fadeInLeft: 'translateX(-50px)',
            fadeInRight: 'translateX(50px)',
            slideInLeft: 'translateX(-100px)',
            slideInRight: 'translateX(100px)',
            slideInUp: 'translateY(100px)',
            slideInDown: 'translateY(-100px)',
            scaleIn: 'scale(0.8)',
            rotateIn: 'rotate(-180deg) scale(0.8)',
            flipInX: 'rotateX(-90deg)',
            flipInY: 'rotateY(-90deg)',
            bounceIn: 'scale(0.3)',
            zoomIn: 'scale(0)',
            fadeIn: 'none'
        };
        return transforms[animationType] || 'none';
    }

    // Animate element based on type
    function animateElement(element, animationType) {
        const animations = {
            fadeIn: () => fadeIn(element),
            fadeInUp: () => fadeInUp(element),
            fadeInDown: () => fadeInDown(element),
            fadeInLeft: () => fadeInLeft(element),
            fadeInRight: () => fadeInRight(element),
            slideInLeft: () => slideInLeft(element),
            slideInRight: () => slideInRight(element),
            slideInUp: () => slideInUp(element),
            slideInDown: () => slideInDown(element),
            scaleIn: () => scaleIn(element),
            rotateIn: () => rotateIn(element),
            flipInX: () => flipInX(element),
            flipInY: () => flipInY(element),
            bounceIn: () => bounceIn(element),
            zoomIn: () => zoomIn(element)
        };

        if (animations[animationType]) {
            animations[animationType]();
        }
    }

    // Animation functions
    function fadeIn(element) {
        element.style.transition = `opacity ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
    }

    function fadeInUp(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function fadeInDown(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function fadeInLeft(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    function fadeInRight(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    function slideInLeft(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    function slideInRight(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    function slideInUp(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function slideInDown(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function scaleIn(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    function rotateIn(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'rotate(0) scale(1)';
    }

    function flipInX(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'rotateX(0)';
    }

    function flipInY(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'rotateY(0)';
    }

    function bounceIn(element) {
        element.style.transition = `all ${animationConfig.duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    function zoomIn(element) {
        element.style.transition = `all ${animationConfig.duration}ms ${animationConfig.easing}`;
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    // Hover animations
    function initializeHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.player-card, .news-card, .card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s ease';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.3s ease';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Image hover effects
        const images = document.querySelectorAll('.player-image img, .news-image img');
        images.forEach(img => {
            img.parentElement.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.5s ease';
            });

            img.parentElement.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1)';
            });
        });
    }

    // Loading animations
    function initializeLoadingAnimations() {
        // Skeleton loading effect
        const skeletonElements = document.querySelectorAll('.skeleton');
        skeletonElements.forEach(element => {
            element.style.animation = 'skeleton-loading 1.5s ease-in-out infinite';
        });

        // Progress bar animations
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width') || '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
                bar.style.transition = 'width 2s ease-in-out';
            }, 500);
        });
    }

    // Counter animations
    function initializeCounterAnimations() {
        const counters = document.querySelectorAll('.counter, .stat-number');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/[\d,]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayValue = Math.floor(current);
            
            // Format large numbers
            if (displayValue >= 1000000) {
                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
            } else if (displayValue >= 1000) {
                displayValue = (displayValue / 1000).toFixed(displayValue % 1000 === 0 ? 0 : 1) + 'K';
            } else {
                displayValue = displayValue.toLocaleString();
            }

            element.textContent = displayValue + suffix;
        }, 16);
    }

    // Parallax effects
    function initializeParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        function updateParallax() {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }

        // Throttle scroll events for performance
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
                setTimeout(() => { ticking = false; }, 16);
            }
        }

        window.addEventListener('scroll', requestTick);
    }

    // Typewriter effects
    function initializeTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-typewriter-speed')) || 50;
            const delay = parseInt(element.getAttribute('data-typewriter-delay')) || 0;
            
            setTimeout(() => {
                typewriterEffect(element, text, speed);
            }, delay);
        });
    }

    function typewriterEffect(element, text, speed) {
        element.textContent = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                
                // Add blinking cursor
                const cursor = document.createElement('span');
                cursor.textContent = '|';
                cursor.style.animation = 'blink 1s infinite';
                element.appendChild(cursor);
            }
        }, speed);
    }

    // Morphing effects
    function initializeMorphingEffects() {
        const morphElements = document.querySelectorAll('[data-morph]');
        
        morphElements.forEach(element => {
            const texts = element.getAttribute('data-morph').split(',');
            const interval = parseInt(element.getAttribute('data-morph-interval')) || 3000;
            let currentIndex = 0;
            
            setInterval(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                morphText(element, texts[currentIndex].trim());
            }, interval);
        });
    }

    function morphText(element, newText) {
        const oldText = element.textContent;
        const maxLength = Math.max(oldText.length, newText.length);
        let progress = 0;
        
        const timer = setInterval(() => {
            let morphedText = '';
            
            for (let i = 0; i < maxLength; i++) {
                if (i < progress) {
                    morphedText += newText[i] || '';
                } else if (i < oldText.length) {
                    morphedText += String.fromCharCode(
                        33 + Math.random() * 94
                    );
                } else {
                    morphedText += '';
                }
            }
            
            element.textContent = morphedText;
            progress++;
            
            if (progress > maxLength) {
                clearInterval(timer);
                element.textContent = newText;
            }
        }, 50);
    }

    // Particle effects
    function initializeParticleEffects() {
        const particleContainers = document.querySelectorAll('[data-particles]');
        
        particleContainers.forEach(container => {
            const particleCount = parseInt(container.getAttribute('data-particles')) || 50;
            const particleColor = container.getAttribute('data-particle-color') || '#FFD700';
            
            createParticles(container, particleCount, particleColor);
        });
    }

    function createParticles(container, count, color) {
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background-color: ${color};
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
            `;
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation
            const duration = 3 + Math.random() * 4;
            const delay = Math.random() * 2;
            
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    }

    // CSS keyframes injection
    function injectAnimationStyles() {
        const styles = `
            <style>
                @keyframes skeleton-loading {
                    0% { background-position: -200px 0; }
                    100% { background-position: calc(200px + 100%) 0; }
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(120deg); }
                    66% { transform: translateY(5px) rotate(240deg); }
                }
                
                .skeleton {
                    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                    background-size: 200px 100%;
                    border-radius: 4px;
                }
                
                .particle {
                    will-change: transform;
                }
                
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Initialize styles
    injectAnimationStyles();

    // Page transition effects
    function initializePageTransitions() {
        // Fade out on page unload
        window.addEventListener('beforeunload', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
        });

        // Fade in on page load
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease';
        });
    }

    // Initialize page transitions
    initializePageTransitions();

    // Expose animation API
    window.RCBAnimations = {
        animateElement: animateElement,
        animateCounter: animateCounter,
        typewriterEffect: typewriterEffect,
        morphText: morphText,
        createParticles: createParticles,
        fadeIn: fadeIn,
        fadeInUp: fadeInUp,
        slideInLeft: slideInLeft,
        scaleIn: scaleIn,
        bounceIn: bounceIn
    };

})();