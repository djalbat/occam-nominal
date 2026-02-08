"use strict";

import { NominalParser } from "occam-grammars";
import { parsersUtilities } from "occam-custom-grammars";

const { parserFromNothing,
        parserFromStartRuleName,
        parserFromCombinedCustomGrammar,
        parserFromBNFAndCombinedCustomGrammar,
        parserFromStartRuleNameAndCombinedCustomGrammar,
        parserFromBNFStartRuleNameAndCombinedCustomGrammar } = parsersUtilities;

export function nominalParserFromNothing(Class) {
  if (Class === undefined) {
    Class = NominalParser;  ///
  }

  const parser = parserFromNothing(Class),
        nominalParser = parser; ///

  return nominalParser;
}

export function nominalParserFromStartRuleName(Class, startRuleName) {
  if (startRuleName === undefined) {
    startRuleName = Class;  ///

    Class = NominalParser;  ///
  }

  const parser =  parserFromStartRuleName(Class, startRuleName),
        nominalParser = parser; ///

  return nominalParser;
}

export function nominalParserFromCombinedCustomGrammar(Class, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = Class;  ///

    Class = NominalParser;  ///
  }

  const parser = parserFromCombinedCustomGrammar(Class, combinedCustomGrammar),
        nominalParser = parser; ///

  return nominalParser;
}

export function nominalParserFromBNFAndCombinedCustomGrammar(Class, bnf, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = bnf;  ///

    bnf = Class;  ///

    Class = NominalParser;  ///
  }

  const parser = parserFromBNFAndCombinedCustomGrammar(Class, bnf, combinedCustomGrammar),
        nominalParser = parser; ///

  return nominalParser;
}

export function nominalParserFromStartRuleNameAndCombinedCustomGrammar(Class, startRuleName, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = startRuleName;  ///

    startRuleName = Class;  ///

    Class = NominalParser;  ///
  }

  const parser = parserFromStartRuleNameAndCombinedCustomGrammar(Class, startRuleName, combinedCustomGrammar),
        nominalParser = parser; ///

  return nominalParser;
}

export function nominalParserFromBNFStartRuleNameAndCombinedCustomGrammar(Class, bnf, startRuleName, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = startRuleName;  ///

    startRuleName = bnf;  ///

    bnf = Class;  ///

    Class = NominalParser;  ///
  }

  const parser = parserFromBNFStartRuleNameAndCombinedCustomGrammar(Class, bnf, startRuleName, combinedCustomGrammar),
        nominalParser = parser; ///

  return nominalParser;
}

export default {
  nominalParserFromNothing,
  nominalParserFromStartRuleName,
  nominalParserFromCombinedCustomGrammar,
  nominalParserFromBNFAndCombinedCustomGrammar,
  nominalParserFromStartRuleNameAndCombinedCustomGrammar,
  nominalParserFromBNFStartRuleNameAndCombinedCustomGrammar
};
