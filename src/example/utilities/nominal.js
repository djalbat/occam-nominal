"use strict";

import { CommonLexer } from "occam-lexers";
import { CommonParser } from "occam-parsers";

import NominalLexer from "../../nominal/lexer";
import NominalParser from "../../nominal/parser";

export function nominalLexerFromEntries(entries) {
  const nominalLexer = CommonLexer.fromEntries(NominalLexer, entries);

  return nominalLexer;
}

export function nominalParserFromBNF(bnf) {
  const nominalParser = CommonParser.fromBNF(NominalParser, bnf);

  return nominalParser;
}
