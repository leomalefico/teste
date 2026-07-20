document.getElementById('combustivelForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura valores
    const precoGasolina = parseFloat(document.getElementById('precoGasolina').value);
    const precoAlcool   = parseFloat(document.getElementById('precoAlcool').value);
    const consumoGasolina = parseFloat(document.getElementById('consumoGasolina').value);
    const consumoAlcool   = parseFloat(document.getElementById('consumoAlcool').value);

    // Validação
    if (precoGasolina <= 0 || precoAlcool <= 0 || consumoGasolina <= 0 || consumoAlcool <= 0) {
        alert('Por favor, preencha todos os campos com valores maiores que zero.');
        return;
    }

    // Cálculo do custo por km
    const custoGasolina = precoGasolina / consumoGasolina;
    const custoAlcool   = precoAlcool   / consumoAlcool;

    // Determina vantagem
    let vantagem, icon, cor;
    if (custoAlcool < custoGasolina) {
        vantagem = 'Álcool';
        icon     = '🟢';
        cor      = '#22c55e';
    } else if (custoGasolina < custoAlcool) {
        vantagem = 'Gasolina';
        icon     = '🔵';
        cor      = '#3b82f6';
    } else {
        vantagem = 'Empate';
        icon     = '⚖️';
        cor      = '#94a3b8';
    }

    // Economia
    const economia = Math.abs(custoGasolina - custoAlcool);
    const economiaFormatada = economia.toFixed(4);

    // Atualiza resultado
    const resultado = document.getElementById('resultado');
    resultado.classList.remove('hidden');

    document.getElementById('resultIcon').textContent = vantagem === 'Álcool' ? '🟢' : vantagem === 'Gasolina' ? '🔵' : '⚖️';
    document.getElementById('resultTitle').textContent =
        vantagem === 'Empate' ? 'Ambos têm o mesmo custo!' : `${vantagem} é mais vantajoso`;
    document.getElementById('resultSubtitle').textContent =
        vantagem === 'Empate'
            ? 'Custo por km idêntico'
            : `Menor custo por quilômetro rodado`;

    // Barras proporcionais
    const maxCusto = Math.max(custoGasolina, custoAlcool);
    const pctGas   = (custoGasolina / maxCusto) * 100;
    const pctAlc   = (custoAlcool   / maxCusto) * 100;

    document.getElementById('barGasolina').style.width = pctGas + '%';
    document.getElementById('barAlcool').style.width   = pctAlc + '%';

    document.getElementById('custoGasolina').textContent = `R$ ${custoGasolina.toFixed(4)}/km`;
    document.getElementById('custoAlcool').textContent   = `R$ ${custoAlcool.toFixed(4)}/km`;

    // Caixa de economia
    const economiaBox = document.getElementById('economiaBox');
    if (vantagem !== 'Empate') {
        economiaBox.style.display = 'flex';
        document.getElementById('economiaTexto').textContent =
            `Economia de R$ ${economiaFormatada}/km com ${vantagem}`;
    } else {
        economiaBox.style.display = 'none';
    }
});