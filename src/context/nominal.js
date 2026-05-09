"use strict";

import { Context } from "occam-languages";
import { lexersUtilities, parsersUtilities } from "occam-nominal";

import NominalLexer from "../nominal/lexer";
import NominalParser from "../nominal/parser";

import { baseTypeFromNothing } from "../utilities/type";
import { findMetaTypeByMetaTypeName } from "../metaTypes";

const { nominalLexerFromNothing } = lexersUtilities,
      { nominalParserFromNothing } = parsersUtilities;

const nominalLexer = nominalLexerFromNothing(NominalLexer),
      nominalParser = nominalParserFromNothing(NominalParser); ///

let baseType = null;

export default class NominalContext extends Context {
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

  findTypeByNominalTypeName(nominalTypeName) {
    let type = null;

    if (baseType === null) {
      baseType = baseTypeFromNothing();
    }

    const comparesToNominalTypeName = baseType.compareNominalTypeName(nominalTypeName);

    if (comparesToNominalTypeName) {
      type = baseType;  ///
    }

    return type;
  }

  findMetaTypeByMetaTypeName(metaTypeName) { return findMetaTypeByMetaTypeName(metaTypeName); }

  static fromNothing() {
    const context = null,
          lexer = nominalLexer, ///
          parser = nominalParser, ///
          nominalContext = Context.fromNothing(NominalContext, lexer, parser, context);

    return nominalContext;
  }
}
