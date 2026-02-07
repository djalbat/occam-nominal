"use strict";

import withStyle from "easy-with-style";  ///

import Textarea from "../textarea";

import { EMPTY_STRING } from "../../constants";

class NominalBNFTextarea extends Textarea {
  getNominalBNF() {
    const value = this.getValue(),
          nominalBNF = value; ///

    return nominalBNF;
  }

  setNominalBNF(nominalBNF) {
    const value = nominalBNF;  ///

    this.setValue(value);
  }

  clearNominalBNF() {
    const value = EMPTY_STRING;

    this.setValue(value);
  }

  parentContext() {
    const getNominalBNF = this.getNominalBNF.bind(this),
          setNominalBNF = this.setNominalBNF.bind(this),
          clearNominalBNF = this.clearNominalBNF.bind(this);

    return ({
      getNominalBNF,
      setNominalBNF,
      clearNominalBNF
    });
  }

  static defaultProperties = {
    className: "nominal-bnf",
    spellCheck: "false"
  };
}

export default withStyle(NominalBNFTextarea)`

  height: 48rem;
  
`;
