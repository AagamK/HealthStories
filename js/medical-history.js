document.addEventListener("DOMContentLoaded", () => {
  // Load existing medical history
  const storedData = JSON.parse(localStorage.getItem("userData")) || {}

  if (storedData.username) {
    document.getElementById("medicalName").value = storedData.username || ""
    document.getElementById("medicalBloodGroup").value = storedData.bloodGroup || ""
    document.getElementById("allergies").value = storedData.allergies || ""
    document.getElementById("chronicConditions").value = storedData.chronicConditions || ""
    document.getElementById("currentMedications").value = storedData.currentMedications || ""
  }

  // Form validation and submission
  const medicalHistoryForm = document.getElementById("medicalHistoryForm")
  if (medicalHistoryForm) {
    medicalHistoryForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        username: document.getElementById("medicalName").value,
        bloodGroup: document.getElementById("medicalBloodGroup").value,
        allergies: document.getElementById("allergies").value,
        chronicConditions: document.getElementById("chronicConditions").value,
        currentMedications: document.getElementById("currentMedications").value,
      }

      // Update stored data
      const updatedData = { ...storedData, ...formData }
      localStorage.setItem("userData", JSON.stringify(updatedData))

      // Show toast notification
      function showToast(message, type) {
        const toastContainer = document.getElementById("toast-container")
        if (!toastContainer) {
          const container = document.createElement("div")
          container.id = "toast-container"
          container.style.position = "fixed"
          container.style.top = "20px"
          container.style.right = "20px"
          container.style.zIndex = "1000"
          document.body.appendChild(container)
        }

        const toast = document.createElement("div")
        toast.classList.add("toast")
        toast.classList.add(`toast-${type}`)
        toast.textContent = message

        const toastContainer = document.getElementById("toast-container")
        toastContainer.appendChild(toast)

        setTimeout(() => {
          toast.remove()
        }, 3000)
      }

      showToast("Medical history updated successfully!", "success")
    })
  }

  // Auto-expand textareas
  const textareas = document.querySelectorAll("textarea")
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  })
})

