const db = require('../db/db'); //Módulo de conexão com o banco de dados
const Joi = require('joi'); //Biblioteca de validação de dados

const PedidoSchema = Joi.object({
    IdPedido: Joi.string().length().required(),
    datapedido: Joi.string().length().required(),
    qntdIntes: Joi.string().length().required(),
    formadepagto: Joi.string(15).required(),
    ValorTotal: Joi.string().required(),
    observacao: Joi.string(50).required(),
    cpf: Joi.string().required(),
    IdEntregador: Joi.string().required()
});
exports.listarPedidos = async(req,res) => {
    try{
        const [result] = await db.query('SELECT * FROM pedido');
        res.json(result);
    } catch (err){
        console.error('Erro ao buscar pedidos:',err)
        res.status(500).json({error:'Erro interno do servidor'});
    }
};
//Buscar um pedido por idpedido
exports.listarPedidosIdpedido = async(req,res)=>{
    const {idpedido} = req.params;
    try{
        const [results] = await db.query('SELECT * FROM pedido WHERE IdPedido = ?',[idpedido]);
        if (results.length === 0 ){
            return res.status(404).json({error:'Pedido não encontrado'});
        }
        res.json(results[0]);
    } catch (err){
        console.error('Erro ao buscar Pedido:',err)
        res.status(500).json({error:'Erro interno do servidor'});
    }
};
//adicionar um novo pedido
exports.adicionarPedido = async (req,res)=>{
    const {idpedido,datapedido,qntdIntes,formadepagto,ValorTotal,observacao,cpf,IdEntregador} = req.body;
    //validação de dados
        const {error} = PedidoSchema.validate({idpedido,datapedido,qntdIntes,formadepagto,ValorTotal,observacao,cpf,IdEntregador
        });
        if (error){
            return res.status(400).json({error: error.details[0].message});
        }
      
};
//atualizar um  pedido
exports.atualizarPedido = async(req,res) => {
    const { idpedido } = req.params;
    const {datapedido,qntdIntes,formadepagto,ValorTotal,observacao,cpf,IdEntregador} = req.body;
    //validação de dados
    const { error } = PedidoSchema.validate({idpedido,datapedido,qntdIntes,formadepagto,ValorTotal,observacao,cpf,IdEntregador});
    if (error){
        return res.status(400).json({error: error.details[0].message});
    }
    try {
        //verifica se o pedido existe antes de atualizar
        const [result] = await db.query('SELECT * FROM pedido WHERE IdPedido = ?',[idpedido]);
        if (result.length === 0){
            return res.status(404).json({error:'Pedido não encontrado'});
        }
    } catch (err){
        console.error('Erro ao atualizar cliente',err);
        res.status(500).json({error:'Erro ao atualizar pedido'});
    }
};

