const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

// Pastas que devem ser ignoradas
const IGNORE_DIRS = ['node_modules', '.next', '.git', 'dist', 'build'];

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                processDirectory(fullPath);
            }
        } else {
            const ext = path.extname(fullPath);
            // Extensões que queremos limpar
            if (['.js', '.jsx', '.ts', '.tsx', '.css', '.html'].includes(ext)) {
                const content = fs.readFileSync(fullPath, 'utf8');
                
                // O strip-comments lida com a sintaxe corretamente
                const stripped = strip(content);
                
                if (content !== stripped) {
                    fs.writeFileSync(fullPath, stripped, 'utf8');
                    console.log(`✅ Comentários removidos: ${fullPath}`);
                }
            }
        }
    });
}

console.log('Iniciando limpeza...');
processDirectory('./src'); // Altere para a pasta raiz do seu código
console.log('Limpeza concluída!');