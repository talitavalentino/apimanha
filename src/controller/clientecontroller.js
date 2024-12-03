const db = require('../db'); //Módulo de conexão com o banco de dados
const Joi = require('joi');//Biblioteca de validação de dados
const bcrypt = require('bcrypt');//Para encriptação de senhas
//Validação de senha Joi
const clienteSchema = Joi.object({
cpf: Joi.string().length(11).required(),
nome: Joi.string().required().max(50),
//NOME deve ser uma string e é obrigatorio 
endereço: Joi.string().required(80),
//Endereço deve ser uma string e é obrigatório
bairro: Joi.string().required(30),
//bairro deve ser uma string e é o brigatorio
cep: Joi.string().required(),
//CEP deve ser uma string e é obrigatorio
telefone: Joi.string().required(),
//telefone deve ser uma string e é obrigatoria
email: Joi.string().email().required(50),
//email deve ser válido e é obrigatório
senha: Joi.string().min(6).required()
//senha deve ter no minimo 6 caracteres e é obrigatoria
});

//Listar todos os clientes
exports.listarClientes = async(req,res) => {
    try{
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); //Aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar clientes:',err);
        res.status(500).json({error:'Erro interno do servidor'});
    }
};

//Buscar um cliente por CPF
exports.listarClienteCpf = async(req,res) => {
    const {cpf} = req.params;
    try { 
        const [results] = await db.query('Select * FROM cliente WHERE cpf = ?',[cpf]);
        if (result.length === 0){
            return res.status(404).json({error: 'Cliente não encontrado'
            });
        }
        res.json(result[0]);
    } catch (err){
        console.error('Erro ao buscar cliente:',err);
        res.status(500).json({error:'Erro interno do servidor'});
    }
};
//adicionar um novo cliente
exports.adicionarCliente = async (req,res)=>{
    const {cpf, nome, endereço, bairro, cep, telefone, email, senha} =  req.body;

//validação de dados
const {error} = clienteSchema.validate({cpf,nome,endereço,bairro,cep,telefone,email,senha
});
if (error){
    return res.status(400).json({error: error.details[0].message });
}
try {
    //Criptografando a senha
    const hash = await bcrypt.hash(senha, 10);
    const novoCliente = {
        cpf,nome,endereço,bairro,endereço,bairro,cep,telefone,email,senha: hash
    };
    await db.query('INSERT INTO cliente SET ?', novoCliente);

    res.json({
        message: 'Cliente adicionado com sucesso'
    });
} catch (err){
    console.error('Erro ao adicionar cliente:', err);
    res.status(500).json({ error: 'Erro ao adicionar cliente'});
}
}