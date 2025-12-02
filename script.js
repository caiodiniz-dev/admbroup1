// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

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

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll(".fade-in-on-scroll").forEach((element) => {
  observer.observe(element)
})

// Counter animation for stats
let countersAnimated = false

function animateCounters() {
  if (countersAnimated) return

  const counters = document.querySelectorAll(".stat-number")
  const speed = 200

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / speed
    let count = 0

    const updateCount = () => {
      count += increment
      if (count < target) {
        counter.textContent = Math.ceil(count)
        setTimeout(updateCount, 10)
      } else {
        counter.textContent = target
      }
    }

    updateCount()
  })

  countersAnimated = true
}

// Observe stats section for counter animation
const statsSection = document.querySelector(".stats")
if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
        }
      })
    },
    { threshold: 0.5 },
  )

  statsObserver.observe(statsSection)
}

// Quote Modal Functions
function openQuoteModal(serviceName = "") {
  const modal = document.getElementById("quoteModal")
  const serviceSelect = document.getElementById("serviceName")

  if (serviceName) {
    serviceSelect.value = serviceName
  }

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeQuoteModal() {
  const modal = document.getElementById("quoteModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  const modal = document.getElementById("quoteModal")
  if (e.target === modal) {
    closeQuoteModal()
  }
})

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeQuoteModal()
  }
})

// Form submission
function submitQuote(e) {
  e.preventDefault()

  const serviceName = document.getElementById("serviceName").value
  const clientName = document.getElementById("clientName").value
  const clientPhone = document.getElementById("clientPhone").value
  const clientEmail = document.getElementById("clientEmail").value
  const serviceDescription = document.getElementById("serviceDescription").value

  // Show success message
  alert("Sua solicitação foi enviada! Entraremos em contato em breve.")

  // Close modal and reset form
  closeQuoteModal()
  document.getElementById("quoteForm").reset()
}

// Phone mask
document.getElementById("clientPhone").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "")

  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
  }

  e.target.value = value
})

// Add active class to current nav link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active")
      })
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
})

function enviarOrcamento() {
    const dados = {
        nome: document.querySelector("#nome").value,
        email: document.querySelector("#email").value,
        telefone: document.querySelector("#telefone").value,
        mensagem: document.querySelector("#mensagem").value
    };

    // Abre o sistema privado
    const janela = window.open("https://SEU-SISTEMA.com/receber.html", "_blank");

    // Espera a aba carregar e envia o orçamento
    setTimeout(() => {
        janela.postMessage(dados, "*");
    }, 1000);

    alert("Orçamento enviado com sucesso!");
}

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add animation classes
  setTimeout(() => {
    document.querySelectorAll(".animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2").forEach((el) => {
      el.style.opacity = "1"
    })
  }, 100)
  
})
