const express = require('express');
const app = express();
const fs = require('fs/promises');
const cors = require('cors');
const PORT = 3000;


const ARQUIVO_DADOS = './livros.json';


app.use(express.json()); 
app.use(cors());


app.use(express.static('.'));


app.post('/livros', async (req, res) => {
    try {
        
        const novoLivro = req.body;
        console.log("➕ Recebida requisição POST para /livros. Dados:", novoLivro);

        const data = await fs.readFile(ARQUIVO_DADOS, 'utf8');
        let livros = JSON.parse(data);

        
        const novoId = livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1;
        novoLivro.id = novoId;

        
        livros.push(novoLivro);

        
        await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(livros, null, 2), 'utf8');
        console.log(`💾 Livro ID ${novoId} adicionado com sucesso.`);

        
        return res.status(201).json(novoLivro); 

    } catch (error) {
        console.error("❌ Erro ao processar adição de livro:", error);
        return res.status(500).json({ mensagem: 'Erro interno ao tentar cadastrar o livro.' });
    }
});



app.get('/livros', async (req, res) => {
    try {
        const data = await fs.readFile(ARQUIVO_DADOS, 'utf8');
        const livros = JSON.parse(data);
        res.json(livros);
    } catch (error) {
        console.error("❌ Erro ao ler livros.json:", error);
        res.status(500).json({ mensagem: 'Erro interno ao buscar livros.' });
    }
});


app.get('/livros/:id', async (req, res) => {
    try {
        
        const id = parseInt(req.params.id); 
        const data = await fs.readFile(ARQUIVO_DADOS, 'utf8');
        const livros = JSON.parse(data);
        const livro = livros.find(l => l.id === id);

        if (livro) {
            res.json(livro);
        } else {
            res.status(404).json({ mensagem: 'Livro não encontrado' });
        }
    } catch (error) {
        console.error("❌ Erro ao buscar livro por ID:", error);
        res.status(500).json({ mensagem: 'Erro interno ao buscar livro.' });
    }
});



app.put('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    console.log(`✏️ Recebida requisição PUT para /livros/${id}`);

    try {
        const data = await fs.readFile(ARQUIVO_DADOS, 'utf8');
        let livros = JSON.parse(data);

       
        const indice = livros.findIndex(l => l.id === id);

        if (indice === -1) {
            return res.status(404).json({ mensagem: 'Livro não encontrado para edição.' });
        }

       
        livros[indice] = Object.assign(livros[indice], dadosAtualizados);
        livros[indice].id = id;

        
        await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(livros, null, 2), 'utf8');
        console.log(`💾 Livro ID ${id} atualizado com sucesso no JSON.`);
        
        
        return res.status(200).json(livros[indice]);

    } catch (error) {
        console.error("❌ Erro ao processar edição:", error);
        return res.status(500).json({ mensagem: 'Erro interno ao tentar editar o livro.' });
    }
});


app.delete('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`❌ Recebida requisição DELETE para /livros/${id}`);

    try {
        const data = await fs.readFile(ARQUIVO_DADOS, 'utf8');
        let livros = JSON.parse(data);

        
        const indice = livros.findIndex(l => l.id === id);

        if (indice === -1) {
            return res.status(404).json({ mensagem: 'Livro não encontrado para exclusão.' });
        }

       
        livros.splice(indice, 1);

        
        await fs.writeFile(ARQUIVO_DADOS, JSON.stringify(livros, null, 2), 'utf8');
        console.log(`✅ Livro ID ${id} excluído com sucesso do JSON.`);
        
        
        return res.status(200).json({ mensagem: 'Livro excluído com sucesso.' }); 

    } catch (error) {
        console.error("❌ Erro ao processar exclusão:", error);
        return res.status(500).json({ mensagem: 'Erro interno ao tentar excluir o livro.' });
    }
});



app.listen(PORT, () => {
    console.log(`✅ Servidor pronto para receber requisições em http://localhost:${PORT}`);
});