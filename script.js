// Excellence College Website JavaScript

$(document).ready(function () {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    $('.navbar-nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));

        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000, 'easeInOutExpo');

            // Close mobile menu
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Scroll indicator click
    $('.scroll-indicator').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#about').offset().top - 70
        }, 1000);
    });

    // Active navigation highlighting
    $(window).on('scroll', function () {
        const scrollPos = $(window).scrollTop() + 100;

        $('.navbar-nav a[href^="#"]').each(function () {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));

            if (refElement.length) {
                if (refElement.position().top <= scrollPos &&
                    refElement.position().top + refElement.height() > scrollPos) {
                    $('.navbar-nav a').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    });

    // Animated counters
    function animateCounters() {
        $('.stat-number').each(function () {
            const $this = $(this);
            const countTo = $this.attr('data-count');

            $({ countNum: $this.text() }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
        });
    }

    // Trigger counter animation when section is visible
    let counterAnimated = false;
    $(window).on('scroll', function () {
        const aboutSection = $('#about');
        if (aboutSection.length) {
            const aboutTop = aboutSection.offset().top;
            const aboutHeight = aboutSection.outerHeight();
            const windowTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (windowTop + windowHeight > aboutTop + aboutHeight / 2 && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        }
    });

    // Gallery item hover effects
    $('.gallery-item').on('mouseenter', function () {
        $(this).find('img').css('transform', 'scale(1.1)');
    }).on('mouseleave', function () {
        $(this).find('img').css('transform', 'scale(1)');
    });




    // Loading animations
    function triggerLoadAnimations() {
        $('.loading').addClass('loaded');
    }

    // Trigger animations on page load
    $(window).on('load', function () {
        triggerLoadAnimations();
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Keyboard navigation support
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('.modal').modal('hide');
        }
    });

    // Smooth scroll for all anchor links
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
                return false;
            }
        }
    });

    // Performance optimization: Debounced scroll handler
    let ticking = false;

    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }

    $(window).on('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Add hover effects to cards
    $('.department-card, .course-card').hover(
        function () {
            $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
        },
        function () {
            $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
        }
    );

    // Testimonial slider (if needed)
    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 4000
        });
    }

    // Custom easing function for smooth animations
    $.easing.easeInOutExpo = function (x, t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
});

// Additional utility functions
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
    return window.innerWidth > 1024;
}

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function () {
    // Add ARIA labels to interactive elements
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.setAttribute('aria-label', `Navigate to ${link.textContent}`);
    });

    // Add focus trap for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function () {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        });
    });
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Google Analytics (placeholder)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Print functionality
function printPage() {
    window.print();
}


// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Custom Carousel JavaScript
  let index = 0;
  const track = document.getElementById("carouselTrack");
  const items = document.querySelectorAll(".carousel-item-custom");
  const totalItems = items.length - 2; // excluding clones
  const indicators = document.querySelectorAll("#customIndicators button");

  function getVisibleItems() {
    return window.innerWidth <= 768 ? 1 : 2;
  }

  function moveSlide(direction) {
    const visibleItems = getVisibleItems();
    const maxIndex = totalItems - visibleItems;

    index += direction;

    if (index < 0) index = maxIndex;
    if (index > maxIndex) index = 0;

    updateSlider();
  }

  function goToSlide(i) {
    index = i;
    updateSlider();
  }

  function updateSlider() {
    const visibleItems = getVisibleItems();
    const offset = index * (100 / visibleItems);

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${offset}%)`;

    // Update indicators
    indicators.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  // Update slider on screen resize
  window.addEventListener('resize', () => {
    updateSlider();
  });

  // Initial call
  updateSlider();
