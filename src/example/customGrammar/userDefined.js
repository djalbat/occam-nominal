"use strict";

import { CustomGrammar } from "../../index"; ///

import { USER_DEFINED_CUSTOM_GRAMMAR_NAME } from "../grammarNames";

const name = USER_DEFINED_CUSTOM_GRAMMAR_NAME,
      termBNF = "",
      statementBNF = "",
      typeVocabulary = "",
      symbolVocabulary = "",
      json = {
        name,
        termBNF,
        statementBNF,
        typeVocabulary,
        symbolVocabulary
      },
      userDefinedCustomGrammar = CustomGrammar.fromJSON(json);

export default userDefinedCustomGrammar;
