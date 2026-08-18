"use strict";

import withStyle from "easy-with-style";  ///

import { Input } from "easy";

class RuleNameInput extends Input {
  getRuleName() {
    const value = this.getValue(),
          ruleName = value; ///

    return ruleName;
  }

  setRuleName(ruleName) {
    const value = ruleName; ///

    this.setValue(value);
  }

  parentContext() {
    const getRuleName = this.getRuleName.bind(this),
          setRuleName = this.setRuleName.bind(this);

    return ({
      getRuleName,
      setRuleName
    });
  }

  static defaultProperties = {
    className: "rule-name",
    spellCheck: "false"
  };
}

export default withStyle(RuleNameInput)`

  border: 1px solid darkgrey;
  padding: 0.25rem;
  font-size: 1.2rem;
  font-family: monospace;
  
`;
