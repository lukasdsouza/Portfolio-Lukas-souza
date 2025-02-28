// Função para iniciar o efeito Matrix em toda a página usando o canvas "matrix"
function startMatrix() {
  const canvas = document.getElementById("matrix");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const letters = "01";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 33);
}

document.addEventListener("DOMContentLoaded", () => {
  startMatrix();

  // Loader: fade-out e remoção
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
    loader.addEventListener("transitionend", () => {
      loader.style.display = "none";
    });
  }, 1000);

  // Menu Mobile
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) navLinks.classList.remove("active");
  });

  // Botão Voltar ao Topo
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = (window.scrollY > 300) ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Efeito de fade-in nas seções
  const sections = document.querySelectorAll(".section");
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Carrossel de Certificações (infinito, itens por vez responsivos)
  let itemsPerGroup = 3;
  if (window.innerWidth < 480) {
    itemsPerGroup = 1;
  } else if (window.innerWidth < 768) {
    itemsPerGroup = 2;
  }

  const carouselContainer = document.querySelector('.carousel-container');
  let carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const originalItemCount = carouselItems.length;

  // Clona os primeiros itens para criar loop infinito
  for (let i = 0; i < itemsPerGroup; i++) {
    const clone = carouselItems[i].cloneNode(true);
    carouselContainer.appendChild(clone);
  }
  carouselItems = document.querySelectorAll('.carousel-item');
  const groupCount = Math.ceil(originalItemCount / itemsPerGroup);
  let currentGroup = 0;

  function updateCarousel(animate = true) {
    const groupWidth = document.querySelector('.carousel').offsetWidth;
    carouselContainer.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    carouselContainer.style.transform = `translateX(-${currentGroup * groupWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentGroup++;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    if (currentGroup === 0) {
      currentGroup = groupCount;
      updateCarousel(false);
      void carouselContainer.offsetWidth;
      currentGroup--;
      updateCarousel();
    } else {
      currentGroup--;
      updateCarousel();
    }
  });

  carouselContainer.addEventListener('transitionend', () => {
    const groupWidth = document.querySelector('.carousel').offsetWidth;
    if (currentGroup === groupCount) {
      carouselContainer.style.transition = 'none';
      currentGroup = 0;
      carouselContainer.style.transform = `translateX(0px)`;
      void carouselContainer.offsetWidth;
      carouselContainer.style.transition = 'transform 0.5s ease-in-out';
    }
  });

  window.addEventListener('resize', updateCarousel);
});
