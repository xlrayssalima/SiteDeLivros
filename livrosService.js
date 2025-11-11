const fs = require('fs/promises');
const LIVROS_FILE = './livros.json';


async function getLivros() {
    try {
        const data = await fs.readFile(LIVROS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
       
        return []; 
    }
}


async function saveLivros(livros) {
    try {
        await fs.writeFile(LIVROS_FILE, JSON.stringify(livros, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("ERRO [LivrosService]: Falha ao salvar no disco.", error.message);
        return false;
    }
}


async function getNewId(livros) {
    if (livros.length === 0) {
        return 1;
    }
    const maxId = Math.max(...livros.map(l => l.id));
    return maxId + 1;
}

module.exports = {
    getLivros,
    saveLivros,
    getNewId
};