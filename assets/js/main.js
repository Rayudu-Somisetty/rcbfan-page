// RCB Fan Website - Main JavaScript
(function() {
    'use strict';

    // Global variables
    let currentSlide = 0;
    let slides = [];
    let slideInterval;

    // Initialize the website
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeHeroSlider();
        initializeScrollEffects();
        initializeCountdown();
        initializeAnimations();
        initializeBackToTop();
        initializeSearch();
        initializeLazyLoading();
    });

    // Navigation functionality
    function initializeNavigation() {
        const header = document.getElementById('mainHeader');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        const searchInput = document.getElementById('searchInput');

        // Scroll effect for header
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close mobile menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active navigation highlighting
        updateActiveNavigation();
        window.addEventListener('scroll', updateActiveNavigation);
    }

    // Update active navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.getElementById('mainHeader').offsetHeight;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Hero slider functionality
    function initializeHeroSlider() {
        slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');

        if (slides.length === 0) return;

        // Initialize first slide
        showSlide(0);

        // Auto-advance slides
        startSlideShow();

        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                goToSlide(currentSlide - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                goToSlide(currentSlide + 1);
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                goToSlide(index);
            });
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopSlideShow);
            heroSection.addEventListener('mouseleave', startSlideShow);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
            }
        });
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function goToSlide(index) {
        stopSlideShow();
        
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }
        
        showSlide(index);
        startSlideShow();
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Scroll effects and animations
    function initializeScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Animate numbers in stats
                    if (entry.target.classList.contains('stat-number')) {
                        animateNumber(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.fade-in, .stat-number');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Animate numbers
    function animateNumber(element) {
        const finalNumber = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/[\d,]/g, '');
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(function() {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            
            let displayNumber = Math.floor(currentNumber);
            if (displayNumber >= 1000 && displayNumber < 1000000) {
                displayNumber = (displayNumber / 1000).toFixed(displayNumber % 1000 === 0 ? 0 : 1) + 'K';
            } else if (displayNumber >= 1000000) {
                displayNumber = (displayNumber / 1000000).toFixed(1) + 'M';
            }
            
            element.textContent = displayNumber + suffix;
        }, stepTime);
    }

    // Countdown timer
    function initializeCountdown() {
        const countdownElement = document.getElementById('nextMatchCountdown');
        if (!countdownElement) return;

        // Set the date for next match (example: 30 days from now)
        const nextMatchDate = new Date();
        nextMatchDate.setDate(nextMatchDate.getDate() + 30);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = nextMatchDate.getTime() - now;

            if (distance < 0) {
                countdownElement.textContent = 'Match Day!';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            countdownElement.textContent = days;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000 * 60); // Update every minute
    }

    // Initialize animations
    function initializeAnimations() {
        // Add fade-in class to elements that should animate
        const elementsToAnimate = document.querySelectorAll('.player-card, .news-card, .stat-item');
        elementsToAnimate.forEach((element, index) => {
            element.classList.add('fade-in');
            element.style.animationDelay = (index * 0.1) + 's';
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-bg-img');
            
            if (heroBackground) {
                const speed = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    // Back to top button
    function initializeBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class=\"fas fa-chevron-up\"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Search functionality
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();

            if (query.length < 2) {
                hideSearchResults();
                return;
            }

            searchTimeout = setTimeout(function() {
                performSearch(query);
            }, 300);
        });

        // Hide search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                hideSearchResults();
            }
        });
    }

    function performSearch(query) {
        // Mock search results - in a real app, this would query an API
        const mockResults = [
            { title: 'Virat Kohli Profile', url: 'pages/players.html#virat-kohli', type: 'Player' },
            { title: 'RCB vs CSK Match', url: 'pages/fixtures.html', type: 'Match' },
            { title: 'RCB Jersey Collection', url: 'pages/jerseys.html', type: 'Merchandise' },
            { title: 'IPL 2025 Squad', url: 'pages/squad.html', type: 'Squad' }
        ];

        const filteredResults = mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        showSearchResults(filteredResults);
    }

    function showSearchResults(results) {
        let searchResults = document.getElementById('searchResults');
        
        if (!searchResults) {
            searchResults = document.createElement('div');
            searchResults.id = 'searchResults';
            searchResults.className = 'search-results';
            document.querySelector('.search-container').appendChild(searchResults);
        }

        if (results.length === 0) {
            searchResults.innerHTML = '<div class=\"search-result-item no-results\">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(result => `
                <a href=\"${result.url}\" class=\"search-result-item\">
                    <div class=\"search-result-title\">${result.title}</div>
                    <div class=\"search-result-type\">${result.type}</div>
                </a>
            `).join('');
        }

        searchResults.style.display = 'block';
    }

    function hideSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    // Lazy loading for images
    function initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    // Utility functions
    window.RCBUtils = {
        // Debounce function
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction() {
                const context = this;
                const args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        // Throttle function
        throttle: function(func, limit) {
            let lastFunc;
            let lastRan;
            return function() {
                const context = this;
                const args = arguments;
                if (!lastRan) {
                    func.apply(context, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(function() {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(context, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            };
        },

        // Format number with commas
        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // Format date
        formatDate: function(date, format = 'MMMM DD, YYYY') {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            const d = new Date(date);
            
            return format
                .replace('MMMM', months[d.getMonth()])
                .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
                .replace('DD', String(d.getDate()).padStart(2, '0'))
                .replace('YYYY', d.getFullYear());
        },

        // Show loading spinner
        showLoading: function(element) {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = '<div class="spinner"></div>';
            element.appendChild(spinner);
        },

        // Hide loading spinner
        hideLoading: function(element) {
            const spinner = element.querySelector('.loading-spinner');
            if (spinner) {
                spinner.remove();
            }
        },

        // Show notification
        showNotification: function(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // Position notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            // Set background color based on type
            const colors = {
                success: '#28a745',
                error: '#dc3545',
                warning: '#ffc107',
                info: '#17a2b8'
            };
            notification.style.backgroundColor = colors[type] || colors.info;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after duration
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, duration);
        }
    };

    // Performance optimization
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

})();