const Validador = require("../src/validador");

describe("validador", () => {
  test("deve validar e-mail, senha e idade", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const emailValido = validador.ehEmailValido("teste@exemplo.com");
    const emailInvalido = validador.ehEmailValido("teste@exemplo");
    const senhaForte = validador.ehSenhaForte("Abcdef1!");
    const senhaFraca = validador.ehSenhaForte("abcdefgh");
    const maiorIdade = validador.ehMaiorDeIdade(18);
    const menorIdade = validador.ehMaiorDeIdade(17);

    // Assert
    expect(emailValido).toBe(true);
    expect(emailInvalido).toBe(false);
    expect(senhaForte).toBe(true);
    expect(senhaFraca).toBe(false);
    expect(maiorIdade).toBe(true);
    expect(menorIdade).toBe(false);
  });

  test("deve validar cep, telefone e url", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const cepValido = validador.ehCepValido("12345-678");
    const cepInvalido = validador.ehCepValido("123");
    const telefoneValido = validador.ehTelefoneValido("(11) 91234-5678");
    const telefoneInvalido = validador.ehTelefoneValido("abc");
    const urlValida = validador.ehUrlValida("https://exemplo.com");
    const urlInvalida = validador.ehUrlValida("nao-e-url");

    // Assert
    expect(cepValido).toBe(true);
    expect(cepInvalido).toBe(false);
    expect(telefoneValido).toBe(true);
    expect(telefoneInvalido).toBe(false);
    expect(urlValida).toBe(true);
    expect(urlInvalida).toBe(false);
  });

  test("deve validar numeros e intervalos", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const inteiroValido = validador.ehInteiro(10);
    const inteiroInvalido = validador.ehInteiro(10.5);
    const positivo = validador.ehPositivo(5);
    const negativo = validador.ehNegativo(-5);
    const dentroIntervalo = validador.estaNoIntervalo(5, 1, 10);
    const foraIntervalo = validador.estaNoIntervalo(15, 1, 10);
    const multiplo = validador.ehMultiploDe(10, 5);
    const acaoDivisorZero = () => validador.ehMultiploDe(10, 0);
    const potenciaDeDois = validador.ehPotenciaDeDois(16);
    const naoPotenciaDeDois = validador.ehPotenciaDeDois(18);

    // Assert
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
    // Arrange
    const validador = new Validador();

    // Act
    const stringVazia = validador.ehStringVazia("   ");
    const stringPreenchida = validador.ehStringVazia("oi");
    const arrayVazio = validador.ehArrayVazio([]);
    const arrayPreenchido = validador.ehArrayVazio([1]);
    const apenasNumeros = validador.contemApenasNumeros("12345");
    const naoApenasNumeros = validador.contemApenasNumeros("123a5");
    const corValida = validador.ehCorHexValida("#FF00FF");
    const corInvalida = validador.ehCorHexValida("FF00FF");
    const jsonValido = validador.ehJsonValido('{"a":1}');
    const jsonInvalido = validador.ehJsonValido("{a:1}");
    const cpfValido = validador.ehCpfFormatoValido("123.456.789-00");
    const cpfInvalido = validador.ehCpfFormatoValido("123");

    // Assert
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
    // Arrange
    const validador = new Validador();

    // Act
    const dataValida = validador.ehDataValida("2024-01-01");
    const dataInvalida = validador.ehDataValida("data-invalida");
    const dataFutura = validador.ehDataFutura("3000-01-01");
    const dataNaoFutura = validador.ehDataFutura("2000-01-01");
    const dataPassada = validador.ehDataPassada("2000-01-01");
    const dataNaoPassada = validador.ehDataPassada("3000-01-01");

    // Assert
    expect(dataValida).toBe(true);
    expect(dataInvalida).toBe(false);
    expect(dataFutura).toBe(true);
    expect(dataNaoFutura).toBe(false);
    expect(dataPassada).toBe(true);
    expect(dataNaoPassada).toBe(false);
  });
});
