// Atualização do canvas cada frame
function update() {
    updateFragments();
    updateRunners();

    draw();

    // Solicita o próximo frame para continuar a atualização
    requestAnimationFrame(update);
};

// Checagem de colisão em retângulo
function isCollidingRet(x, y, ret = null) {
    // Caso (x, y, ret2) - Colisão de ponto com retângulo
    if (ret != null) {
        return x > ret.x && x < ret.x + ret.width &&
               y > ret.y && y < ret.y + ret.height;
               
    // Caso (ret1, ret2) - Colisão de dois retângulos
    } else {
        let ret1 = x;
        let ret2 = y;

        return ret1.x < ret2.x + ret2.width &&
               ret1.x + ret1.width > ret2.x &&
               ret1.y < ret2.y + ret2.height &&
               ret1.y + ret1.height > ret2.y;
    }
};

// Checagem de colisão em círculo
function isCollidingCircle(x, y, circle = null) {
    // Caso (x, y, circle) - Colisão de ponto com círculo
    if (circle != null) {
        const dx = x - circle.x;
        const dy = y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < circle.radius;
        
    // Caso (circle1, circle2) - Colisão entre dois círculos
    } else {
        let circle1 = x;
        let circle2 = y;

        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < (circle1.radius + circle2.radius);
    }
};



// EventListener para o movimento do mouse
canvas.addEventListener('mousemove', (e) => {
    // Pega as coordenadas do mouse
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Permite que o canvas receba foco e possa capturar eventos de teclado
canvas.tabIndex = 1000; 
canvas.focus();

// Sequência de início
update();