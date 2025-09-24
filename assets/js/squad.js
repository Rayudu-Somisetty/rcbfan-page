// Squad Page JavaScript
(function() {
    'use strict';

    // Mock player data
    const players = [
        {
            name: 'Virat Kohli',
            role: 'Right-hand Batter',
            category: 'batters',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'crown', text: 'Legend', class: '' },
            stats: {
                runs: '8000+',
                centuries: '8',
                strikeRate: '131.5',
                wickets: '-',
                economy: '-',
                average: '37.2'
            },
            detailedStats: {
                matches: 234,
                runs: 8004,
                average: 37.25,
                strikeRate: 131.5,
                centuries: 8,
                fifties: 52,
                highestScore: '113*',
                catches: 156
            }
        },
        {
            name: 'Faf du Plessis',
            role: 'Right-hand Batter',
            category: 'batters',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'star', text: 'Captain', class: 'captain' },
            stats: {
                runs: '3000+',
                centuries: '2',
                strikeRate: '130.2',
                wickets: '-',
                economy: '-',
                average: '34.8'
            },
            detailedStats: {
                matches: 100,
                runs: 2935,
                average: 34.83,
                strikeRate: 130.20,
                centuries: 2,
                fifties: 22,
                highestScore: '96*',
                catches: 45
            }
        },
        {
            name: 'Glenn Maxwell',
            role: 'All-rounder',
            category: 'all-rounders',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'bolt', text: 'Big Show', class: '' },
            stats: {
                runs: '2500+',
                centuries: '1',
                strikeRate: '155.3',
                wickets: '30+',
                economy: '7.8',
                average: '28.5'
            },
            detailedStats: {
                matches: 120,
                runs: 2579,
                average: 28.54,
                strikeRate: 155.32,
                centuries: 1,
                fifties: 15,
                highestScore: '78*',
                wickets: 32,
                bowlingAverage: 28.5,
                economy: 7.83,
                catches: 78
            }
        },
        {
            name: 'Mohammed Siraj',
            role: 'Right-arm Fast',
            category: 'bowlers',
            image: 'https://images.unsplash.com/photo-1567456798940-b2cd0c3b3b88?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'fire', text: 'Purple Cap', class: '' },
            stats: {
                runs: '150+',
                centuries: '0',
                strikeRate: '120.5',
                wickets: '100+',
                economy: '8.2',
                average: '22.5'
            },
            detailedStats: {
                matches: 78,
                wickets: 104,
                average: 22.51,
                economy: 8.19,
                strikeRate: 16.5,
                bestFigures: '4/21',
                runs: 152,
                battingAverage: 8.4,
                catches: 25
            }
        },
        {
            name: 'Dinesh Karthik',
            role: 'Wicket-keeper Batter',
            category: 'wicket-keepers',
            image: 'https://images.unsplash.com/photo-1593766772858-66c19e2c5c97?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'gloves', text: 'Finisher', class: '' },
            stats: {
                runs: '4000+',
                centuries: '1',
                strikeRate: '140.5',
                wickets: '-',
                economy: '-',
                average: '26.8'
            },
            detailedStats: {
                matches: 234,
                runs: 4052,
                average: 26.83,
                strikeRate: 140.54,
                centuries: 1,
                fifties: 22,
                highestScore: '97*',
                dismissals: 189,
                catches: 148,
                stumpings: 41
            }
        },
        {
            name: 'Josh Hazlewood',
            role: 'Right-arm Fast',
            category: 'bowlers',
            image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=500&fit=crop&q=80',
            badge: { icon: 'target', text: 'Precision', class: '' },
            stats: {
                runs: '45+',
                centuries: '0',
                strikeRate: '95.2',
                wickets: '60+',
                economy: '7.8',
                average: '20.1'
            },
            detailedStats: {
                matches: 42,
                wickets: 63,
                average: 20.14,
                economy: 7.83,
                strikeRate: 15.4,
                bestFigures: '4/25',
                runs: 47,
                battingAverage: 7.8,
                catches: 15
            }
        }
    ];

    let filteredPlayers = [...players];
    let currentDisplayCount = 6;

    // Initialize squad page
    document.addEventListener('DOMContentLoaded', function() {
        initializeFilters();
        initializePlayerCards();
        initializeLoadMore();
        initializePlayerModal();
        initializeSearch();
    });

    // Initialize filter functionality
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter players
                filterPlayers(filter);
                updatePlayerDisplay();
            });
        });
    }

    // Filter players based on category
    function filterPlayers(category) {
        if (category === 'all') {
            filteredPlayers = [...players];
        } else {
            filteredPlayers = players.filter(player => player.category === category);
        }
        currentDisplayCount = Math.min(6, filteredPlayers.length);
    }

    // Initialize player cards
    function initializePlayerCards() {
        renderPlayerCards();
        
        // Add click handlers for player stats modals
        document.addEventListener('click', function(e) {
            if (e.target.matches('[data-modal="playerStatsModal"]')) {
                const playerName = e.target.getAttribute('data-player');
                showPlayerStats(playerName);
            }
        });
    }

    // Render player cards
    function renderPlayerCards() {
        const squadGrid = document.getElementById('squadGrid');
        if (!squadGrid) return;

        const playersToShow = filteredPlayers.slice(0, currentDisplayCount);
        
        squadGrid.innerHTML = playersToShow.map((player, index) => {
            return createPlayerCard(player, index);
        }).join('');

        // Animate cards
        setTimeout(() => {
            squadGrid.querySelectorAll('.player-card-detailed').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    }

    // Create player card HTML
    function createPlayerCard(player, index) {
        return `
            <div class="player-card-detailed" data-category="${player.category}" data-animate="fadeInUp" data-delay="${index * 100}">
                <div class="player-image-container">
                    <img src="${player.image}" alt="${player.name}" class="player-image">
                    <div class="player-badge${player.badge.class ? ' ' + player.badge.class : ''}">
                        <i class="fas fa-${player.badge.icon}"></i>
                        <span>${player.badge.text}</span>
                    </div>
                </div>
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
                    <p class="player-role">${player.role}</p>
                    <div class="player-stats-preview">
                        <div class="stat">
                            <span class="stat-value">${getDisplayStat(player, 'primary')}</span>
                            <span class="stat-label">${getDisplayStatLabel(player, 'primary')}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${getDisplayStat(player, 'secondary')}</span>
                            <span class="stat-label">${getDisplayStatLabel(player, 'secondary')}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${getDisplayStat(player, 'tertiary')}</span>
                            <span class="stat-label">${getDisplayStatLabel(player, 'tertiary')}</span>
                        </div>
                    </div>
                    <div class="player-actions">
                        <a href="player-profile.html?player=${player.name.toLowerCase().replace(/\s+/g, '-')}" class="btn btn-primary">View Profile</a>
                        <button class="btn btn-secondary" data-modal="playerStatsModal" data-player="${player.name}">Quick Stats</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Get display stat based on player type
    function getDisplayStat(player, statType) {
        if (player.category === 'bowlers') {
            switch (statType) {
                case 'primary': return player.stats.wickets;
                case 'secondary': return player.stats.economy;
                case 'tertiary': return player.stats.average;
            }
        } else if (player.category === 'wicket-keepers') {
            switch (statType) {
                case 'primary': return player.stats.runs;
                case 'secondary': return player.stats.strikeRate;
                case 'tertiary': return '200+'; // dismissals
            }
        } else {
            switch (statType) {
                case 'primary': return player.stats.runs;
                case 'secondary': return player.stats.centuries;
                case 'tertiary': return player.stats.strikeRate;
            }
        }
    }

    // Get display stat label based on player type
    function getDisplayStatLabel(player, statType) {
        if (player.category === 'bowlers') {
            switch (statType) {
                case 'primary': return 'Wickets';
                case 'secondary': return 'Economy';
                case 'tertiary': return 'Average';
            }
        } else if (player.category === 'wicket-keepers') {
            switch (statType) {
                case 'primary': return 'Runs';
                case 'secondary': return 'Strike Rate';
                case 'tertiary': return 'Dismissals';
            }
        } else {
            switch (statType) {
                case 'primary': return 'Runs';
                case 'secondary': return 'Centuries';
                case 'tertiary': return 'Strike Rate';
            }
        }
    }

    // Update player display with animation
    function updatePlayerDisplay() {
        const squadGrid = document.getElementById('squadGrid');
        const cards = squadGrid.querySelectorAll('.player-card-detailed');
        
        // Fade out existing cards
        cards.forEach(card => {
            card.classList.add('hidden');
        });
        
        // Render new cards after animation
        setTimeout(() => {
            renderPlayerCards();
        }, 300);
    }

    // Initialize load more functionality
    function initializeLoadMore() {
        const loadMoreBtn = document.getElementById('loadMorePlayers');
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', function() {
            const remainingCount = filteredPlayers.length - currentDisplayCount;
            if (remainingCount > 0) {
                currentDisplayCount = Math.min(currentDisplayCount + 6, filteredPlayers.length);
                renderPlayerCards();
                
                if (currentDisplayCount >= filteredPlayers.length) {
                    this.style.display = 'none';
                }
            }
        });

        // Update load more button visibility
        updateLoadMoreButton();
    }

    // Update load more button visibility
    function updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMorePlayers');
        if (!loadMoreBtn) return;

        if (currentDisplayCount >= filteredPlayers.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
            const remainingCount = filteredPlayers.length - currentDisplayCount;
            loadMoreBtn.textContent = `Load More Players (${remainingCount} remaining)`;
        }
    }

    // Show player stats modal
    function showPlayerStats(playerName) {
        const player = players.find(p => p.name === playerName);
        if (!player) return;

        const modalContent = document.getElementById('playerStatsContent');
        if (!modalContent) return;

        modalContent.innerHTML = generatePlayerStatsHTML(player);
        
        // Show modal
        const modal = document.getElementById('playerStatsModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    // Generate player stats HTML
    function generatePlayerStatsHTML(player) {
        const stats = player.detailedStats;
        
        let statsHTML = `
            <div class="player-stats-modal">
                <div class="player-header">
                    <img src="${player.image}" alt="${player.name}" class="player-avatar">
                    <div class="player-basic-info">
                        <h3>${player.name}</h3>
                        <p>${player.role}</p>
                    </div>
                </div>
                <div class="stats-sections">
        `;

        // Batting stats
        if (stats.runs > 0) {
            statsHTML += `
                <div class="stats-section">
                    <h4>Batting Statistics</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Matches</span>
                            <span class="stat-value">${stats.matches}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Runs</span>
                            <span class="stat-value">${stats.runs.toLocaleString()}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Average</span>
                            <span class="stat-value">${stats.average}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Strike Rate</span>
                            <span class="stat-value">${stats.strikeRate}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Centuries</span>
                            <span class="stat-value">${stats.centuries}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Fifties</span>
                            <span class="stat-value">${stats.fifties}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Highest Score</span>
                            <span class="stat-value">${stats.highestScore}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Catches</span>
                            <span class="stat-value">${stats.catches}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Bowling stats
        if (stats.wickets > 0) {
            statsHTML += `
                <div class="stats-section">
                    <h4>Bowling Statistics</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Wickets</span>
                            <span class="stat-value">${stats.wickets}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Average</span>
                            <span class="stat-value">${stats.bowlingAverage || stats.average}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Economy</span>
                            <span class="stat-value">${stats.economy}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Strike Rate</span>
                            <span class="stat-value">${stats.strikeRate}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Best Figures</span>
                            <span class="stat-value">${stats.bestFigures}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Wicket-keeping stats
        if (stats.dismissals > 0) {
            statsHTML += `
                <div class="stats-section">
                    <h4>Wicket-keeping Statistics</h4>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-label">Dismissals</span>
                            <span class="stat-value">${stats.dismissals}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Catches</span>
                            <span class="stat-value">${stats.catches}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Stumpings</span>
                            <span class="stat-value">${stats.stumpings}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        statsHTML += `
                </div>
            </div>
        `;

        return statsHTML;
    }

    // Initialize player modal
    function initializePlayerModal() {
        // Modal is already initialized in components.js
        // Additional specific functionality can be added here
    }

    // Initialize search functionality for squad page
    function initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;

        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim().toLowerCase();

            searchTimeout = setTimeout(() => {
                searchPlayers(query);
            }, 300);
        });
    }

    // Search players
    function searchPlayers(query) {
        if (query.length < 2) {
            // Reset to current filter
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter) {
                filterPlayers(activeFilter.getAttribute('data-filter'));
            }
        } else {
            // Search in current filtered results
            filteredPlayers = players.filter(player => 
                player.name.toLowerCase().includes(query) ||
                player.role.toLowerCase().includes(query)
            );
            currentDisplayCount = Math.min(6, filteredPlayers.length);
        }

        updatePlayerDisplay();
        updateLoadMoreButton();
    }

    // Expose squad functions
    window.SquadPage = {
        filterPlayers: filterPlayers,
        showPlayerStats: showPlayerStats,
        searchPlayers: searchPlayers
    };

})();

// Add squad-specific styles
const squadStyles = `
<style>
.player-stats-modal {
    max-width: 600px;
    margin: 0 auto;
}

.player-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    padding-bottom: var(--spacing-lg);
    border-bottom: 2px solid var(--gray-200);
}

.player-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--rcb-gold);
}

.player-basic-info h3 {
    color: var(--rcb-red);
    margin-bottom: var(--spacing-xs);
}

.player-basic-info p {
    color: var(--gray-600);
    margin-bottom: 0;
}

.stats-sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xl);
}

.stats-section h4 {
    color: var(--rcb-red);
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--gray-200);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-lg);
}

.stat-item {
    text-align: center;
    padding: var(--spacing-md);
    background-color: var(--gray-100);
    border-radius: 8px;
}

.stat-item .stat-label {
    display: block;
    font-size: 0.85rem;
    color: var(--gray-600);
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
}

.stat-item .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--rcb-red);
}

@media (max-width: 768px) {
    .squad-grid {
        grid-template-columns: 1fr;
    }
    
    .filter-tabs {
        flex-direction: column;
        align-items: center;
    }
    
    .squad-stats {
        flex-direction: column;
        align-items: center;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .player-header {
        flex-direction: column;
        text-align: center;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', squadStyles);