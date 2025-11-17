// --- Animação do título pulando letra por letra ---
document.querySelectorAll('.titulo-pulando').forEach(titulo => {
    let texto = titulo.textContent;
    titulo.textContent = "";
    [...texto].forEach((letra, i) => {
        let span = document.createElement("span");
        span.textContent = letra;
        span.style.setProperty('--delay', `${i * 0.1}s`);
        titulo.appendChild(span);
    });
});

// --- Elementos principais ---
const musica = document.getElementById('musica');
const btnMusica = document.getElementById('Musica');
const notasContainer = document.getElementById('notas-musicais');
const videoFundo = document.getElementById('video-fundo');

musica.volume = 0.1;

// --- Zoom suave ---
let zoomScale = 1;
let zoomDirection = 1; // 1 = aumentando, -1 = diminuindo
let zoomInterval;

function startZoom() {
    clearInterval(zoomInterval);
    zoomInterval = setInterval(() => {
        zoomScale += zoomDirection * 0.0003; // velocidade suave
        if (zoomScale >= 1.08) zoomDirection = -1;
        if (zoomScale <= 1) zoomDirection = 1;
        videoFundo.style.transform = `scale(${zoomScale})`;
    }, 10);
}

function stopZoom() {
    clearInterval(zoomInterval);
}

// --- Notas musicais ---
let notasInterval;
function startNotas() {
    notasInterval = setInterval(() => {
        const nota = document.createElement('span');
        nota.className = 'nota';
        nota.textContent = ['♫','♬','♩','♪','♭'][Math.floor(Math.random()*4)];
        nota.style.left = Math.random() * 90 + '%';
        nota.style.fontSize = (18 + Math.random()*12) + 'px';
        notasContainer.appendChild(nota);
        setTimeout(() => nota.remove(), 2000);
    }, 400);
}
function stopNotas() {
    clearInterval(notasInterval);
    notasContainer.innerHTML = '';
}
notasContainer.style.display = 'none';

// --- Botão de música ---
btnMusica.addEventListener('click', () => {
    if (musica.paused) {
        // --- PLAY ---
        musica.play();
        videoFundo.play();
        videoFundo.loop = true;
        startZoom();
        btnMusica.innerHTML = '❚❚';
        btnMusica.classList.add("tocando");
        notasContainer.style.display = 'block';
        startNotas();
    } else {
        // --- PAUSE ---
        musica.pause();
        videoFundo.pause();
        notasContainer.style.display = 'none';
        stopNotas();

        // Suaviza o zoom antes de parar
        let decelInterval = setInterval(() => {
            if (zoomScale > 1) {
                zoomScale -= 0.0003; // desaceleração suave
                videoFundo.style.transform = `scale(${zoomScale})`;
            } else {
                clearInterval(decelInterval);
                stopZoom();
            }
        }, 10);

        btnMusica.innerHTML = '▶';
        btnMusica.classList.remove("tocando");
    }
});

// --- Mascote ---
const mascote = document.querySelector(".mascote");
const fala = document.querySelector(".fala");

mascote.addEventListener("mouseenter", () => {
    mascote.style.backgroundImage = "url('cat.gif')"; // anima
    fala.style.display = "block";
});

mascote.addEventListener("mouseleave", () => {
    mascote.style.backgroundImage = "url('cat.png')"; // volta pro parado
    fala.style.display = "none";
});


// bongocat
        const bongocat = document.querySelector('.bongocat');
        const inputs = document.querySelectorAll('#E-mail, #password');

        inputs.forEach(input => {
            // Quando tecla é pressionada → ativa o gif
            input.addEventListener('keydown', () => {
                bongocat.style.backgroundImage = "url('bongocat.gif')";
                bongocat.classList.add('digitando');
            });

            // Quando para de digitar (solta a tecla) → volta pro PNG
            input.addEventListener('keyup', () => {
                bongocat.style.backgroundImage = "url('bongocat.png')";
                bongocat.classList.remove('digitando');
            });

            // Quando entra no campo → mostra cursor
            input.addEventListener('focus', () => {
                input.classList.remove('no-caret');
            });

            // Quando sai do campo → esconde cursor
            input.addEventListener('blur', () => {
                input.classList.add('no-caret');
                bongocat.style.backgroundImage = "url('bongocat.png')";
                bongocat.classList.remove('digitando'); // garante reset
            });
        });


// Som do teclado (controlado pra não sobrepor)
        const somTecla = new Audio('sons/teclado-som.mp3');
        somTecla.volume = 0.4;
        somTecla.preload = 'auto';

        // Toca o som junto com o bongocat ao digitar
        inputs.forEach(input => {
            input.addEventListener('keydown', () => {
                somTecla.currentTime = 0;
                somTecla.play();
            });

            input.addEventListener('keyup', () => {
                somTecla.pause();
                somTecla.currentTime = 0;
            });

            input.addEventListener('blur', () => {
                somTecla.pause();
                somTecla.currentTime = 0;
            });
        });