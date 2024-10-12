import React, { useState } from 'react';
import './App.css';

function App() {
  const [salarioLiquido, setSalarioLiquido] = useState('');
  const [valeAlimentacao, setValeAlimentacao] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');

  const calcularCustoEmpregador = () => {
    // Limpa a mensagem de erro
    setMensagemErro('');

    // Verifica se o salário líquido está preenchido
    if (!salarioLiquido) {
      setMensagemErro('O campo Salário Líquido é obrigatório.');
      setResultado(null); // Certifique-se de limpar o resultado
      return; // Para a execução da função se a validação falhar
    }

    // Normaliza os valores, substituindo vírgula por ponto e removendo espaços
    const normalizeValue = (value) => {
      return parseFloat(value.replace(/\s/g, '').replace(',', '.'));
    };

    const liquido = normalizeValue(salarioLiquido);
    const alimentacao = normalizeValue(valeAlimentacao) || 0;

    // Exemplo de cálculo baseado no salário líquido
    const inss = liquido * 0.12;  // Exemplo de taxa
    const fgts = liquido * 0.08;  // Exemplo de taxa
    const irrf = liquido * 0.05;  // Exemplo de taxa
    const salarioBruto = liquido + inss + fgts + irrf;

    const inssPatronal = salarioBruto * 0.2;  // Exemplo de taxa patronal
    const decimoTerceiro = salarioBruto / 12;
    const ferias = salarioBruto / 12;

    const custoEmpregador = salarioBruto + inssPatronal + decimoTerceiro + ferias + alimentacao;

    setResultado({
      salarioBruto: salarioBruto.toFixed(2),
      fgts: fgts.toFixed(2),
      inss: inss.toFixed(2),
      irrf: irrf.toFixed(2),
      inssPatronal: inssPatronal.toFixed(2),
      decimoTerceiro: decimoTerceiro.toFixed(2),
      ferias: ferias.toFixed(2),
      alimentacao: alimentacao.toFixed(2),
      custoEmpregador: custoEmpregador.toFixed(2),
    });
  };

  const handleKeyDown = (e) => {
    // Lista de teclas permitidas, incluindo teclas de navegação e controle
    const allowedKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 
      'Home', 'End', 'Shift', 'Control', 'Meta' // 'Meta' para Windows (Super) key
    ];
  
    // Permitir números (0-9), vírgula (','), ponto ('.') e combinações com Shift, Home, End, etc.
    if (
      (e.key >= '0' && e.key <= '9') ||
      e.key === ',' || 
      e.key === '.' ||
      allowedKeys.includes(e.key) ||
      (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) // Permitir Ctrl+C, Ctrl+V, Ctrl+X
    ) {
      return; // Permite a tecla
    } else {
      e.preventDefault(); // Bloqueia a tecla
    }
  };  

  return (
    <div className="App">
      <h1>Calculadora de Custo CLT</h1>
      
      <label htmlFor="salarioLiquido" className="label">Salário Líquido <span className="required">*</span>:</label>
      <input 
        id="salarioLiquido" 
        type="text" 
        value={salarioLiquido} 
        onKeyDown={handleKeyDown}
        onChange={(e) => setSalarioLiquido(e.target.value)} 
        placeholder="Digite o salário líquido"
      />

      <label htmlFor="valeAlimentacao" className="label">Vale Alimentação:</label>
      <input 
        id="valeAlimentacao" 
        type="text" 
        value={valeAlimentacao} 
        onKeyDown={handleKeyDown}
        onChange={(e) => setValeAlimentacao(e.target.value)} 
        placeholder="Digite o valor do vale alimentação"
      />
      
      <button onClick={calcularCustoEmpregador}>Calcular Custo</button>
      
      {mensagemErro && <p className="error">{mensagemErro}</p>} {/* Mensagem de erro */}

      {/* Exibe o resultado apenas se não houver mensagem de erro */}
      {!mensagemErro && resultado && (
        <div className="resultado">
          <h2>Detalhamento dos Cálculos:</h2>
          <ul>
            <li><strong>Salário Bruto:</strong> R$ {resultado.salarioBruto}</li>
            <li><strong>Desconto do FGTS:</strong> R$ {resultado.fgts}</li>
            <li><strong>Desconto do INSS:</strong> R$ {resultado.inss}</li>
            <li><strong>Desconto do IR:</strong> R$ {resultado.irrf}</li>
            <li><strong>Desconto INSS Patronal:</strong> R$ {resultado.inssPatronal}</li>
            <li><strong>Vale Alimentação:</strong> R$ {resultado.alimentacao}</li>
            <li><strong>Custo do seu 13º:</strong> R$ {resultado.decimoTerceiro}</li>
            <li><strong>Custo das suas férias:</strong> R$ {resultado.ferias}</li>
            <li><strong>Custo para o patrão é:</strong> R$ {resultado.custoEmpregador}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
