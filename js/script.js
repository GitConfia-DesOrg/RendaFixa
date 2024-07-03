function calculateInvestment() {
    const valor = parseFloat(document.getElementById('valor').value);
    const dias = parseInt(document.getElementById('dias').value);
    const taxaDI = parseFloat(document.getElementById('taxaDI').value) / 100;

    const cdb = parseInt(document.getElementById('cdb').value) / 100
    const lcia = parseInt(document.getElementById('lcia').value) / 100
    
    const cdb_liquidezdiaria = (taxaDI * cdb) / 365;
    const lci_lca = (taxaDI * lcia) / 365;

    if (isNaN(valor) || isNaN(dias) || isNaN(taxaDI) || isNaN(cdb) || valor <= 0 || dias <= 0 || taxaDI <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    calculateCDB(valor, dias, cdb_liquidezdiaria);
    calculateLCI_LCA(valor, dias, lci_lca, "LCI");
    calculateLCI_LCA(valor, dias, lci_lca, "LCA");
}

function calculateCDB(valor, dias, cdb_liquidezdiaria) {
    let rendimento_bruto = valor * (dias * cdb_liquidezdiaria);
    let rendimento_total = valor + rendimento_bruto;

    let ir;
    if (dias < 181) {
        ir = 22.5 / 100;
    } else if (dias <= 360) {
        ir = 20 / 100;
    } else if (dias <= 720) {
        ir = 17.5 / 100;
    } else {
        ir = 15 / 100;
    }

    let ir_calc = rendimento_bruto * ir;

    document.getElementById('valorInvestidoCDB').innerHTML = `Valor investido: R$ ${valor.toFixed(2)}`;
    document.getElementById('rendimentoBrutoCDB').innerHTML = `Rendimento Bruto: R$ ${rendimento_bruto.toFixed(2)}`;
    document.getElementById('aliquotaIRCDB').innerHTML = `Valor da Aliquota do Imposto de Renda para ${dias} dias é de <strong> ${(ir * 100)}% </strong>`;
    document.getElementById('rendimentoDescontadoIRCDB').innerHTML = `Rendimento bruto com o desconto do Imposto de renda: R$ ${ir_calc.toFixed(2)}`;
    document.getElementById('valorTotalLiquidoCDB').innerHTML = `Valor Total Líquido: R$ ${(rendimento_total - ir_calc).toFixed(2)}`;
}

function calculateLCI_LCA(valor, dias, lci_lca, tipo) {
    let rendimento_bruto = valor * (dias * lci_lca);
    let rendimento_total = valor + rendimento_bruto;

    document.getElementById(`valorInvestido${tipo}`).innerHTML = 'Valor investido: R$ ${valor.toFixed(2)}';
    document.getElementById(`rendimentoBruto${tipo}`).innerHTML = `Rendimento Bruto: R$ ${rendimento_bruto.toFixed(2)}`;
    document.getElementById(`aliquotaIR${tipo}`).innerHTML = `Esta modalidade de investimento é isenta de Imposto de Renda.`;
    document.getElementById(`rendimentoDescontadoIR${tipo}`).innerHTML = '';
    document.getElementById(`valorTotalLiquido${tipo}`).innerHTML = `Valor Total Líquido: R$ ${rendimento_total.toFixed(2)}`;
}