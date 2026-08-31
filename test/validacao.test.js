const Validacao = require('../src/validacao');

describe('Validacao', () => {
    test('Deve validar e-mail, senha e idade', () => {

    const validacao = new Validacao();
    const emailValido = validacao.ehEmailValido("teste@exemplo.com");
    const emailInvalido = validacao.ehEmailValido("teste@exemplo");
    const senhaForte = validacao.ehSenhaForte("Abadef1!");
    const senhaFraca = validacao.ehSenhaForte("abcdefghijk");
    const maiorIdade = validacao.ehMaiorDeIdade(18);
    const menorIdade = validacao.ehMaiorDeIdade(17);

    expect(emailValido).toBe(true);
    expect(emailInvalido).toBe(false);
    expect(senhaForte).toBe(true);
    expect(senhaFraca).toBe(false);
    expect(maiorIdade).toBe(true);
    expect(menorIdade).toBe(false);
  });

    test('Deve validar o CEP, telefone e url', () => {
    const validacao = new Validacao();

    const cepValido = validacao.ehCepValido("12345-678");
    const cepInvalido = validacao.ehCepValido("123");
    const telefoneValido = validacao.ehTelefoneValido("(11) 91234-5678");
    const telefoneInvalido = validacao.ehTelefoneValido("abc");
    const urlValida = validacao.ehUrlValida("https://exemplo.com");
    const urlInvalida = validacao.ehUrlValida("nao-eh-url");

    expect(cepValido).toBe(true);
    expect(cepInvalido).toBe(false);
    expect(telefoneValido).toBe(true);
    expect(telefoneInvalido).toBe(false);
    expect(urlValida).toBe(true);
    expect(urlInvalida).toBe(false);
  });
    test("Deve validar numero e inteervalos", () => {
    
    const validacao = new Validacao();

    const inteiroValido = validacao.ehInteiro(10);
    const inteiroInvalido = validacao.ehInteiro(10.5);
    const positivo = validacao.ehPositivo(5);
    const negativo = validacao.ehNegativo(-5);
    const dentroIntervalo = validacao.estaNoIntervalo(5, 1, 10);
    const foraIntervalo = validacao.estaNoIntervalo(15, 1, 10);
    const multiplo = validacao.ehMultiploDe(10, 5);
    const acaoDivisorZero = () => validacao.ehMultiploDe(10, 0);
    const potenciaDeDois = validacao.ehPotenciaDeDois(16);
    const naoPotenciaDeDois = validacao.ehPotenciaDeDois(18);

    
    expect(inteiroValido).toBe(true);
    expect(inteiroInvalido).toBe(false);
    expect(positivo).toBe(true);
    expect(negativo).toBe(true);
    expect(dentroIntervalo).toBe(true);
    expect(foraIntervalo).toBe(false);
    expect(multiplo).toBe(true);
    expect(acaoDivisorZero).toThrow("Divisor não pode ser zero");
    expect(potenciaDeDois).toBe(true);
    expect(naoPotenciaDeDois).toBe(false);
  });

  test("deve validar strings e arrays", () => {
    
    const validacao = new Validacao();

    
    const stringVazia = validacao.ehStringVazia("   ");
    const stringPreenchida = validacao.ehStringVazia("oi");
    const arrayVazio = validacao.ehArrayVazio([]);
    const arrayPreenchido = validacao.ehArrayVazio([1]);
    const apenasNumeros = validacao.contemApenasNumeros("12345");
    const naoApenasNumeros = validacao.contemApenasNumeros("123a5");
    const corValida = validacao.ehCorHexValida("#FF00FF");
    const corInvalida = validacao.ehCorHexValida("FF00FF");
    const jsonValido = validacao.ehJsonValido('{"a":1}');
    const jsonInvalido = validacao.ehJsonValido("{a:1}");
    const cpfValido = validacao.ehCpfFormatoValido("123.456.789-00");
    const cpfInvalido = validacao.ehCpfFormatoValido("123");

    expect(stringVazia).toBe(true);
    expect(stringPreenchida).toBe(false);
    expect(arrayVazio).toBe(true);
    expect(arrayPreenchido).toBe(false);
    expect(apenasNumeros).toBe(true);
    expect(naoApenasNumeros).toBe(false);
    expect(corValida).toBe(true);
    expect(corInvalida).toBe(false);
    expect(jsonValido).toBe(true);
    expect(jsonInvalido).toBe(false);
    expect(cpfValido).toBe(true);
    expect(cpfInvalido).toBe(false);
  });

  test("deve validar datas", () => {
  
    const validacao = new Validacao();


    const dataValida = validacao.ehDataValida("2024-01-01");
    const dataInvalida = validacao.ehDataValida("data-invalida");
    const dataFutura = validacao.ehDataFutura("3000-01-01");
    const dataNaoFutura = validacao.ehDataFutura("2000-01-01");
    const dataPassada = validacao.ehDataPassada("2000-01-01");
    const dataNaoPassada = validacao.ehDataPassada("3000-01-01");

    
    expect(dataValida).toBe(true);
    expect(dataInvalida).toBe(false);
    expect(dataFutura).toBe(true);
    expect(dataNaoFutura).toBe(false);
    expect(dataPassada).toBe(true);
    expect(dataNaoPassada).toBe(false);
  });
});
