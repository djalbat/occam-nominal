"use strict";

import CustomGrammar from "../customGrammar";
import CombinedCustomGrammar from "../customGrammar/combined";

export function combinedCustomGrammarFromJSON(json) {
  const customGrammars = customGrammarsFromJSON(json),
        includeDefault = false,
        combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars, includeDefault);

  return combinedCustomGrammar;
}

export function customGrammarFromNameAndEntries(name, entries) {
  const termBNF = entries.getTermBNF(),
        statementBNF = entries.getStatementBNF(),
        typeVocabulary = entries.getTypeVocabulary(),
        symbolVocabulary = entries.getSymbolVocabulary(),
        customGrammar = CustomGrammar.fromNameTermBNFStatementBNFTypeVocabularyAndSymbolVocabulary(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);

  return customGrammar;
}

export function combinedCustomGrammarFromNothing() {
  const customGrammars = [],
        combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars);

  return combinedCustomGrammar;
}

export function combinedCustomGrammarFromReleaseContexts(releaseContexts) {
  const customGrammars = releaseContexts.map((releaseContext) => {
    const customGrammar = releaseContext.getCustomGrammar();

    return customGrammar;
  });

  customGrammars.reverse(); ///

  const combinedCustomGrammar = CombinedCustomGrammar.fromCustomGrammars(customGrammars);

  return combinedCustomGrammar;
}

export default {
  combinedCustomGrammarFromJSON,
  customGrammarFromNameAndEntries,
  combinedCustomGrammarFromNothing,
  combinedCustomGrammarFromReleaseContexts
};

function customGrammarsFromJSON(json) {
  const customGrammarsJSON = json,  ///
        customGrammars = customGrammarsJSON.map((customGrammarsJSON) => {
          const json = customGrammarsJSON,  ///
                customGrammar = CustomGrammar.fromJSON(json);

          return customGrammar;
        });

  return customGrammars;
}
