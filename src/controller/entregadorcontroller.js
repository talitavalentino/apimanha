const db = require('../db/db');
const Joi = require('joi');
const PedidoSchema = Joi.object({
    IdEntregador: Joi.string().required(),
    nomeEntregador: Joi.string(50).required(),
    cnh: Joi.string().required(),
    telefoneEntregador: Joi.string().required(),
});
exports.listarEntregador = async (req,res)=> {
    try{
        const [result] = await db.query('SELECT * FROM entregador');
        res.json(result);
    } catch (err){
        console.error('Erro ao buscar entregador', err);
        res.status(500).json({error:'Erro interno do servidor'});
    }
};
//buscar um entregador por identregador
exports.listarEntregadoridEntregador = async(req,res)=>{
    const {IdEntregador} = req.params;
    try{
        const[results] = await db.query
        ('SELECT * FROM entregador WHERE identregador = ?', [IdEntregador]);
        if(results.length===0){
            return res.status(404).json({error: 'Entregador não encontrado'});
        }
        res.json(results[0]);
    } catch (err){
        console.error('Erro ao buscar entregador:', err);
        res.status(500).json({error:'Erro interno do servidor'});
    }
};
//adicionar um novo entregador
exports.adicionarEntregador = async(req,res)=>{
    const {IdEntregador,nomeEntregador,cnh,telefoneEntregador}= req.body;
    //validação de dados
}
