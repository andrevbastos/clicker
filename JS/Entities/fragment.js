const frags = [];
let isDragging = false;

// Função de criação de fragmento
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
    // Se estiver arrastando um fragmento, move o mesmo com o movimento do mouse
    if (isDragging && user.draggedFragment) {
        user.draggedFragment.x = mouseX;
        user.draggedFragment.y = mouseY;
        // Se arrastar para a borda da tela, entrega o fragmento
        if (checkDeploy(user.draggedFragment)) {
            deploy(frags.findIndex(userDragged)); 
            user.draggedFragment = null;
        };
    }
});

// EventListener de click do mouse
canvas.addEventListener('mousedown', () => {
    if (frags.length != 0) {
        // Checa de esta colidindo com algum fragmento, se estives o arrasta
        for (let frag of frags) {
            if (isCollidingCircle(mouseX, mouseY, frag)) {
                isDragging = true;
                user.draggedFragment = frag;
                user.draggedFragment.drag = true;
                break;
            }
        }
    }
});

// EventListener de soltar o mouse
canvas.addEventListener('mouseup', () => {
    // Se estiver arrastando um fragmento, o solta
    if (isDragging && user.draggedFragment) {
        isDragging = false;
        user.draggedFragment.drag = false;
        user.draggedFragment = null;
    }
});

// Função para buscar o fragmento arrastável no array de fragmentos
function userDragged(frag) {
    return frag == user.draggedFragment;
};

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