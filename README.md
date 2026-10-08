# Mutation Tests com Stryker

[![Build and Tests](https://github.com/Roger-Balcevicz/mutation-tests-RogerBalcevicz/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/Roger-Balcevicz/mutation-tests-RogerBalcevicz/actions/workflows/node.js.yml)

Projeto baseado no primeiro trabalho de testes unitários ([prova01-unit-test-RogerBalcevicz](https://github.com/Roger-Balcevicz/prova01-unit-test-RogerBalcevicz)), agora avaliado com **testes de mutação** usando o [Stryker Mutator](https://stryker-mutator.io/).

## O que é teste de mutação

O Stryker altera pequenas partes do código-fonte (troca `>` por `>=`, `&&` por `||`, remove um `return`, muda uma regex etc.). Cada alteração gera um **mutante**. Depois roda os testes contra cada mutante:

- **Killed**: algum teste falhou, ou seja, os testes perceberam a mudança.
- **Survived**: todos os testes passaram mesmo com o código alterado, ou seja, falta teste.
- **No coverage**: nenhum teste executa aquele trecho.

O **mutation score** é o percentual de mutantes mortos. Diferente da cobertura de código, ele mostra se os testes realmente verificam o comportamento, e não só se passam pelas linhas.

## Como executar

1. Instale o [Node JS](https://nodejs.org/) (versão >= 20)
1. `npm install`
1. `npm test` roda os testes unitários (Jest)
1. `npm run coverage` roda os testes com cobertura
1. `npm run mutation` roda os testes de mutação (Stryker)

O relatório HTML fica em `reports/mutation/mutation.html`. No GitHub Actions o relatório é publicado como artifact (`mutation-report`) em cada execução.

A configuração está em `stryker.config.json` (runner do Jest, mutando `src/**/*.js`). O build falha se o score ficar abaixo de 90%.

## Resultados

### Antes (testes do primeiro trabalho)

| Arquivo | Score | Killed | Survived | No cov |
|---|---|---|---|---|
| anagram.js | 84,62% | 11 | 2 | 0 |
| banco.js | 96,08% | 49 | 2 | 0 |
| calculator.js | 100% | 9 | 0 | 0 |
| carro.js | 90,00% | 9 | 1 | 0 |
| cnh.js | 100% | 6 | 0 | 0 |
| contaBancaria.js | 85,51% | 118 | 16 | 4 |
| lista.js | 100% | 13 | 0 | 0 |
| pessoa.js | 100% | 4 | 0 | 0 |
| textoUtils.js | 57,89% | 44 | 22 | 10 |
| userService.js | 100% | 7 | 0 | 0 |
| utilitarios.js | 90,24% | 74 | 8 | 0 |
| validacao.js | 71,60% | 116 | 46 | 0 |
| **Total** | **80,56%** | **460** | **97** | **14** |

### Depois (com os novos testes)

| Arquivo | Score | Killed | Survived | No cov |
|---|---|---|---|---|
| anagram.js | 84,62% | 11 | 2 | 0 |
| banco.js | 100% | 51 | 0 | 0 |
| calculator.js | 100% | 9 | 0 | 0 |
| carro.js | 90,00% | 9 | 1 | 0 |
| cnh.js | 100% | 6 | 0 | 0 |
| contaBancaria.js | 100% | 138 | 0 | 0 |
| lista.js | 100% | 13 | 0 | 0 |
| pessoa.js | 100% | 4 | 0 | 0 |
| textoUtils.js | 97,37% | 74 | 2 | 0 |
| userService.js | 100% | 7 | 0 | 0 |
| utilitarios.js | 98,78% | 81 | 1 | 0 |
| validacao.js | 100% | 162 | 0 | 0 |
| **Total** | **98,95%** | **565** | **6** | **0** |

Os testes unitários passaram de 60 para 92.

### O que os mutantes mostraram

Os testes do primeiro trabalho tinham boa cobertura de linhas, mas vários mutantes sobreviviam:

- **Valores de fronteira**: nada testava o limite exato (`valor <= saldoDisponivel`, `numero > 0`, `estaNoIntervalo` nos extremos, sacar exatamente o saldo). Trocar `>` por `>=` passava despercebido.
- **Regex**: os testes só usavam entradas "bem comportadas". Remover `^` ou `$`, ou tornar obrigatório um caractere opcional (`-?`, `\.?`), não quebrava nada. Foram adicionados casos sem máscara e com texto sobrando antes/depois.
- **Senha forte**: só havia uma senha fraca no teste, então quase todas as condições do `&&` podiam virar `true`. Agora cada requisito tem um caso que falha só nele.
- **Métodos sem teste**: `inverter` e `truncar` (textoUtils) quase não eram executados.
- **Datas**: `ehDataFutura`/`ehDataPassada` só eram testadas com datas muito distantes. Com `Date.now` mockado dá para testar o instante exato.
- **transferir / validarConta**: os retornos antecipados não eram verificados isoladamente. Os novos testes usam `jest.spyOn` e invalidam um campo por vez.

### Mutantes equivalentes

Os 6 sobreviventes restantes são **mutantes equivalentes**: o código muda, mas o comportamento observável é o mesmo, então nenhum teste consegue matá-los.

| Arquivo | Mutação | Por que é equivalente |
|---|---|---|
| anagram.js | `toLowerCase()` → `toUpperCase()` | as duas palavras são normalizadas igual, a comparação dá o mesmo resultado |
| anagram.js | `join("")` → `join("Stryker was here!")` | o mesmo separador é usado nos dois lados, a igualdade não muda |
| carro.js | `distancia > 0` → `distancia >= 0` | somar 0 na quilometragem não altera nada |
| textoUtils.js | `split(/\s+/)` → `split(/\s/)` | as strings vazias geradas são removidas pelo `filter(Boolean)` |
| textoUtils.js | remove o `trim()` em `contarPalavras` | idem, o `filter(Boolean)` remove as pontas vazias |
| utilitarios.js | `toLowerCase()` → `toUpperCase()` no palíndromo | a string é comparada com ela mesma invertida, a caixa não importa |

## Estrutura

- `src`: código-fonte
- `test`: testes unitários (os testes novos ficam no bloco `mutation tests` de cada arquivo)
- `stryker.config.json`: configuração do Stryker
