const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const USUARIOS_FILE = './usuarios.json';
const SALT_ROUNDS = 10; 


async function cadastrarUsuario(email, senha, nome) {
    const usuarios = await getUsuarios();

    if (usuarios.some(u => u.email === email)) {
        return { success: false, message: "E-mail já cadastrado." };
    }

    const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);
    const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    const novoUsuario = {
        id: novoId,
        email,
        senha: senhaCriptografada,
        nome,
        role: "user" 
    };

    usuarios.push(novoUsuario);

    if (await saveUsuarios(usuarios)) {
        const { senha: _, ...usuarioSemSenha } = novoUsuario;
        return { success: true, usuario: usuarioSemSenha };
    } else {
        return { success: false, message: "Erro ao salvar o novo usuário." };
    }
}


async function login(email, senha) {
    const usuarios = await getUsuarios();
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) { return { success: false, message: "E-mail ou senha inválidos." }; }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) { return { success: false, message: "E-mail ou senha inválidos." }; }

    const { senha: _, ...usuarioLogado } = usuario;
    return { success: true, usuario: usuarioLogado };
}


async function getUsuarios() {
    try {
        const data = await fs.readFile(USUARIOS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
}
async function saveUsuarios(usuarios) {
    try {
        await fs.writeFile(USUARIOS_FILE, JSON.stringify(usuarios, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error("ERRO [UsuariosService]: Falha ao salvar.", error.message);
        return false;
    }
}

module.exports = {
    cadastrarUsuario,
    login
};