const express = require('express');
const router = express.Router();

const cartsController = require('../controllers/cartsController');

router.post('/adicionar', carrinhoController.adicionarItem);
router.put('/atualizar', carrinhoController.atualizarItem);
router.delete('/limpar', carrinhoController.limparCarrinho);
router.post('/confirmar', carrinhoController.confirmarPedido);

module.exports = router;