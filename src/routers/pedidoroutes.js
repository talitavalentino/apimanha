const express = require('express');
const router = express.Router();
const pedidoController = require('../controller/pedidocontroller');
router.get('/pedidos',PedidosController.listarPedidos);
router.get('/pedidos/:IdPedido',pedidoController.listarPedidosIdpedido);
router.post('/pedido', pedidoController.listarPedidosIdpedido);
router.put('pedidos/:IdPedido', pedidoController.atualizarPedido);
router.delete('/pedidos/:IdPedido',pedidoController.deletarPedido);
module.exports = router;