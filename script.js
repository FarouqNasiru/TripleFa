document.addEventListener('DOMContentLoaded', function() {
    const stackContainer = document.querySelector('.image-stack');
    const stackItems = document.querySelectorAll('.stack-item');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let autoScrollInterval;
    const scrollDelay = 3000; // 3 seconds between transitions
  
    // Initialize auto-scrolling
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % stackItems.length;
        updateStack();
      }, scrollDelay);
    }
  
    // Pause auto-scrolling during interaction
    function pauseAutoScroll() {
      clearInterval(autoScrollInterval);
    }
  
    // Resume auto-scrolling after interaction
    function resumeAutoScroll() {
      pauseAutoScroll();
      startAutoScroll();
    }
  
    // Touch events
    stackContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    stackContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    stackContainer.addEventListener('touchend', handleTouchEnd);
  
    // Mouse events
    stackContainer.addEventListener('mousedown', handleMouseDown);
    stackContainer.addEventListener('mousemove', handleMouseMove);
    stackContainer.addEventListener('mouseup', handleMouseUp);
    stackContainer.addEventListener('mouseleave', handleMouseUp);
    stackContainer.addEventListener('click', handleClick);
  
    // Handle all pointer interactions
    function handleInteractionStart() {
      pauseAutoScroll();
      isDragging = true;
    }
  
    function handleInteractionMove(e) {
      if (!isDragging) return;
      
      const x = e.clientX || e.touches[0].clientX;
      const diff = startX - x;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < stackItems.length - 1) {
          currentIndex++;
        } else if (diff < 0 && currentIndex > 0) {
          currentIndex--;
        }
        updateStack();
        isDragging = false;
        resumeAutoScroll();
      }
    }
  
    function handleInteractionEnd() {
      isDragging = false;
      resumeAutoScroll();
    }
  
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      handleInteractionStart();
    }
  
    function handleTouchMove(e) {
      e.preventDefault();
      handleInteractionMove(e);
    }
  
    function handleTouchEnd() {
      handleInteractionEnd();
    }
  
    function handleMouseDown(e) {
      startX = e.clientX;
      handleInteractionStart();
    }
  
    function handleMouseMove(e) {
      handleInteractionMove(e);
    }
  
    function handleMouseUp() {
      handleInteractionEnd();
    }
  
    function handleClick(e) {
      // Optional: Add click navigation if desired
      const rect = stackContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const containerCenter = rect.width / 2;
      
      if (clickX < containerCenter && currentIndex > 0) {
        currentIndex--;
      } else if (clickX > containerCenter && currentIndex < stackItems.length - 1) {
        currentIndex++;
      }
      
      updateStack();
      resumeAutoScroll();
    }
  
    function updateStack() {
      stackItems.forEach((item, index) => {
        const relativeIndex = index - currentIndex;
        
        if (relativeIndex < 0) {
          item.style.opacity = '0';
          item.style.pointerEvents = 'none';
          item.style.transform = 'translateX(-100%)';
        } else {
          const opacity = 1 - (relativeIndex * 0.1);
          item.style.opacity = opacity;
          item.style.pointerEvents = relativeIndex === 0 ? 'auto' : 'none';
          item.style.setProperty('--index', relativeIndex);
          
          if (relativeIndex > 0) {
            const staggerAmount = 25 + (relativeIndex * 5);
            const staggerDirection = relativeIndex % 2 === 1 ? 
              `-${staggerAmount}%` : `${staggerAmount}%`;
            
            item.style.left = staggerDirection;
            item.style.transform = `scale(${1 - (relativeIndex * 0.1)})`;
          } else {
            item.style.left = '10%';
            item.style.transform = 'scale(1)';
          }
        }
      });
    }
  
    // Start the automatic scrolling
    startAutoScroll();
    updateStack();
  
    // Pause on hover (for desktop)
    stackContainer.addEventListener('mouseenter', pauseAutoScroll);
    stackContainer.addEventListener('mouseleave', resumeAutoScroll);
  });


   // Number counting animation
   function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 500; // Lower = faster
    
    statNumbers.forEach(statNumber => {
      const target = +statNumber.getAttribute('data-count');
      const count = +statNumber.innerText;
      const increment = target / speed;
      
      if (count < target) {
        statNumber.innerText = Math.ceil(count + increment);
        setTimeout(animateNumbers, 1);
      } else {
        statNumber.innerText = target.toLocaleString(); // Adds commas if needed
      }
    });
  }
  
  // Trigger animation when section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(document.querySelector('.why-choose-us'));





  // Animate door layers on scroll
  const doorAnimation = document.querySelector('.door-animation');
    
  const observe = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const layers = document.querySelectorAll('.door-layer');
        layers.forEach((layer, index) => {
          setTimeout(() => {
            layer.style.transform = `translateX(${index * 20}px) rotateY(${index * 5}deg)`;
          }, index * 200);
        });
      }
    });
  }, { threshold: 0.5 });

  observe.observe(doorAnimation);

  // Add hover effect for layers
  document.querySelectorAll('.door-layer').forEach(layer => {
    layer.addEventListener('mouseenter', () => {
      layer.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
    });
    layer.addEventListener('mouseleave', () => {
      layer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
  });


  // Add interactive tilt effect
  document.querySelectorAll('.benefit-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 15;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 15;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
  });


   // Carousel Functionality
   document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.control-dot');
    let currentIndex = 0;
    let interval;

    function showTestimonial(index) {
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }

    function nextTestimonial() {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(nextIndex);
    }

    // Auto-rotate every 5 seconds
    function startCarousel() {
      interval = setInterval(nextTestimonial, 5000);
    }

    // Initialize immediately
    startCarousel();

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });

    carousel.addEventListener('mouseleave', () => {
      // Restart with fresh interval
      clearInterval(interval);
      startCarousel();
    });

    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        clearInterval(interval);
        showTestimonial(parseInt(e.target.getAttribute('data-index')));
        startCarousel();
      });
    });
  });