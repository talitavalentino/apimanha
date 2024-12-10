const express = require('express');
const router = express.Router();
const ProdutoController = require('../controller/produtocontroller');
//importa o controller de produtos

// Rota para listar todos os produtos
router.get('/clientes',ProdutoController.listarProdutos);

//Rota para buscar um produto por Idproduto
router.get('/produtos/:IdProduto',produtoController.listarProdutoIdproduto);

//Rota para adicionar um novo produto
router.post('/produtos',produtoController.adicionarProduto);

//Rota para atualizar um produto por idproduto
router.put('produtos/:IdProduto', produtoController.atualizarProduto);

//Rota para deletar um produto por IdProduto
router.delete('/cliente/:IdProduto', ProdutoController.deletarProduto);

module.exports = router;
