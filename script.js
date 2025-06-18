// Smooth scrolling and navigation
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })

  // Navbar scroll effect
  const navbar = document.getElementById("navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Animated counters
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate")

        // Trigger counter animation when hero section is visible
        if (entry.target.classList.contains("hero-stats")) {
          animateCounters()
        }
      }
    })
  }, observerOptions)

  // Observe all elements with data-aos attribute
  document.querySelectorAll("[data-aos]").forEach((el) => {
    observer.observe(el)
  })

  // Observe hero stats for counter animation
  const heroStats = document.querySelector(".hero-stats")
  if (heroStats) {
    observer.observe(heroStats)
  }

  // Blog functionality
  const blogData = [
    {
      category: "Strategy",
      date: "December 15, 2024",
      title: "10 Game-Changing Business Strategies for 2025",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Growth",
      date: "December 12, 2024",
      title: "How to Scale Your Startup Without Losing Your Vision",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Marketing",
      date: "December 10, 2024",
      title: "The Future of Digital Marketing: AI and Personalization",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Leadership",
      date: "December 8, 2024",
      title: "Building High-Performance Teams in Remote Work Era",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Innovation",
      date: "December 5, 2024",
      title: "Embracing Disruption: How to Stay Ahead of the Curve",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Finance",
      date: "December 3, 2024",
      title: "Smart Financial Planning for Business Growth",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Technology",
      date: "December 1, 2024",
      title: "Leveraging Technology for Competitive Advantage",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      category: "Culture",
      date: "November 28, 2024",
      title: "Creating a Culture of Innovation and Excellence",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  let showAllBlogs = false

  function renderBlogCards() {
    const container = document.getElementById("blogContainer")
    if (!container) return

    container.innerHTML = ""

    const visibleBlogs = showAllBlogs ? blogData : blogData.slice(0, 6)

    visibleBlogs.forEach((post, index) => {
      const card = document.createElement("div")
      card.className = "blog-card"
      card.setAttribute("data-aos", "fade-up")
      card.setAttribute("data-aos-delay", (index % 3) * 100)

      card.innerHTML = `
                <img src="${post.image}" alt="${post.title}" />
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-category">${post.category}</span>
                        <span>${post.date}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <a href="#" class="blog-link">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `

      container.appendChild(card)

      // Re-observe new elements
      observer.observe(card)
    })
  }

  const showMoreBtn = document.getElementById("showMoreBtn")
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      showAllBlogs = true
      renderBlogCards()
      showMoreBtn.style.display = "none"
    })
  }

  // Initialize blog
  renderBlogCards()

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const phone = formData.get("phone")
      const message = formData.get("message")

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.innerHTML

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
        submitBtn.style.background = "var(--gradient-accent)"

        setTimeout(() => {
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          submitBtn.style.background = "var(--gradient-primary)"
          contactForm.reset()
        }, 2000)
      }, 1500)
    })
  }

  // Parallax effect for floating shapes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const shapes = document.querySelectorAll(".shape")

    shapes.forEach((shape, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`
    })
  })

  // Service card hover effects
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      if (!this.classList.contains("featured")) {
        this.style.transform = "translateY(0) scale(1)"
      } else {
        this.style.transform = "translateY(0) scale(1.05)"
      }
    })
  })

  // Smooth reveal animations for cards
  const revealCards = () => {
    const cards = document.querySelectorAll(".feature-card, .what-card, .service-card, .blog-card")

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  // Initialize card animations
  setTimeout(revealCards, 500)

  // Newsletter subscription
  const newsletter = document.querySelector(".newsletter")
  if (newsletter) {
    const newsletterForm = newsletter.querySelector("button")
    const newsletterInput = newsletter.querySelector("input")

    newsletterForm.addEventListener("click", function (e) {
      e.preventDefault()
      const email = newsletterInput.value.trim()

      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address.")
        return
      }

      const originalText = this.innerHTML
      this.innerHTML = '<i class="fas fa-check"></i>'
      this.style.background = "var(--gradient-accent)"

      setTimeout(() => {
        this.innerHTML = originalText
        this.style.background = "var(--gradient-primary)"
        newsletterInput.value = ""
      }, 2000)
    })
  }

  // Dynamic typing effect for hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    // Trigger initial animations
    setTimeout(() => {
      document.querySelectorAll("[data-aos]").forEach((el) => {
        if (isElementInViewport(el)) {
          el.classList.add("aos-animate")
        }
      })
    }, 100)
  })

  // Utility function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }
})

// Global functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Add some CSS for loading state
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .loaded::before,
    .loaded::after {
        display: none;
    }
`

// Inject loading styles
const styleSheet = document.createElement("style")
styleSheet.textContent = loadingStyles
document.head.appendChild(styleSheet)
