"use strict";

import { arrayUtilities } from "necessary";
import { specialSymbols } from "occam-lexers";
import { parserUtilities } from "occam-parsers";
import { eliminateLeftRecursion } from "occam-grammar-utilities";

import defaultCustomGrammar from "../customGrammar/default";

import { expressionsFromVocabulary } from "../utilities/vocabulary";
import { VERTICAL_BAR, VERTICAL_SPACE } from "../constants";
import { validateBNF, validateVocabulary } from "../utilities/validate";
import { TERM_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";
import { TYPE_VOCABULARY_NAME, SYMBOL_VOCABULARY_NAME } from "../vocabularyNames";

const { opaque  } = specialSymbols,
      { rulesFromBNF } = parserUtilities,
      { unshift, forwardsForEach, backwardsForEach } = arrayUtilities;

export default class CombinedCustomGrammar {
  constructor(rules, entries) {
    this.rules = rules;
    this.entries = entries;
  }
  
  getRules() {
    return this.rules;
  }

  getEntries() {
    return this.entries;
  }

  postProcess(rules) {
    rules = [ ///
      ...rules,
      ...this.rules
    ];

    rules = eliminateLeftRecursion(rules);  ///

    return rules;
  }

  static fromNothing(includeDefault = true) {
    let customGrammars = [];

    if (includeDefault) {
      customGrammars = [ defaultCustomGrammar, ...customGrammars ]; ///
    }

    const rules = rulesFromCustomGrammars(customGrammars),
          entries = entriesFromCustomGrammars(customGrammars),
          combinedCustomGrammar = new CombinedCustomGrammar(rules, entries);

    return combinedCustomGrammar;
  }

  static fromCustomGrammars(customGrammars, includeDefault = true) {
    if (includeDefault) {
      customGrammars = [ defaultCustomGrammar, ...customGrammars ]; ///
    }

    const rules = rulesFromCustomGrammars(customGrammars),
          entries = entriesFromCustomGrammars(customGrammars),
          combinedCustomGrammar = new CombinedCustomGrammar(rules, entries);
    
    return combinedCustomGrammar;
  }
}

function rulesFromCustomGrammars(customGrammars) {
  const ruleNames = [
          TERM_RULE_NAME,
          STATEMENT_RULE_NAME,
        ],
        bnfs = ruleNames.map((ruleName) => {
          const bnf = bnfFromCustomGrammars(customGrammars, ruleName);

          return bnf;
        }),
        bnf = bnfs.join(VERTICAL_SPACE),
        rules = rulesFromBNF(bnf);

  combineRules(rules);

  const opacity = opaque; ///

  ruleNames.forEach((ruleName) => {
    const rule = rules.find((rule) => {
      const name = rule.getName();

      if (name === ruleName) {
        return true;
      }
    });

    rule.setOpacity(opacity);
  });

  return rules;
}

function entriesFromCustomGrammars(customGrammars) {
  const vocabularyNames = [
          TYPE_VOCABULARY_NAME,
          SYMBOL_VOCABULARY_NAME
        ],
        entries = vocabularyNames.map((vocabularyName) => {
          const entry = entryFromCustomGrammars(customGrammars, vocabularyName);

          return entry;
        });

  return entries;
}

function entryFromCustomGrammars(customGrammars, vocabularyName) {
  const expressions = [];

  backwardsForEach(customGrammars, (customGrammar) => {
    const vocabulary = customGrammar.getVocabulary(vocabularyName),
          customGrammarDefaultCustomGrammar = customGrammar.isDefaultCustomGrammar();

    if (!customGrammarDefaultCustomGrammar) {
      validateVocabulary(vocabulary);
    }

    expressionsFromVocabulary(vocabulary, expressions);
  });

  const pattern = expressions.join(VERTICAL_BAR),
        entryName = vocabularyName,  ///
        entryValue = `^(?:${pattern})`,
        entry = {
          [entryName]: entryValue
        };

  return entry;
}

function bnfFromCustomGrammars(customGrammars, ruleName) {
  const bnfs = [];

  forwardsForEach(customGrammars, (customGrammar) => {
    const bnf = customGrammar.getBNF(ruleName),
          customGrammarDefaultCustomGrammar = customGrammar.isDefaultCustomGrammar();

    if (!customGrammarDefaultCustomGrammar) {
      validateBNF(bnf, ruleName);
    }

    bnfs.push(bnf);
  });

  const bnf = bnfs.join(VERTICAL_SPACE);

  return bnf;
}

function combineRules(rules) {
  let outerIndex = 0,
      length = rules.length;

  while (outerIndex < length) {
    const outerRule = rules[outerIndex],
          outerRuleName = outerRule.getName();

    let innerIndex = outerIndex + 1;

    while (innerIndex < length) {
      const innerRule = rules[innerIndex],
            innerRuleName = innerRule.getName();

      if (innerRuleName === outerRuleName) {
        const innerRuleDefinitions = innerRule.getDefinitions(),
              outerRuleDefinitions = outerRule.getDefinitions();

        unshift(outerRuleDefinitions, innerRuleDefinitions);

        const start = innerIndex, ///
              deleteCount = 1;

        rules.splice(start, deleteCount);

        length = rules.length;
      } else {
        innerIndex++;
      }
    }

    outerIndex++;

    length = rules.length;
  }
}
