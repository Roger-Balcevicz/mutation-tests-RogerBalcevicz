class Validador {
  /** Verifica se um e-mail tem formato válido */
  ehEmailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /** Verifica se uma senha é forte (min. 8 caracteres, maiúscula, minúscula, número e símbolo) */
  ehSenhaForte(senha) {
    return (
      senha.length >= 8 &&
      /[a-z]/.test(senha) &&
      /[A-Z]/.test(senha) &&
      /\d/.test(senha) &&
      /[^A-Za-z0-9]/.test(senha)
    );
  }

  /** Verifica se a idade indica maioridade (>= 18) */
  ehMaiorDeIdade(idade) {
    return idade >= 18;
  }

  /** Verifica se um CEP está no formato 00000-000 ou 00000000 */
  ehCepValido(cep) {
    return /^\d{5}-?\d{3}$/.test(cep);
  }

  /** Verifica se um telefone está no formato (00) 00000-0000 ou variações sem máscara */
  ehTelefoneValido(telefone) {
    return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone);
  }

  /** Verifica se uma URL é válida */
  ehUrlValida(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /** Verifica se um valor é um número inteiro */
  ehInteiro(valor) {
    return Number.isInteger(valor);
  }

  /** Verifica se um número é positivo */
  ehPositivo(numero) {
    return numero > 0;
  }

  /** Verifica se um número é negativo */
  ehNegativo(numero) {
    return numero < 0;
  }

  /** Verifica se um número está dentro de um intervalo (inclusivo) */
  estaNoIntervalo(numero, min, max) {
    return numero >= min && numero <= max;
  }

  /** Verifica se uma string é vazia ou contém apenas espaços */
  ehStringVazia(str) {
    return str.trim().length === 0;
  }

  /** Verifica se um array é vazio */
  ehArrayVazio(arr) {
    return arr.length === 0;
  }

  /** Verifica se uma string representa uma data válida */
  ehDataValida(dataStr) {
    return !isNaN(Date.parse(dataStr));
  }

  /** Verifica se uma data está no futuro em relação a agora */
  ehDataFutura(dataStr) {
    const data = new Date(dataStr);
    return !isNaN(data.getTime()) && data.getTime() > Date.now();
  }

  /** Verifica se uma data está no passado em relação a agora */
  ehDataPassada(dataStr) {
    const data = new Date(dataStr);
    return !isNaN(data.getTime()) && data.getTime() < Date.now();
  }

  /** Verifica se um número é múltiplo de outro */
  ehMultiploDe(numero, divisor) {
    if (divisor === 0) throw new Error("Divisor não pode ser zero");
    return numero % divisor === 0;
  }

  /** Verifica se um número é uma potência de dois */
  ehPotenciaDeDois(numero) {
    return Number.isInteger(numero) && numero > 0 && (numero & (numero - 1)) === 0;
  }

  /** Verifica se uma string contém apenas dígitos */
  contemApenasNumeros(str) {
    return /^\d+$/.test(str);
  }

  /** Verifica se uma string é um código de cor hexadecimal válido */
  ehCorHexValida(cor) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(cor);
  }

  /** Verifica se uma string é um JSON válido */
  ehJsonValido(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  /** Verifica se um CPF possui o formato válido (000.000.000-00 ou 00000000000) */
  ehCpfFormatoValido(cpf) {
    return /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf);
  }
}

module.exports = Validador;
