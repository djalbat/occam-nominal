"use strict";

import { NominalLexer } from "occam-grammars";
import { lexersUtilities } from "occam-custom-grammars";

const { lexerFromNothing, lexerFromCombinedCustomGrammar, lexerFromEntriesAndCombinedCustomGrammar } = lexersUtilities;

export function nominalLexerFromNothing(Class) {
  if (Class === undefined) {
    Class = NominalLexer; ///
  }

  const lexer = lexerFromNothing(Class),
        nominalLexer = lexer; ///

  return nominalLexer;
}

export function nominalLexerFromCombinedCustomGrammar(Class, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = Class;  ///

    Class = NominalLexer; ///
  }

  const lexer = lexerFromCombinedCustomGrammar(Class, combinedCustomGrammar),
        nominalLexer = lexer; ///

  return nominalLexer;
}

export function nominalLexerFromEntriesAndCombinedCustomGrammar(Class, entries, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = entries;  ///

    entries = Class;  ///

    Class = NominalLexer; ///
  }

  const lexer = lexerFromEntriesAndCombinedCustomGrammar(Class, entries, combinedCustomGrammar),
        nominalLexer = lexer; ///

  return nominalLexer;
}

export default {
  nominalLexerFromNothing,
  nominalLexerFromCombinedCustomGrammar,
  nominalLexerFromEntriesAndCombinedCustomGrammar
};
