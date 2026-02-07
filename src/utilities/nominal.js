"use strict";

import { CommonLexer } from "occam-lexers";
import { CommonParser } from "occam-parsers";
import { NominalLexer, NominalParser } from "occam-grammars";

export const nominalLexer = CommonLexer.fromNothing(NominalLexer);

export const nominalParser = CommonParser.fromNothing(NominalParser);
