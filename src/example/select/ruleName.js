"use strict";

import Select from "../select";

import { TERM_RULE_NAME, STATEMENT_RULE_NAME }  from "../../ruleNames";

export default class RuleNameSelect extends Select {
  getRuleName() {
    const value = this.getValue(),
          ruleName = value; ///

    return ruleName;
  }

  childElements() {
    const ruleNames = [
            TERM_RULE_NAME,
            STATEMENT_RULE_NAME
          ],
          options = ruleNames.map((ruleName, index) => {
            const value = ruleName,
                  selected = (index === 2);

            return (

              <option value={value} selected={selected} >
                {ruleName}
              </option>

            );
          }),
          childElements = [
            ...options
          ];

    return childElements;
  }

  parentContext() {
    const getRuleName = this.getRuleName.bind(this); ///

    return ({
      getRuleName
    });
  }

  static defaultProperties = {
    className: "rule-name",
    spellCheck: "false"
  }
}
