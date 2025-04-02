document.addEventListener("DOMContentLoaded", () => {
  // Load user data
  const storedData = JSON.parse(localStorage.getItem("userData")) || {}

  if (storedData.username) {
    document.getElementById("profileUsername").textContent = storedData.username
    document.getElementById("profileEmail").textContent = storedData.email
    document.getElementById("profileAadhaar").textContent = storedData.aadhaar
    document.getElementById("profileBloodGroup").textContent = storedData.bloodGroup
  }

  // Photo upload functionality
  const uploadBtn = document.querySelector(".photo-upload-btn")
  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"

      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const photoPlaceholder = document.querySelector(".photo-placeholder")
            photoPlaceholder.innerHTML = `<img src="${event.target.result}" alt="Profile Photo">`
            localStorage.setItem("profilePhoto", event.target.result)
          }
          reader.readAsDataURL(file)
        }
      }

      input.click()
    })
  }

  // Load saved profile photo
  const savedPhoto = localStorage.getItem("profilePhoto")
  if (savedPhoto) {
    const photoPlaceholder = document.querySelector(".photo-placeholder")
    photoPlaceholder.innerHTML = `<img src="${savedPhoto}" alt="Profile Photo">`
  }

  // Edit profile button
  const editProfileBtn = document.getElementById("editProfileBtn")
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      window.location.href = "additional-info.html"
    })
  }
})

