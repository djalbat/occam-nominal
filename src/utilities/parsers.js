"use strict";

import { NominalParser } from "occam-grammars";
import { parserUtilities } from "occam-parsers";

import CombinedCustomGrammar from "../customGrammar/combined";

const { rulesFromBNF, parserFromRules, parserFromRulesAndStartRuleName } = parserUtilities;

export function nominalParserFromNothing(Class) {
  if (Class === undefined) {
    Class = NominalParser;  ///
  }

  const { bnf } = Class,
        combinedCustomGrammar = CombinedCustomGrammar.fromNothing(),
        rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRules(Class, rules);

  return nominalParser;
}

export function nominalParserFromStartRuleName(Class, startRuleName) {
  if (startRuleName === undefined) {
    startRuleName = Class;  ///

    Class = NominalParser;  ///
  }

  const { bnf } = Class,
        combinedCustomGrammar = CombinedCustomGrammar.fromNothing(),
        rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRulesAndStartRuleName(Class, rules, startRuleName);

  return nominalParser;
}

export function nominalParserFromCombinedCustomGrammar(Class, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = Class;  ///

    Class = NominalParser;  ///
  }

  const { bnf } = Class,
        rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRules(Class, rules);

  return nominalParser;
}

export function nominalParserFromBNFAndCombinedCustomGrammar(Class, bnf, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = bnf;  ///

    bnf = Class;  ///

    Class = NominalParser;  ///
  }

  const rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRules(Class, rules);

  return nominalParser;
}

export function nominalParserFromStartRuleNameAndCombinedCustomGrammar(Class, startRuleName, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = startRuleName;  ///

    startRuleName = Class;  ///

    Class = NominalParser;  ///
  }

  const { bnf } = Class,
        rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRulesAndStartRuleName(Class, rules, startRuleName);

  return nominalParser;
}

export function nominalParserFromBNFStartRuleNameAndCombinedCustomGrammar(Class, bnf, startRuleName, combinedCustomGrammar) {
  if (combinedCustomGrammar === undefined) {
    combinedCustomGrammar = startRuleName;  ///

    startRuleName = bnf;  ///

    bnf = Class;  ///

    Class = NominalParser;  ///
  }

  const rules = rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar),
        nominalParser = parserFromRulesAndStartRuleName(Class, rules, startRuleName);

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

function rulesFromBNFAndCombinedCustomGrammar(bnf, combinedCustomGrammar) {
  let rules = rulesFromBNF(bnf);

  rules = combinedCustomGrammar.postProcess(rules);

  return rules;
}
