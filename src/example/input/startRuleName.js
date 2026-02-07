"use strict";

import Input from "../input";

export default class StartRuleNameInput extends Input {
  getStartRuleName() {
    const value = this.getValue(),
          startRuleName = value; ///

    return startRuleName;
  }

  setStartRuleName(startRuleName) {
    const value = startRuleName;  ///

    this.setValue(value);
  }

  parentContext() {
    const getStartRuleName = this.getStartRuleName.bind(this),
          setStartRuleName = this.setStartRuleName.bind(this);

    return ({
      getStartRuleName,
      setStartRuleName
    });
  }

  static defaultProperties = {
    className: "start-rule-name",
    spellCheck: "false"
  };
}
