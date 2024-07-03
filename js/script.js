const taxadi = 11.68 / 100;
const cdb_liquidezdiaria = taxadi / 365;
const lci_lca = (taxadi * (95 / 100)) / 365;

function calculateInvestment() {
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = parseInt(document.getElementById('tipo').value);
    const dias = parseInt(document.getElementById('dias').value);

    if (isNaN(valor) || isNaN(tipo) || isNaN(dias) || valor <= 0 || tipo < 1 || tipo > 3 || dias <= 0) {
        alert('Por favor, insira valores válidos.');
        return;
    }

    let rendimento_bruto;
    let rendimento_total;
    let ir;
    let ir_calc;
    let resultado = '';

    if (tipo === 1) {
        rendimento_bruto = valor * (dias * cdb_liquidezdiaria);
        rendimento_total = valor + rendimento_bruto;

        if (dias < 181) {
            ir = 22.5 / 100;
        } else if (dias <= 360) {
            ir = 20 / 100;
        } else if (dias <= 720) {
            ir = 17.5 / 100;
        } else {
            ir = 15 / 100;
        }

        ir_calc = rendimento_bruto * ir;
        resultado = `
            -------------------------------------------------
            Valor investido: R$ ${valor.toFixed(2)}
            Rendimento Bruto: R$ ${rendimento_bruto.toFixed(2)}
            Valor da Aliquota do Imposto de Renda para ${dias} dias: ${(ir * 100)}%
            Rendimento bruto com o desconto do Imposto de renda: R$ ${ir_calc.toFixed(2)}
            Valor Total Líquido: R$ ${(rendimento_total - ir_calc).toFixed(2)}
            -------------------------------------------------
        `;
    } else if (tipo === 2 || tipo === 3) {
        rendimento_bruto = valor * (dias * lci_lca);
        rendimento_total = valor + rendimento_bruto;
        resultado = `
            -------------------------------------------------
            Valor investido: R$ ${valor.toFixed(2)}
            Rendimento Bruto: R$ ${rendimento_bruto.toFixed(2)}
            Esta modalidade de investimento é isenta de Imposto de Renda.
            Valor Total Líquido: R$ ${rendimento_total.toFixed(2)}
            -------------------------------------------------
        `;
    }

    document.getElementById('result').innerText = resultado;
}