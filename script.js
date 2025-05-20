// Mountain card hover effects and animations
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    // Add hover effect for each card
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle tilt effect on hover
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            
            // Enhanced shadow on hover
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
            
            // Highlight rating stars with glow
            const stars = this.querySelectorAll('.rating i');
            stars.forEach(star => {
                star.style.filter = 'drop-shadow(0 0 3px rgba(241, 196, 15, 0.7))';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all styles on mouse leave
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            
            // Remove star glow
            const stars = this.querySelectorAll('.rating i');
            stars.forEach(star => {
                star.style.filter = 'none';
            });
        });
        
        // Add click event for future card expansion or details view
        card.addEventListener('click', function() {
            // For now, just a subtle pulse animation on click
            this.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.02)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-in-out'
            });
        });
    });
    
    // View More button functionality
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // Start loading animation
            this.innerHTML = '<span>Loading...</span> <i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // Additional mountain destinations - this would typically come from an API
                const newDestinations = [
                    {
                        image: 'images/mountain-img.jpg',
                        location: 'Mt. Fuji, Japan',
                        title: 'Iconic Japanese Peak',
                        description: 'Climb Japan\'s most famous mountain and witness breathtaking sunrises from above the clouds.',
                        rating: 4.9,
                        price: '$1,499'
                    },
                    {
                        image: 'images/mountain-img.jpg',
                        location: 'Dolomites, Italy',
                        title: 'Italian Alpine Splendor',
                        description: 'Hike through the spectacular limestone formations and enjoy world-class Italian cuisine.',
                        rating: 4.8,
                        price: '$1,399'
                    },
                    {
                        image: 'images/mountain-img.jpg',
                        location: 'Blue Mountains, Australia',
                        title: 'Eucalyptus Wilderness',
                        description: 'Explore lush valleys, dramatic cliffs and the famous Three Sisters rock formation.',
                        rating: 4.3,
                        price: '$999'
                    },
                    {
                        image: 'images/mountain-img.jpg',
                        location: 'Atlas Mountains, Morocco',
                        title: 'North African Majesty',
                        description: 'Trek through Berber villages and experience the unique culture of Morocco\'s highlands.',
                        rating: 4.6,
                        price: '$1,199'
                    }
                ];
                
                // Get the card container
                const cardContainer = document.querySelector('.card-container');
                
                // Add new destinations
                newDestinations.forEach(destination => {
                    // Create stars based on rating
                    let starsHTML = '';
                    const fullStars = Math.floor(destination.rating);
                    const hasHalfStar = destination.rating % 1 >= 0.5;
                    
                    for (let i = 0; i < 5; i++) {
                        if (i < fullStars) {
                            starsHTML += '<i class="fas fa-star"></i>';
                        } else if (i === fullStars && hasHalfStar) {
                            starsHTML += '<i class="fas fa-star-half-alt"></i>';
                        } else {
                            starsHTML += '<i class="far fa-star"></i>';
                        }
                    }
                    
                    // Create card HTML
                    const cardHTML = `
                        <div class="card" style="opacity: 0; transform: translateY(20px);">
                            <div class="card-image">
                                <img src="${destination.image}" alt="${destination.location}">
                                <div class="location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <span>${destination.location}</span>
                                </div>
                            </div>
                            <div class="card-content">
                                <h3>${destination.title}</h3>
                                <p>${destination.description}</p>
                                <div class="card-footer">
                                    <div class="rating">
                                        ${starsHTML}
                                        <span>${destination.rating}</span>
                                    </div>
                                    <div class="price">
                                        <span>From</span>
                                        <p>${destination.price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Append new card
                    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
                    
                    // Get the newly added card and animate it
                    const newCard = cardContainer.lastElementChild;
                    setTimeout(() => {
                        newCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        newCard.style.opacity = '1';
                        newCard.style.transform = 'translateY(0)';
                        
                        // Add event listeners to new card
                        newCard.addEventListener('mouseenter', function() {
                            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                            const stars = this.querySelectorAll('.rating i');
                            stars.forEach(star => {
                                star.style.filter = 'drop-shadow(0 0 3px rgba(241, 196, 15, 0.7))';
                            });
                        });
                        
                        newCard.addEventListener('mouseleave', function() {
                            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
                            const stars = this.querySelectorAll('.rating i');
                            stars.forEach(star => {
                                star.style.filter = 'none';
                            });
                        });
                    }, 100);
                });
                
                // Change button to "All Destinations" or hide it
                this.innerHTML = '<span>View All Destinations</span> <i class="fas fa-arrow-right"></i>';
                this.disabled = false;
                
                // Add a click listener to the refreshed button that takes user to a full destinations page
                this.removeEventListener('click', arguments.callee);
                this.addEventListener('click', function() {
                    // This would typically navigate to a full destinations page
                    this.innerHTML = '<span>Redirecting...</span> <i class="fas fa-circle-notch fa-spin"></i>';
                    setTimeout(() => {
                        alert('This would navigate to the full destinations page');
                        this.innerHTML = '<span>View All Destinations</span> <i class="fas fa-arrow-right"></i>';
                    }, 1000);
                });
            }, 1500);
        });
    }
    
    // Image Grid Interactions
    const gridItems = document.querySelectorAll('.image-grid > div');
    
    gridItems.forEach(item => {
        // Add hover effect for each grid item
        item.addEventListener('mouseenter', function() {
            // Scale effect for images
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            
            // Strengthen the overlay on hover for better contrast with text
            const overlay = this.querySelector('.overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 60%)';
            }
            
            // Add subtle pop to content text
            const content = this.querySelector('.grid-content');
            if (content) {
                content.style.transform = 'translateY(-5px)';
                content.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset image scale
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
            
            // Reset overlay
            const overlay = this.querySelector('.overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 60%)';
            }
            
            // Reset content position
            const content = this.querySelector('.grid-content');
            if (content) {
                content.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Optimize video playback
    const videos = document.querySelectorAll('video');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Play video when in view
                    entry.target.play();
                } else {
                    // Pause when out of view to save resources
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all videos
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
    
    // About Us section team members
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add hover animations for team members
        member.addEventListener('mouseenter', function() {
            // Enhance shadow and apply subtle scale effect
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.boxShadow = '0 15px 35px rgba(18, 72, 47, 0.15)';
            
            // Add subtle border glow
            this.style.boxShadow = '0 15px 35px rgba(18, 72, 47, 0.15), 0 0 0 2px rgba(18, 72, 47, 0.1)';
            
            // Optional: Add subtle color change to text
            const name = this.querySelector('h3');
            if (name) {
                name.style.transition = 'color 0.3s ease';
                name.style.color = '#0d3623';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            // Reset all styles on mouse leave
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.05)';
            
            // Reset name color
            const name = this.querySelector('h3');
            if (name) {
                name.style.color = '#12482f';
            }
        });
    });
    
    // Animate team members on scroll into view
    if ('IntersectionObserver' in window) {
        const teamObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation of each team member
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150); // 150ms delay between each item
                    
                    // Unobserve after animation is done
                    teamObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        // Initially hide all team members and observe them
        teamMembers.forEach(member => {
            member.style.opacity = 0;
            member.style.transform = 'translateY(30px)';
            member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            teamObserver.observe(member);
        });
    }
    
    // Review cards hover effect
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle floating animation
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            // Return to original state
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Footer newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Show success message
                const originalButton = this.querySelector('button').innerHTML;
                this.querySelector('button').innerHTML = '<i class="fas fa-check"></i>';
                
                // Create a success message
                const successMsg = document.createElement('p');
                successMsg.textContent = 'Thanks for subscribing!';
                successMsg.style.color = '#27ae60';
                successMsg.style.marginTop = '10px';
                successMsg.style.fontSize = '0.9rem';
                
                // Add success message after form
                this.after(successMsg);
                
                // Reset form
                setTimeout(() => {
                    emailInput.value = '';
                    this.querySelector('button').innerHTML = originalButton;
                    
                    // Fade out and remove message after 3 seconds
                    successMsg.style.transition = 'opacity 0.5s ease';
                    successMsg.style.opacity = '0';
                    setTimeout(() => {
                        successMsg.remove();
                    }, 500);
                }, 2000);
            }
        });
    }
    
    // Footer social icons animation
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-5px)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 300,
                easing: 'ease-in-out'
            });
        });
    });
});
