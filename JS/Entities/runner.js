let runnerMax = 0;
const runners = [];

// Função de criação de runners
function createRunner(x, y) {
    return {
        x: x, 
        y: y,
        draggedFragment: null,
        target: null,
        returning: false
    }
};

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