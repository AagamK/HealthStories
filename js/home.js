document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes to cards
  const cards = document.querySelectorAll(".card")
  cards.forEach((card, index) => {
    card.style.opacity = "1"
    card.classList.add("reveal")
    card.classList.add(index % 2 === 0 ? "fade-left" : "fade-right")
    card.style.animationDelay = `${0.1 * index}s`
  })

  // Hero section animations
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.querySelector("h1").classList.add("animate-slide-left")
    hero.querySelector("p").classList.add("animate-slide-right")
    hero.querySelector(".hero-buttons").classList.add("animate-slide-bottom")
  }

  // Features and benefits hover effects
  const featureCards = document.querySelectorAll(".card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "var(--hover-shadow)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--shadow)"
    })
  })
})

