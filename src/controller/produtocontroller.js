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
exports.buscarProdutoNome = async (req,res) => {
    const {nome_produto} = req.params;
    try {
        const [result] = await db.query('SELECT * FROM produto WHERE nome_produto LIKE ?',['${nome_produto}%']);
        if (result.length === 0){
            return res.status(404).json({ error:'Produto não encontrado'});
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
       res.status(500).json({error: 'Erro interno do servidor'});
    }
};

//Atualizar um produto
exports.atualizarProduto = async (req, res) => {
    const { idproduto } = req.params;
    const {nomeproduto,tipo,valorUnit,imagem} = req.body;
    //validação de dados
    const { error } = produtoSchema.validate({idproduto,nomeproduto,tipo,valorUnit,imagem});
    if (error){
        return res.status(400).json({error:error.details[0].message});
    }
    try {
        //verifica se o produto existe antes de atualizar
        const[result] = await db.query('SELECT * FROM cliente WHERE IdProduto = ?',[idproduto]);
        if(result.length===0){
            return res.status(404).json({error:'Produto não encontrado'});
        }
    } catch (err){
        console.error('Erro ao atualizar produto',err);
        res.status(500).json({error: 'Erro ao atualizar produto'});
    }
    };
    exports.deletarProduto = async (req,res) => {
        const { idproduto } = req.params;
        try{
            //Verifica se o cliente existe antes de deletar
            const[result] = await db.query('SELECT * FROM produto WHERE idproduto = ?',[idproduto]);
            if (result.length ===0){
                return res.status(404).json({error:
                    'produto não encontrado'});
                
            }
            await db.query('SELECT FROM produto WHERE idproduto = ?',[idproduto]);
            res.json({message:'Produto deletado com sucesso'});
        } catch (err){
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({error: 'Erro ao deletar produto'});
        }
    };

