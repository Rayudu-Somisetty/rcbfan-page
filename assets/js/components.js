// RCB Fan Website - Component JavaScript
(function() {
    'use strict';

    // Component registry
    const components = {};

    // Initialize all components when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeModals();
        initializeTabs();
        initializeAccordions();
        initializeCarousels();
        initializeCountdownTimers();
        initializeVideoPlayers();
        initializeTooltips();
        initializeForms();
        initializeToggleSwitches();
        initializeRatings();
        initializePagination();
        initializeGallery();
    });

    // Modal Component
    function initializeModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modals = document.querySelectorAll('.modal-overlay');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            });
        });

        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    closeModal(modal.id);
                });
            }

            // Close on overlay click
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this.id);
                }
            });
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    closeModal(activeModal.id);
                }
            }
        });
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Tabs Component
    function initializeTabs() {
        const tabContainers = document.querySelectorAll('.tabs');

        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-btn');
            const tabContents = container.querySelectorAll('.tab-content');

            tabButtons.forEach((button, index) => {
                button.addEventListener('click', function() {
                    // Remove active class from all tabs and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    // Add active class to clicked tab and corresponding content
                    this.classList.add('active');
                    if (tabContents[index]) {
                        tabContents[index].classList.add('active');
                    }
                });
            });
        });
    }

    // Accordion Component
    function initializeAccordions() {
        const accordions = document.querySelectorAll('.accordion');

        accordions.forEach(accordion => {
            const headers = accordion.querySelectorAll('.accordion-header');

            headers.forEach(header => {
                header.addEventListener('click', function() {
                    const item = this.parentElement;
                    const content = item.querySelector('.accordion-content');
                    const isActive = this.classList.contains('active');

                    // Close all accordion items in this accordion
                    accordion.querySelectorAll('.accordion-header').forEach(h => {
                        h.classList.remove('active');
                        h.parentElement.querySelector('.accordion-content').classList.remove('active');
                    });

                    // If this item wasn't active, open it
                    if (!isActive) {
                        this.classList.add('active');
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // Carousel/Slider Component
    function initializeCarousels() {
        const carousels = document.querySelectorAll('.carousel');

        carousels.forEach(carousel => {
            const slides = carousel.querySelectorAll('.carousel-slide');
            const prevBtn = carousel.querySelector('.carousel-prev');
            const nextBtn = carousel.querySelector('.carousel-next');
            const indicators = carousel.querySelectorAll('.carousel-indicator');
            
            let currentSlide = 0;
            let carouselInterval;

            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === index);
                });
                
                currentSlide = index;
            }

            function nextSlide() {
                const next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }

            function prevSlide() {
                const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
                showSlide(prev);
            }

            function startAutoplay() {
                carouselInterval = setInterval(nextSlide, 5000);
            }

            function stopAutoplay() {
                clearInterval(carouselInterval);
            }

            // Initialize
            if (slides.length > 0) {
                showSlide(0);
                startAutoplay();
            }

            // Event listeners
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                });
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    stopAutoplay();
                    prevSlide();
                    startAutoplay();
                });
            }

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    stopAutoplay();
                    showSlide(index);
                    startAutoplay();
                });
            });

            // Pause on hover
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
        });
    }

    // Countdown Timer Component
    function initializeCountdownTimers() {
        const countdownTimers = document.querySelectorAll('.countdown-timer');

        countdownTimers.forEach(timer => {
            const targetDate = new Date(timer.getAttribute('data-target-date'));
            
            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate.getTime() - now;

                if (distance < 0) {
                    timer.innerHTML = '<div class="countdown-expired">Event Started!</div>';
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                timer.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                `;
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);
        });
    }

    // Video Player Component
    function initializeVideoPlayers() {
        const videoPlayers = document.querySelectorAll('.video-player');

        videoPlayers.forEach(player => {
            const video = player.querySelector('video');
            const playBtn = player.querySelector('.video-play-btn');
            const progressBar = player.querySelector('.video-progress-bar');
            const progress = player.querySelector('.video-progress');
            const timeDisplay = player.querySelector('.video-time');

            if (!video) return;

            // Play/pause functionality
            function togglePlay() {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            }

            // Update progress bar
            function updateProgress() {
                const progressPercent = (video.currentTime / video.duration) * 100;
                progressBar.style.width = progressPercent + '%';
                
                if (timeDisplay) {
                    const current = formatTime(video.currentTime);
                    const duration = formatTime(video.duration);
                    timeDisplay.textContent = `${current} / ${duration}`;
                }
            }

            // Format time helper
            function formatTime(seconds) {
                const mins = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${mins}:${secs.toString().padStart(2, '0')}`;
            }

            // Event listeners
            if (playBtn) {
                playBtn.addEventListener('click', togglePlay);
            }

            video.addEventListener('click', togglePlay);
            video.addEventListener('timeupdate', updateProgress);

            // Progress bar click
            if (progress) {
                progress.addEventListener('click', function(e) {
                    const clickX = e.offsetX;
                    const width = this.offsetWidth;
                    const clickTime = (clickX / width) * video.duration;
                    video.currentTime = clickTime;
                });
            }
        });
    }

    // Tooltip Component
    function initializeTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');

        tooltips.forEach(element => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltipPosition = element.getAttribute('data-tooltip-position') || 'top';

            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = `tooltip-content tooltip-${tooltipPosition}`;
            tooltip.textContent = tooltipText;
            element.appendChild(tooltip);

            // Show/hide tooltip
            element.addEventListener('mouseenter', function() {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            });

            element.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            });
        });
    }

    // Form Validation and Enhancement
    function initializeForms() {
        const forms = document.querySelectorAll('form[data-validate]');

        forms.forEach(form => {
            const inputs = form.querySelectorAll('.form-control');

            // Real-time validation
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });

                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });

            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });

                if (isValid) {
                    // Handle form submission
                    handleFormSubmission(this);
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        let isValid = true;
        let errorMessage = '';

        // Remove existing error classes
        field.classList.remove('error', 'success');
        const existingError = field.parentElement.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Phone validation
        else if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Custom validation
        const customPattern = field.getAttribute('pattern');
        if (customPattern && value) {
            const regex = new RegExp(customPattern);
            if (!regex.test(value)) {
                isValid = false;
                errorMessage = field.getAttribute('data-error-message') || 'Invalid format';
            }
        }

        // Update field appearance
        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        } else if (value) {
            field.classList.add('success');
        }

        return isValid;
    }

    function showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }

    function handleFormSubmission(form) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            RCBUtils.showNotification('Form submitted successfully!', 'success');
            form.reset();
            
            // Reset submit button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove validation classes
            form.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error', 'success');
            });
        }, 2000);
    }

    // Toggle Switch Component
    function initializeToggleSwitches() {
        const toggles = document.querySelectorAll('.switch-input');

        toggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const callback = this.getAttribute('data-callback');
                if (callback && window[callback]) {
                    window[callback](this.checked);
                }

                // Trigger custom event
                const event = new CustomEvent('toggleChanged', {
                    detail: { checked: this.checked, element: this }
                });
                document.dispatchEvent(event);
            });
        });
    }

    // Rating Component
    function initializeRatings() {
        const ratings = document.querySelectorAll('.rating');

        ratings.forEach(rating => {
            const stars = rating.querySelectorAll('.rating-star');
            const input = rating.querySelector('input[type="hidden"]');

            stars.forEach((star, index) => {
                star.addEventListener('click', function() {
                    const ratingValue = index + 1;
                    
                    // Update visual state
                    stars.forEach((s, i) => {
                        s.classList.toggle('active', i < ratingValue);
                    });

                    // Update input value
                    if (input) {
                        input.value = ratingValue;
                    }

                    // Trigger custom event
                    const event = new CustomEvent('ratingChanged', {
                        detail: { rating: ratingValue, element: rating }
                    });
                    document.dispatchEvent(event);
                });

                // Hover effect
                star.addEventListener('mouseenter', function() {
                    const hoverValue = index + 1;
                    stars.forEach((s, i) => {
                        s.style.color = i < hoverValue ? 'var(--rcb-gold)' : 'var(--gray-300)';
                    });
                });
            });

            // Reset on mouse leave
            rating.addEventListener('mouseleave', function() {
                const currentRating = input ? parseInt(input.value) : 0;
                stars.forEach((s, i) => {
                    s.style.color = i < currentRating ? 'var(--rcb-gold)' : 'var(--gray-300)';
                });
            });
        });
    }

    // Pagination Component
    function initializePagination() {
        const paginationContainers = document.querySelectorAll('.pagination');

        paginationContainers.forEach(pagination => {
            const buttons = pagination.querySelectorAll('.pagination-btn');

            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (this.classList.contains('active') || this.hasAttribute('disabled')) {
                        return;
                    }

                    // Remove active class from all buttons
                    buttons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');

                    // Get page number
                    const page = this.getAttribute('data-page');
                    
                    // Trigger custom event
                    const event = new CustomEvent('pageChanged', {
                        detail: { page: page, element: pagination }
                    });
                    document.dispatchEvent(event);
                });
            });
        });
    }

    // Gallery Component
    function initializeGallery() {
        const galleries = document.querySelectorAll('.gallery');

        galleries.forEach(gallery => {
            const items = gallery.querySelectorAll('.gallery-item');

            items.forEach((item, index) => {
                item.addEventListener('click', function() {
                    openLightbox(gallery, index);
                });
            });
        });
    }

    function openLightbox(gallery, startIndex) {
        const items = gallery.querySelectorAll('.gallery-item');
        let currentIndex = startIndex;

        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox">
                <div class="lightbox-header">
                    <span class="lightbox-counter">1 / ${items.length}</span>
                    <button class="lightbox-close">&times;</button>
                </div>
                <div class="lightbox-content">
                    <button class="lightbox-prev">&lsaquo;</button>
                    <div class="lightbox-image-container">
                        <img class="lightbox-image" src="" alt="">
                        <div class="lightbox-caption"></div>
                    </div>
                    <button class="lightbox-next">&rsaquo;</button>
                </div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Get elements
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxCounter = lightbox.querySelector('.lightbox-counter');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');

        function showImage(index) {
            const item = items[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-title');

            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxCounter.textContent = `${index + 1} / ${items.length}`;
            currentIndex = index;
        }

        function nextImage() {
            const next = (currentIndex + 1) % items.length;
            showImage(next);
        }

        function prevImage() {
            const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            showImage(prev);
        }

        function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function handleKeydown(e) {
            switch (e.key) {
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    document.removeEventListener('keydown', handleKeydown);
                    break;
            }
        });

        // Show initial image
        showImage(startIndex);
        
        // Animate in
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 50);
    }

    // Expose components API
    window.RCBComponents = {
        openModal: openModal,
        closeModal: closeModal,
        validateField: validateField,
        showFieldError: showFieldError
    };

})();