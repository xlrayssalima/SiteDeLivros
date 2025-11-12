Roteiro de Testes da API de Livros
Siga estas etapas para validar todas as funcionalidades do Back-end no http://localhost:3000.
Objetivo 1: Testar Rotas Públicas e Cadastro
1.	[TESTE] Listar Livros:
	Método: GET
	URL: http://localhost:3000/livros
	Resultado Esperado: Status 200 OK e a lista completa de livros.
2.	[TESTE] Cadastrar Novo Usuário (Usuário Comum):
	Método: POST
	URL: http://localhost:3000/cadastro
	Body (JSON):
{
    "email": "novo_cliente@teste.com",
    "senha": "senha123",
    "nome": "Novo Cliente"
}

	Resultado Esperado: Status 201 Created. (O novo usuário deve aparecer no usuarios.json).
Objetivo 2: Testar Login e Obter Permissão Admin
1.	[TESTE] Login Admin:
	Método: POST
	URL: http://localhost:3000/login
	Body (JSON):
{
    "email": "admin@livros.com",
    "senha": "admin123"
}

	Ação: Salve o token retornado na resposta. Você precisará dele para o próximo teste!
	Resultado Esperado: Status 200 OK e um longo token na resposta.
Objetivo 3: Testar Segurança e Permissões
1.	[TESTE] Adicionar Livro (Com Token ADMIN):
	Método: POST
	URL: http://localhost:3000/livros/admin
	Header Necessário: Authorization: Bearer [COLE O TOKEN ADMIN AQUI]
	Body (JSON):
{
    "titulo": "O Código Limpo",
    "autor": "Robert C. Martin",
    "descricao": "Guia para escrever software melhor.",
    "capa": "[https://placehold.co/200x300/e9a23b/121212?text=Clean+Code](https://placehold.co/200x300/e9a23b/121212?text=Clean+Code)",
    "preco": 89.90
}

	Resultado Esperado: Status 201 Created. (O novo livro deve aparecer no livros.json).
2.	[TESTE] BLOQUEIO (O Usuário Comum é Barrado):
	Método: DELETE
	URL: http://localhost:3000/livros/admin/4 (Tente deletar um livro).
	Ação: Use o token de um usuário que NÃO seja admin (ex: teste@livros.com).
	Header Necessário: Authorization: Bearer [COLE O TOKEN COMUM AQUI]
	Resultado Esperado: Status 403 Forbidden e a mensagem: "Acesso negado. Requer administrador."
