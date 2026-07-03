(function () {
  "use strict";

  /* ============ 1. ABRIR O ENVELOPE ============ */
  const envelope = document.getElementById("envelope");
  const btnEntrar = document.getElementById("btnEntrar");
  const capa = document.getElementById("capa");
  const guia = document.getElementById("guia");
  const btnGuiaOk = document.getElementById("btnGuiaOk");
  const main = document.getElementById("main");

  document.querySelector(".envelope-front").addEventListener("click", () => {
    envelope.classList.add("aberto");
  });

  btnEntrar.addEventListener("click", (e) => {
    e.stopPropagation();
    capa.style.opacity = "0";
    capa.style.transition = "opacity .5s ease";
    setTimeout(() => {
      capa.hidden = true;
      guia.hidden = false;
      requestAnimationFrame(() => (guia.style.opacity = "1"));
    }, 480);
  });

  btnGuiaOk.addEventListener("click", () => {
    guia.style.opacity = "0";
    guia.style.transition = "opacity .5s ease";
    setTimeout(() => {
      guia.hidden = true;
      main.hidden = false;
      document.body.style.overflow = "auto";
      // revela a primeira seção imediatamente
      const primeira = document.querySelector(".secao");
      if (primeira) primeira.classList.add("em-vista");
    }, 480);
  });

  /* ============ 2. REVELAR SEÇÕES AO ROLAR ============ */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("em-vista");
        }
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll("[data-secao]").forEach((el) => observer.observe(el));

  /* ============ 3. FOTOS FIXAS — mostra o placeholder se o arquivo não existir ============ */
  document.querySelectorAll("[data-foto-slot] img").forEach((img) => {
    img.addEventListener("error", () => {
      img.closest("[data-foto-slot]").classList.add("sem-foto");
    });
    if (!img.complete || img.naturalWidth === 0) {
      img.closest("[data-foto-slot]").classList.add("sem-foto");
    }
  });

  /* ============ 4. CARTAS QUE VIRAM ============ */
  document.querySelectorAll("[data-carta]").forEach((carta) => {
    carta.addEventListener("click", (e) => {
      // não vira se o toque foi dentro do texto editável (pra poder editar sem virar de volta sem querer)
      if (e.target.closest("[data-editavel]") && carta.classList.contains("virada")) return;
      carta.classList.toggle("virada");
    });
  });

  /* ============ 5. VELINHA + CONFETE ============ */
  const btnVela = document.getElementById("btnVela");
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  let confettiAtivo = false;
  let particulas = [];

  function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", ajustarCanvas);
  ajustarCanvas();

  const CORES_CONFETE = ["#FF4B5C", "#FFD23F", "#00A8E8", "#FF3E9D", "#33C481"];
  const FORMAS_CONFETE = ["quadrado", "circulo", "triangulo", "fita"];

  function criarParticulas(qtd) {
    const novas = [];
    for (let i = 0; i < qtd; i++) {
      novas.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 70,
        y: canvas.height * 0.58,
        vx: (Math.random() - 0.5) * 15,
        vy: -Math.random() * 17 - 7,
        tamanho: Math.random() * 9 + 5,
        cor: CORES_CONFETE[Math.floor(Math.random() * CORES_CONFETE.length)],
        forma: FORMAS_CONFETE[Math.floor(Math.random() * FORMAS_CONFETE.length)],
        rotacao: Math.random() * 360,
        vRotacao: (Math.random() - 0.5) * 14,
        gravidade: 0.32 + Math.random() * 0.16,
        arrasto: 0.985,
        vida: 0,
      });
    }
    return novas;
  }

  function desenharParticula(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotacao * Math.PI) / 180);
    ctx.fillStyle = p.cor;
    ctx.strokeStyle = "#16161A";
    ctx.lineWidth = 1.4;

    switch (p.forma) {
      case "circulo":
        ctx.beginPath();
        ctx.arc(0, 0, p.tamanho / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
      case "triangulo":
        ctx.beginPath();
        ctx.moveTo(0, -p.tamanho / 2);
        ctx.lineTo(p.tamanho / 2, p.tamanho / 2);
        ctx.lineTo(-p.tamanho / 2, p.tamanho / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        break;
      case "fita":
        ctx.fillRect(-p.tamanho / 5, -p.tamanho, p.tamanho / 2.5, p.tamanho * 2);
        break;
      default:
        ctx.fillRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho * 0.62);
        ctx.strokeRect(-p.tamanho / 2, -p.tamanho / 2, p.tamanho, p.tamanho * 0.62);
    }
    ctx.restore();
  }

  function loopConfete() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach((p) => {
      p.vy += p.gravidade;
      p.vx *= p.arrasto;
      p.x += p.vx;
      p.y += p.vy;
      p.rotacao += p.vRotacao;
      p.vida++;
      desenharParticula(p);
    });
    particulas = particulas.filter((p) => p.y < canvas.height + 40 && p.vida < 420);

    if (particulas.length > 0) {
      requestAnimationFrame(loopConfete);
    } else {
      confettiAtivo = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  btnVela.addEventListener("click", () => {
    btnVela.classList.toggle("apagada");
    particulas = particulas.concat(criarParticulas(140));
    if (!confettiAtivo) {
      confettiAtivo = true;
      requestAnimationFrame(loopConfete);
    }
  });
})();
