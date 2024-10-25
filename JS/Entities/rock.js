const rockRadius = 100;
const rock = {
    x: (canvas.width / 2),
    y: (canvas.height / 2),
};

// Centraliza a pedra ao carregar a página
window.addEventListener('load', () => {
    rock.x = (canvas.width / 2);
    rock.y = (canvas.height / 2);
})

// Centraliza a pedra ao reescalar a página
window.addEventListener('resize', () => {
    rock.x = (canvas.width / 2);
    rock.y = (canvas.height / 2);
})

// Evento de clique do mouse
canvas.addEventListener('mousedown', () => {
    // Cria um fragmento de clicar com o mouse em cima da pedra
    if (isCollidingCircle(mouseX, mouseY, rock)) {
        const targetX = Math.random() * (window.innerWidth - 200) + 100;
        const targetY = Math.random() * (window.innerHeight - 200) + 100;

        while (isCollidingCircle(targetX, targetY, rock)) {
            targetX = Math.random() * (window.innerWidth - 200) + 100;
            targetY = Math.random() * (window.innerHeight - 200) + 100;
        }

        const newFragment = createFragment(targetX, targetY);
        frags.push(newFragment);
    }
});

// Função de desenho da pedra
function drawRock() {
    ctx.save();

    ctx.beginPath();
    ctx.arc(rock.x, rock.y, rockRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FDFEFE'
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = '#37333E';
    ctx.fill();

    ctx.restore();
};