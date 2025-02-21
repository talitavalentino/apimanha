const express = require('express');
const router = express.Router();
const clienteController = require('../controller/clientecontroller');
// Importa o controller de clientes

// Rota para listar todos os clientes
router.get('/clientes', clienteController.listarClientes);
// Rota para buscar um cliente por CPF
router.get('/clientes/:cpf', clienteController.listarClienteCpf);
// Rota para adicionar um novo cliente
router.post('/clientes', clienteController.adicionarCliente);
// Rota para atualizar um cliente por CPF
router.put('/clientes/:cpf', clienteController.atualizarCliente);
// Rota para deletar um cliente por CPF
router.delete('/clientes/:cpf', clienteController.deletarCliente);

module.exports = router;