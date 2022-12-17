const express = require('express');
const router = express.Router();
const despesasService = require('../service/despesasService')

const Despesa = require('../model/Despesa');

router.get('/api/despesas', async function(req, res, next){
    try{
        const despesas = await despesasService.listDespesas();
        res.json({
            data: despesas,
            sucess: true
        });
    
    }catch(e){
        next(e);
    }
    
});

router.post('/api/despesas', async function (req, res, next) {
	const {valor, descricao, data_compra, tipo_pagamento, categoria} = req.body;
    
    const despesa = new Despesa(
        valor, 
        descricao, 
        data_compra, 
        tipo_pagamento, 
        categoria
    );

	try {
		const newPost = await despesasService.salvarDespesa(despesa);
		res.status(201).json({
            data: newPost.id,
            sucess:true
        });

	} catch (e) {
		next(e);
	}
});


module.exports = router;