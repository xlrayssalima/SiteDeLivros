const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const livrosService = require('./livrosService');
const usuariosService = require('./usuariosService');
const auth = require('./authMiddleware');

const app = express();
const PORT = 3000;


app.use(express.json()); 
app.use(cors()); 


app.post('/cadastro', async (req, res) => {
    const { email, senha, nome } = req.body;
    
    if (!email || !senha || !nome) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    const resultado = await usuariosService.cadastrarUsuario(email, senha, nome);

    if (resultado.success) {
        return res.status(201).json({ mensagem: "Cadastro realizado com sucesso!", usuario: resultado.usuario });
    } else {
        
        return res.status(409).json({ mensagem: resultado.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
    }

    const resultado = await usuariosService.login(email, senha);

    if (resultado.success) {
        const usuario = resultado.usuario;
        
        
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            auth.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

       
        return res.json({ token, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome, role: usuario.role } });
    } else {
        
        return res.status(401).json({ mensagem: resultado.message });
    }
});


app.get('/livros', async (req, res) => {
    const livros = await livrosService.getLivros();
    res.json(livros);
});


app.get('/livros/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const livros = await livrosService.getLivros();
    const livro = livros.find(l => l.id === id);

    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ mensagem: 'Livro não encontrado' });
    }
});


const adminRouter = express.Router();


adminRouter.use(auth.verificarToken);


adminRouter.post('/', async (req, res) => {
   
    if (req.user.role !== 'admin') { return res.status(403).json({ mensagem: 'Acesso negado. Requer administrador.' }); }
    
    const livros = await livrosService.getLivros();
    const novoLivro = req.body;
    novoLivro.id = livrosService.getNewId(livros);

    livros.push(novoLivro);

    if (await livrosService.saveLivros(livros)) {
        return res.status(201).json(novoLivro);
    } else {
        return res.status(500).json({ mensagem: 'Erro ao salvar o livro.' });
    }
});


adminRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    
    if (req.user.role !== 'admin') { return res.status(403).json({ mensagem: 'Acesso negado. Requer administrador.' }); }
    
    const livros = await livrosService.getLivros();
    const indice = livros.findIndex(l => l.id === id);

    if (indice === -1) { return res.status(404).json({ mensagem: 'Livro não encontrado para edição.' }); }

    
    livros[indice] = Object.assign(livros[indice], dadosAtualizados);
    livros[indice].id = id;

    if (await livrosService.saveLivros(livros)) {
        return res.status(200).json(livros[indice]);
    } else {
        return res.status(500).json({ mensagem: 'Erro ao salvar a edição.' });
    }
});


adminRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    
    if (req.user.role !== 'admin') { return res.status(403).json({ mensagem: 'Acesso negado. Requer administrador.' }); }

    const livros = await livrosService.getLivros();
    const indice = livros.findIndex(l => l.id === id);

    if (indice === -1) { return res.status(404).json({ mensagem: 'Livro não encontrado para exclusão.' }); }

    livros.splice(indice, 1);

    if (await livrosService.saveLivros(livros)) {
        return res.status(200).json({ mensagem: 'Livro excluído com sucesso.' });
    } else {
        return res.status(500).json({ mensagem: 'Erro ao salvar a exclusão.' });
    }
});


app.use('/livros/admin', adminRouter);



app.listen(PORT, () => {
    console.log(`✅ Servidor pronto em http://localhost:${PORT}`);
});