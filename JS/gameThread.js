// Atualização do canvas cada frame
function update() {
    draw();

    // Solicita o próximo frame para continuar a atualização
    requestAnimationFrame(update);
};

// Checagem de colisão em retângulo
function isCollidingRet(x, y, obj = null) {
    // Caso (x, y, obj2) - Colisão de ponto com objeto
    if (obj != null) {
        return x > obj.x && x < obj.x + obj.width &&
               y > obj.y && y < obj.y + obj.height;
               
    // Caso (obj1, obj2) - Colisão de dois objetos
    } else {
        let obj1 = x;
        let obj2 = y;

        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
    }
};

// Checagem de colisão em círculo
function isCollidingCircle(x, y, circle) {
    const dx = x - circle.x;
    const dy = y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < rockRadius;
}


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