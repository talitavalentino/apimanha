const db = require('../db/db');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const produtoSchema = Joi.object({
    IdProduto: Joi.string().length().required(),
    nomeproduto: Joi.string().required(30),
    tipo: Joi.string().required(30),
    descriçao: Joi.string().required(100),
    valorUnit: Joi.string().required(),
    imagem: Joi.string().required(200),
});
exports.listarProdutos = async(req,res) =>{
    try{
        const [result] = await db.query('SELECT * FROM produto');
        res.json(result);
    } catch (err){
        console.error('Erro ao buscar produtos:',err);
        res.status(500).json({
            error:'Erro interno do servidor'
        });
    }
};
//Buscar um produto por IdProduto
exports.listarProdutoIdProduto = async(req,res)=>{
const {IdProduto} = req.params;
try{
    const [result] = await db.query ('Select * FROM produto WHERE IdProduto = ?',[IdProduto]);
    if(result.length === 0){
        return res.status(404).json({error:'Produto não encontrado'});
    }
    res.json(result[0]);
} catch (err){
    console.error('Erro ao buscar produto:',err);
    res.status(500).json({error:'Erro interno do servidor'});
}
}
//adicionar um novo produto
exports.adicionarProduto = async (req,res) =>{
    const {IdProduto, nomeproduto, tipo, descriçao, valorUnit, imagem} = req.body;
}
// Buscar produtos por nome

//validação de dados
