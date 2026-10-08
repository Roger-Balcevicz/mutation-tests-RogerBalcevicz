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

  // Testes adicionados para matar os mutantes sobreviventes do Stryker
  describe("mutation tests", () => {
    const validacao = new Validacao();

    afterEach(() => jest.restoreAllMocks());

    test("deve rejeitar e-mail com texto antes ou depois", () => {
      expect(validacao.ehEmailValido("a b@exemplo.com")).toBe(false);
      expect(validacao.ehEmailValido("a@exemplo.com b")).toBe(false);
    });

    test("deve exigir todos os requisitos da senha forte", () => {
      expect(validacao.ehSenhaForte("Ab1!")).toBe(false);
      expect(validacao.ehSenhaForte("abcdef1!")).toBe(false);
      expect(validacao.ehSenhaForte("ABCDEF1!")).toBe(false);
      expect(validacao.ehSenhaForte("Abcdefg!")).toBe(false);
      expect(validacao.ehSenhaForte("Abcdefg1")).toBe(false);
    });

    test("deve validar CEP com e sem hifen", () => {
      expect(validacao.ehCepValido("12345678")).toBe(true);
      expect(validacao.ehCepValido("12345-6789")).toBe(false);
      expect(validacao.ehCepValido("012345-678")).toBe(false);
    });

    test("deve validar telefone sem mascara e rejeitar sobras", () => {
      expect(validacao.ehTelefoneValido("11912345678")).toBe(true);
      expect(validacao.ehTelefoneValido("(11) 91234-56789")).toBe(false);
      expect(validacao.ehTelefoneValido("a(11) 91234-5678")).toBe(false);
    });

    test("deve tratar zero nos limites de positivo e negativo", () => {
      expect(validacao.ehPositivo(0)).toBe(false);
      expect(validacao.ehPositivo(-1)).toBe(false);
      expect(validacao.ehNegativo(0)).toBe(false);
      expect(validacao.ehNegativo(5)).toBe(false);
    });

    test("deve incluir os extremos do intervalo", () => {
      expect(validacao.estaNoIntervalo(1, 1, 10)).toBe(true);
      expect(validacao.estaNoIntervalo(10, 1, 10)).toBe(true);
      expect(validacao.estaNoIntervalo(0, 1, 10)).toBe(false);
    });

    test("deve considerar a data atual nem futura nem passada", () => {
      const agora = "2024-01-01T00:00:00.000Z";
      jest.spyOn(Date, "now").mockReturnValue(new Date(agora).getTime());

      expect(validacao.ehDataFutura(agora)).toBe(false);
      expect(validacao.ehDataPassada(agora)).toBe(false);
    });

    test("deve identificar numero que nao e multiplo", () => {
      expect(validacao.ehMultiploDe(10, 3)).toBe(false);
    });

    test("deve rejeitar zero e decimais como potencia de dois", () => {
      expect(validacao.ehPotenciaDeDois(1)).toBe(true);
      expect(validacao.ehPotenciaDeDois(0)).toBe(false);
      expect(validacao.ehPotenciaDeDois(2.5)).toBe(false);
    });

    test("deve validar cor hexadecimal curta e rejeitar sobras", () => {
      expect(validacao.ehCorHexValida("#FFF")).toBe(true);
      expect(validacao.ehCorHexValida("#F")).toBe(false);
      expect(validacao.ehCorHexValida("#FF00FF0")).toBe(false);
      expect(validacao.ehCorHexValida("x#FFF")).toBe(false);
    });

    test("deve validar CPF sem mascara e rejeitar sobras", () => {
      expect(validacao.ehCpfFormatoValido("12345678900")).toBe(true);
      expect(validacao.ehCpfFormatoValido("a123.456.789-00")).toBe(false);
      expect(validacao.ehCpfFormatoValido("123.456.789-001")).toBe(false);
    });
  });
});
