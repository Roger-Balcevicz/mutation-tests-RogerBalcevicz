const TextoUtils = require('../src/textoUtils');

describe('TextoUtils', () => {
    test('deve inverter uma string', () => {
        expect(new TextoUtils().inverter('abc')).toBe('cba');
    });

    test('Verifica se uma string é um palíndromo', () => {
        expect(new TextoUtils().ehPalindromo('A man a plan a canal Panama')).toBe(true);
    });

    test('Deixa a primeira letra de cada palavra maiúscula', () => {
        expect(new TextoUtils().capitalizar('ola mundo')).toBe('Ola Mundo');
    });

    test('Conta quantas vezes uma substring aparece no texto', () => {
        expect(new TextoUtils().contarOcorrencias('banana', 'a')).toBe(3);
    });

    test('Remove espaços em branco extras', () => {
        expect(new TextoUtils().removerEspacosExtras('  Olá   mundo  ')).toBe('Olá mundo');
    });
});
