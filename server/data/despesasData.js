const database = require('../infra/database');
const Despesa = require('../model/Despesa');
const TipoPagamento = require('../model/TipoPagamento');
const Categoria = require('../model/Categoria');

exports.listDespesas = async function(){
    const retorno = await database.query('select d.id, valor, d.descricao as desDescricao, data_compra, '+
    'tipo_pagamento_id, categoria_id, tipo, nome, cat.descricao as catDescricao '+
    'from despesas d inner join tipos_pagamento tp on (d.tipo_pagamento_id = tp.id) '+
    'inner join categorias cat on (d.categoria_id = cat.id) '+
    'where EXTRACT(Month from data_compra) = EXTRACT(Month from current_date)');

    var despesas = [];
    retorno.forEach(row => {
        
        var despesa = new Despesa(
            row.valor,
            row.desdescricao,
            row.data_compra,
            new TipoPagamento (row.tipo_pagamento_id, row.tipo),
            new Categoria (row.categoria_id, row.nome, row.catdescricao)
        )
        despesas = [...despesas, despesa];
    });

    return despesas;
};

exports.salvarDespesa = async function (despesa) {
	const retorno = await database.one(
        'insert into despesas (valor, data_compra, descricao, tipo_pagamento_id, categoria_id) values ($1, $2, $3, $4, $5) returning *',
         [despesa.valor, despesa.data_compra, despesa.descricao, despesa.tipo_pagamento.id, despesa.categoria.id]
        );
        
        return retorno;
};