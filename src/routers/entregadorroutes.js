const express = require ('express');
const router = express.Router();
const entregadorController = require('../controller/entregadorcontroller');
router.get('/entregador', entregadorController.listarEntregador);
router.get('/entregador/:IdEntregador', entregadorController.listarEntregadoridEntregador);
router.post('/entregador',entregadorController.adicionarEntregador);
router.put('entregador/:IdEntregador',entregadorController.atualizarEntregador);
router.delete('/entregador/:IdEntregador',entregadorController.deletarEntregador);

module.exports = router;