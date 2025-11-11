const jwt = require('jsonwebtoken');

// Chave secreta usada para gerar e verificar o token.
const JWT_SECRET = 'sua_chave_secreta_super_segura'; 

// Checa se o usuário enviou um token de login válido
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Salva os dados do usuário logado na requisição
        next(); // Permite que a rota continue se for válido
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
    }
}

module.exports = {
    verificarToken,
    JWT_SECRET
};