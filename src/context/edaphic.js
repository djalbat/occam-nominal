"use strict";

import { Context, nominalUtilities } from "occam-languages";

import NominalLexer from "../nominal/lexer";
import NominalParser from "../nominal/parser";

import { baseTypeFromNothing } from "../utilities/type";
import { findMetaTypeByMetaTypeName } from "../metaTypes";

const { nominalLexerFromNothing, nominalParserFromNothing } = nominalUtilities;

const nominalLexer = nominalLexerFromNothing(NominalLexer),
      nominalParser = nominalParserFromNothing(NominalParser); ///

let baseType = null;

export default class EdaphicContext extends Context {
  constructor(context, lexer, parser) {
    super(context);

    this.lexer = lexer;
    this.parser = parser;
  }

  getLexer() {
    return this.lexer;
  }

  getParser() {
    return this.parser;
  }

  findMetaTypeByMetaTypeName(metaTypeName) { return findMetaTypeByMetaTypeName(metaTypeName); }

  static fromNothing() {
    const context = null,
          lexer = nominalLexer, ///
          parser = nominalParser, ///
          edapicContext = Context.fromNothing(EdaphicContext, lexer, parser, context);

    return edapicContext;
  }
}
