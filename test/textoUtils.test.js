const TextoUtils = require('../src/textoUtils');
beforeEach(() => { textoUtils = new TextoUtils()});

test("Verifica se a palavra é um palindromo", () => {
    expect(textoUtils.ehPalindromo("arara")).toStrictEqual(true);
});

test("Verifica se inicia com maiuscula e o restante é minuscula", () => {
    expect(textoUtils.capitalizar("aLEXANDRE")).toStrictEqual("Alexandre")
})

test("Conta quantas vezes a letra aparece na palavra", () => {
    expect(textoUtils.contarOcorrencias("paralelepipedo", "p")).toStrictEqual(3)
})

test("Verifica se o texto está sem espaços", () => {
    expect(textoUtils.removerEspacosExtras("Senhoras     e      senhores")).toStrictEqual("Senhoras e senhores")
})


test("Verifica se a string é um slug", () => {
    expect(textoUtils.paraSlug("Boa tarde pessoal")).toStrictEqual("boa-tarde-pessoal")
})

test("Verifica se o tamanho do texto e negativo", () => {
    expect(() => textoUtils.truncar("", -2)).toThrow("O tamanho não pode ser negativo")
})

test("Conta as palavras do texto", () => {
    expect(textoUtils.contarPalavras("Alexandre Tibes da Silva")).toStrictEqual(4)
})

test("Testa se existem somente letras", () => {
    expect(textoUtils.somenteLetras("123a456b")).toStrictEqual(false)
})

test("Substitui todas as ocorrências de uma substring", () => {
    expect(textoUtils.substituirTudo("gato gato gato", "gato", "cachorro")).toStrictEqual("cachorro cachorro cachorro")
})

test("Verifica se lança erro quando o alvo é vazio", () => {
    expect(() => textoUtils.substituirTudo("gato gato gato", "", "cachorro")).toThrow("O alvo não pode ser vazio")
})

// Testes adicionados para matar os mutantes sobreviventes do Stryker
describe("textoUtils - mutation tests", () => {
    test("Inverte o texto", () => {
        expect(textoUtils.inverter("abc")).toStrictEqual("cba")
    })

    test("Palindromo ignora pontuacao e caixa, e rejeita texto comum", () => {
        expect(textoUtils.ehPalindromo("A, b a!")).toStrictEqual(true)
        expect(textoUtils.ehPalindromo("abc")).toStrictEqual(false)
    })

    test("Capitaliza mantendo espacos duplos", () => {
        expect(textoUtils.capitalizar("ana  maria")).toStrictEqual("Ana  Maria")
    })

    test("Retorna zero quando a substring e vazia", () => {
        expect(textoUtils.contarOcorrencias("abc", "")).toStrictEqual(0)
    })

    test("Remove espacos no inicio e no fim", () => {
        expect(textoUtils.removerEspacosExtras("  a  b  ")).toStrictEqual("a b")
    })

    test("Gera slug removendo acentos, pontuacao e espacos repetidos", () => {
        expect(textoUtils.paraSlug("  Olá, Mundo  Novo! ")).toStrictEqual("ola-mundo-novo")
    })

    test("Trunca o texto respeitando o limite", () => {
        expect(textoUtils.truncar("abc", 0)).toStrictEqual("...")
        expect(textoUtils.truncar("abcdef", 3)).toStrictEqual("abc...")
        expect(textoUtils.truncar("abc", 3)).toStrictEqual("abc")
        expect(textoUtils.truncar("abc", 5)).toStrictEqual("abc")
    })

    test("Conta palavras com espacos extras e texto vazio", () => {
        expect(textoUtils.contarPalavras("  um   dois  ")).toStrictEqual(2)
        expect(textoUtils.contarPalavras("")).toStrictEqual(0)
    })

    test("Aceita somente letras, inclusive acentuadas", () => {
        expect(textoUtils.somenteLetras("José")).toStrictEqual(true)
        expect(textoUtils.somenteLetras("ab")).toStrictEqual(true)
        expect(textoUtils.somenteLetras("abc1")).toStrictEqual(false)
        expect(textoUtils.somenteLetras("1abc")).toStrictEqual(false)
    })
})
