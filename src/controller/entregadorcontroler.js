const db = require('../db/db');
const joi = require('joi');

const entregadorSchema = joi.object({
    nomeEntregador: joi.string().required().max(50),
    cnh: joi.string().required(),
    telefoneEntregador: joi.string().required()
});
exports.listarEntregador = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM entregador');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar entregador:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.buscaEntregadorID = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador LIKE ?', [`${idEntregador}%`]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Entregador não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar o entregador:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.adicionarEntregador = async (req, res) => {
    const {nomeEntregador, cnh, telefoneEntregador } = req.body;
    const { error } = entregadorSchema.validate({nomeEntregador,cnh, telefoneEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    } try {
        const novoEntregador = {nomeEntregador,cnh, telefoneEntregador};
        await db.query('INSERT INTO entregador SET ?', [novoEntregador]);
        res.json({ message: 'Entregador adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar entregador:', err);
        res.status(500).json({ error: 'Erro ao adicionar entregador' });
    }
};
exports.atualizarEntregador = async (req, res) => {
    const { idEntregador } = req.params;
    const {nomeEntregador, cnh, telefoneEntregador } = req.body;
    const { error } = entregadorSchema.validate({nomeEntregador, cnh, telefoneEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Entregador não encontrado' });
        }
        const entregadorAtualizado = { telefoneEntregador};
        await db.query('UPDATE entregador SET ? WHERE idEntregador = ?', [entregadorAtualizado, idEntregador]);
        res.json({ message: 'Entregador atualizado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar entregador:', err);
        res.status(500).json({ error: 'Erro ao atualizar o entregador' });
    }
};
exports.deletarEntregar = async (req, res) => {
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM entregador WHERE idEntregador = ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(400).json({ error: 'Entregador não encontrado' });
        }
        await db.query('DELETE FROM entregador WHERE idEntregador = ?', [idEntregador]);
        res.json({ message: 'Entregador deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar o entregador:', err);
        res.status(500).json({ error: 'Erro ao deletar o entregador' });
    }
};