// Video and Gallery Interactions

document.addEventListener('DOMContentLoaded', function() {
    initVideoPlayers();
    initGalleryFilters();
    initGalleryLightbox();
});

// Video Player Functionality
function initVideoPlayers() {
    const videoPlayButtons = document.querySelectorAll('.video-play-btn');
    
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            playVideo(videoId);
        });
    });
}

function playVideo(videoId) {
    // Sample video URLs for demonstration
    const sampleVideos = {
        'season-highlights': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'kohli-century': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'maxwell-super': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'fan-celebrations': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'training-montage': 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        'player-interviews': 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    };
    
    const videoUrl = sampleVideos[videoId] || sampleVideos['season-highlights'];
    
    // Create modal for video
    const modal = document.createElement('div');
    modal.className = 'video-modal active';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <iframe 
                width="800" 
                height="450" 
                src="${videoUrl}" 
                title="RCB Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Gallery Filter Functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery Lightbox Functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const viewBtn = item.querySelector('.gallery-view-btn');
        const img = item.querySelector('img');
        
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openLightbox(img.src, img.alt);
            });
        }
        
        item.addEventListener('click', function() {
            openLightbox(img.src, img.alt);
        });
    });
}

function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox active';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${imageSrc}" alt="${imageAlt}">
            <div class="lightbox-caption">${imageAlt}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox functionality
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeLightbox = document.querySelector('.gallery-lightbox.active');
            if (activeLightbox) {
                document.body.removeChild(activeLightbox);
            }
        }
    });
}

// Add lightbox styles dynamically
const lightboxStyles = `
.gallery-lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.gallery-lightbox.active {
    opacity: 1;
    visibility: visible;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    text-align: center;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    transition: color 0.3s ease;
}

.lightbox-close:hover {
    color: #E41E23;
}

.lightbox-caption {
    color: white;
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
}

.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.video-modal-content {
    position: relative;
    background: black;
    border-radius: 8px;
    overflow: hidden;
}

.video-modal-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 10px;
    transition: color 0.3s ease;
}

.video-modal-close:hover {
    color: #E41E23;
}

@media (max-width: 768px) {
    .video-modal-content iframe {
        width: 90vw;
        height: 50vw;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);