const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Função geral de desenho
function draw() {
    // Limpa o canvas para evitar sobreposição de desenhos anteriores
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    drawPoints();

    if (rock) {
        drawRock();
    }

    if (frags.length != 0) {
        for (let frag of frags) {
            drawFragment(frag);
        }
    }
};

// Reescala o canvas com base no tamanho da janela da página
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
};

// Reescala no carregamento da página
window.addEventListener('load', resizeCanvas);

// Reescala sempre que a janela trocar de tamanho
window.addEventListener('resize', resizeCanvas);