const runners = [];
const fragRadius = 25;
let runnerMax = 1;

// Função de criação de runners
function createRunner(x, y, xspd, yspd) {
    return {
        x: x, 
        y: y,
        radius: runnerRadius,
        spd: 2,
        xspd: xspd,
        yspd: yspd,
        draggedFragment: null,
        target: null,
        returning: false
    };
}

// Função de desenho do runner
function drawRunner(runner) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(runner.x, runner.y, runnerRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.fillStyle = '#37333E';
    ctx.fill();

    ctx.restore();
};

// Função update dos runners
function updateRunners() {
    if (frags.length !== 0 && runners.length < runnerMax) {  
        for (let frag of frags) {
            if (frag !== user.draggedFragment && runners.find((runner) => runner.target === frag) === undefined) {
                spawnRunner(frag);
                break;
            }
        }
    }

    if (runners.length != 0) {
        for (let runner of runners) {
            if (isCollidingCircle(runner, runner.target)) {
                runner.returning = true;
            } else {
                runner.returning = false;
            }
            follow(runner);
        }
    }  
};

// Função para criar um runner
function spawnRunner(frag) {
    let targetX = 0, targetY = 0, targetXspd = 0, targetYspd = 0;
    switch(closestBorder(frag)) {
        case 'left':
            targetX = -runnerRadius;
            targetY = frag.y;
            targetXspd = 2;
            break;
        case 'right':
            targetX = canvas.width + runnerRadius;
            targetY = frag.y;
            targetXspd = -2;
            break;
        case "top":
            targetX = frag.x;
            targetY = -runnerRadius;
            targetYspd = 2;
            break;
        case "bottom":
            targetX = frag.x;
            targetY = canvas.height + runnerRadius;
            targetYspd = -2;
            break;
    }
           
    let newRunner = createRunner(targetX, targetY, targetXspd, targetYspd);
    newRunner.target = frag;
    runners.push(newRunner);
}

// Função para buscar a borda mais próxima
function closestBorder(obj) {
    // Distâncias até cada borda
    const distLeft = Math.abs(obj.x);
    const distRight = Math.abs(obj.x - canvas.width);
    const distTop = Math.abs(obj.y);
    const distBottom = Math.abs(obj.y - canvas.height);

    // Encontre a menor distância e retorne a borda correspondente
    const minDist = Math.min(distLeft, distRight, distTop, distBottom);

    if (minDist === distLeft) {
        return "left";
    } else if (minDist === distRight) {
        return "right";
    } else if (minDist === distTop) {
        return "top";
    } else {
        return "bottom";
    }
}

// Função para seguir o runner seguir seu target
function follow() {
    for (let i = runners.length - 1; i >= 0; i--) {
        let runner = runners[i];

        if (frags.find((frag) => runner.target === frag) !== undefined) {
            const dx = runner.target.x - runner.x;
            const dy = runner.target.y - runner.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Velocidade do runner em direção ao target
            runner.xspd = (dx / distance) * runner.spd;
            runner.yspd = (dy / distance) * runner.spd;

            // Checa se esta voltando
            if (runner.returning) {
                switch(closestBorder(runner)) {
                    case 'left':
                        runner.xspd = runner.spd;
                        runner.yspd = 0;
                        break;
                    case 'right':
                        runner.xspd = -runner.spd;
                        runner.yspd = 0;
                        break;
                    case "top":
                        runner.xspd = 0;
                        runner.yspd = runner.spd;
                        break;
                    case "bottom":
                        runner.xspd = 0;
                        runner.yspd = -runner.spd;
                        break;
                }
                runner.x -= runner.xspd;
                runner.y -= runner.yspd;
                runner.target.x -= runner.xspd;
                runner.target.y -= runner.yspd;
            } else {
                runner.x += runner.xspd;
                runner.y += runner.yspd;
            }
        } else {
            // Remove runner do array se não tiver target
            runners.splice(i, 1);
        }
    }
}

// Criar função updateRunners()
    // Checar se tem fragmento para buscar
    // Atualizar paths de runners em jogos

// Criar função spawnRunner()
    // Spawnar quando tiver um fragmento disponível para seguir, definir target e local de spawn nas bordas da tela

// Criar função follow()
    // Quando pegar o fragmento, voltar
    // Se o fragmento for pego pelo user, voltar
    // Enquanto retorna, se o user soltar e ainda existir o target, verificar qual caminho é mais perto: do local atual até o fragmento ou até as bordas
    // Só dar follow para um fragmento que não for target de outro runner e se tiver mais perto do que as bordas
    // Ao entregar, despawnar