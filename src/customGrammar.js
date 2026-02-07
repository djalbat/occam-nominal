"use strict";

import { EMPTY_STRING } from "./constants";
import { DEFAULT_CUSTOM_GRAMMAR_NAME } from "./grammarNames";
import { TERM_RULE_NAME, STATEMENT_RULE_NAME } from "./ruleNames";
import { TYPE_VOCABULARY_NAME, SYMBOL_VOCABULARY_NAME } from "./vocabularyNames";

export default class CustomGrammar {
  constructor(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary) {
    this.name = name;
    this.termBNF = termBNF;
    this.statementBNF = statementBNF;
    this.typeVocabulary = typeVocabulary;
    this.symbolVocabulary = symbolVocabulary;
  }
  
  getName() {
    return this.name;
  }

  getTermBNF() {
    return this.termBNF;
  }

  getStatementBNF() {
    return this.statementBNF;
  }

  getTypeVocabulary() {
    return this.typeVocabulary;
  }

  getSymbolVocabulary() {
    return this.symbolVocabulary;
  }

  getBNF(ruleName) {
    let bnf;

    switch (ruleName) {
      case TERM_RULE_NAME: bnf = this.termBNF; break;
      case STATEMENT_RULE_NAME: bnf = this.statementBNF; break;
    }

    return bnf;
  }

  getVocabulary(vocabularyName) {
    let vocabulary;

    switch (vocabularyName) {
      case TYPE_VOCABULARY_NAME: vocabulary = this.typeVocabulary; break;
      case SYMBOL_VOCABULARY_NAME: vocabulary = this.symbolVocabulary; break;
    }

    return vocabulary;
  }

  getVocabularies() {
    const vocabularies = [
      this.typeVocabulary,
      this.symbolVocabulary
    ];

    return vocabularies;
  }

  isDefaultCustomGrammar() {
    const defaultCustomGrammar = (this.name === DEFAULT_CUSTOM_GRAMMAR_NAME);

    return defaultCustomGrammar;
  }

  setName(name) {
    this.name = name;
  }

  setBNF(ruleName, bnf) {
    switch (ruleName) {
      case TERM_RULE_NAME:
        this.termBNF = bnf;

        break;

      case STATEMENT_RULE_NAME:
        this.statementBNF = bnf;

        break;
    }
  }

  setVocabulary(vocabularyName, vocabulary) {
    switch (vocabularyName) {
      case TYPE_VOCABULARY_NAME:
        this.typeVocabulary = vocabulary;

        break;

      case SYMBOL_VOCABULARY_NAME:
        this.symbolVocabulary = vocabulary;

        break;
    }
  }

  resetBNF(ruleName) {
    const bnf = EMPTY_STRING;

    this.setBNF(ruleName, bnf);
  }

  resetVocabulary(vocabularyName) {
    const vocabulary = EMPTY_STRING;

    this.setVocabulary(vocabularyName, vocabulary);
  }

  update(ruleName, bnf, vocabularyName, vocabulary) {
    this.setBNF(ruleName, bnf);

    this.setVocabulary(vocabularyName, vocabulary);
  }

  toJSON() {
    const name = this.name,
          termBNF = this.termBNF,
          statementBNF = this.statementBNF,
          typeVocabulary = this.typeVocabulary,
          symbolVocabulary = this.symbolVocabulary,
          json = {
            name,
            termBNF,
            statementBNF,
            typeVocabulary,
            symbolVocabulary
          };
    
    return json;
  }

  static fromJSON(json) {
    const { name, termBNF, statementBNF, typeVocabulary, symbolVocabulary } = json,
          customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);

    return customGrammar;
  }

  static fromName(name) {
    const termBNF = EMPTY_STRING,
          statementBNF = EMPTY_STRING,
          typeVocabulary = EMPTY_STRING,
          symbolVocabulary = EMPTY_STRING,
          customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);

    return customGrammar;
  }

  static fromNameTermBNFStatementBNFTypeVocabularyAndSymbolVocabulary(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary) {
    const customGrammar = new CustomGrammar(name, termBNF, statementBNF, typeVocabulary, symbolVocabulary);

    return customGrammar;
  }
}
