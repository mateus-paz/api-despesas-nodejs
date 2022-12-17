const despesasData = require('../data/despesasData')

exports.listDespesas = function () {
    return despesasData.listDespesas();
};

exports.salvarDespesa = function (despesa) {
    const desp = despesasData.salvarDespesa(despesa);

	return desp;
};