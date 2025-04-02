document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryItems.forEach((item) => {
    // Add hover effects
    item.addEventListener("mouseenter", () => {
      galleryItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.opacity = "0.7"
          otherItem.style.transform = "scale(0.95)"
        }
      })
    })

    item.addEventListener("mouseleave", () => {
      galleryItems.forEach((otherItem) => {
        otherItem.style.opacity = "1"
        otherItem.style.transform = ""
      })
    })

    // Add click handler for lightbox (if implemented)
    item.addEventListener("click", function () {
      // Implement lightbox functionality here
      console.log("Gallery item clicked:", this)
    })
  })

  // Add lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img.lazy").forEach((img) => {
      imageObserver.observe(img)
    })
  }
})

