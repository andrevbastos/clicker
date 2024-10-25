const frags = [];
let isDragging = false;
let draggedFragment = null;

// Função para criar um fragmento
function createFragment(x, y) {
    return {
        x: x,
        y: y, 
        drag: false
    };
};

// Função de desenho de um fragmento
function drawFragment(frag) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(frag.x, frag.y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FDFEFE'
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = '#37333E';
    ctx.fill();

    ctx.restore();
};

// Limpa os fragmento da tela ao reescalar a página
window.addEventListener('resize', () => {
    points += 10 * frags.length;
    frags.splice(0, frags.length);
});

// EventListener para o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    // Se estives arrastando um fragmento move o mesmo com o movimento do mouse
    if (isDragging && draggedFragment) {
        draggedFragment.x = mouseX;
        draggedFragment.y = mouseY;
        // Se arrastar para a borda da tela entrega o fragmento
        for (let frag of frags) {
            if (checkDeploy(frag)) {
                deploy(frag); 
            };
        }
    }
});

// EventListener de click do mouse
canvas.addEventListener('mousedown', () => {
    if (frags.length != 0) {
        // Checa de esta colidindo com algum fragmento, se estives o arrasta
        for (let frag of frags) {
            if (isCollidingCircle(mouseX, mouseY, frag)) {
                isDragging = true;
                draggedFragment = frag;
                draggedFragment.drag = true;
                break;
            }
        }
    }
});

// EventListener de soltar o mouse
canvas.addEventListener('mouseup', () => {
    // Se estiver arrastando um fragmento, o solta
    if (isDragging && draggedFragment) {
        isDragging = false;
        draggedFragment.drag = false;
        draggedFragment = null;
    }
});

// Checa se o fragmento esta na área de entrega
function checkDeploy(frag) {
    return  frag.x <= 50 ||
            frag.x >= canvas.width - 50 ||
            frag.y <= 50 ||
            frag.y >= canvas.height - 50;
};

// Entrega o fragmento e adiciona os pontos
function deploy(position) {
    frags.splice(position, 1);
    points += 10;
};