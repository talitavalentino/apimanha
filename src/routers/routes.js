const express = require('express');
const router = express.Router();

//Exemplo de uma rota GET 
router.get('/usuario', (req, res) =>
{
    res.send('rota do usuario');
});
//Exporte o roteador para que ele possa ser usado no index.js
module.exports = router;