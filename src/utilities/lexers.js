"use strict";

import { NominalLexer } from "occam-grammars";
import { lexerUtilities } from "occam-lexers";

import CombinedCustomGrammar from "../customGrammar/combined";

const { lexerFromRules, rulesFromEntries } = lexerUtilities;

export function nominalLexerFromNothing(Class) {
  if (Class === undefined) {
    Class = NominalLexer; ///
  }

  const { entries } = Class,
        combinedCustomGrammar = CombinedCustomGrammar.fromNothing(),
        rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar),
        nominalLexer = lexerFromRules(Class, rules);

  return nominalLexer;
}

export function nominalLexerFromCombinedCustomGrammar(Class, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = Class;  ///

    Class = NominalLexer; ///
  }

  const { entries } = Class,
        rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar),
        nominalLexer = lexerFromRules(Class, rules);

  return nominalLexer;
}

export function nominalLexerFromEntriesAndCombinedCustomGrammar(Class, entries, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = entries;  ///

    entries = Class;  ///

    Class = NominalLexer; ///
  }

  const rules = rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar),
        nominalLexer = lexerFromRules(Class, rules);

  return nominalLexer;
}

export default {
  nominalLexerFromNothing,
  nominalLexerFromCombinedCustomGrammar,
  nominalLexerFromEntriesAndCombinedCustomGrammar
};

function rulesFromEntriesAndCombinedCustomGrammar(entries, combinedCustomGrammar) {
  const customGrammarEntries = combinedCustomGrammar.getEntries();

  entries = [ ///
    ...customGrammarEntries,
    ...entries
  ];

  const rules = rulesFromEntries(entries);

  return rules;
}
