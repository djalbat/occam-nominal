"use strict";

import { arrayUtilities } from "necessary";

const { filter } = arrayUtilities;

export function rulesFromParser(parser) {
  const ruleMap = parser.getRuleMap(),
        startRule = parser.getStartRule(),
        startRuleName = startRule.getName(),
        ruleMapValues = Object.values(ruleMap),
        rules = ruleMapValues;  ///

  filter(rules, (rule) => {
    const ruleName = rule.getName();

    if (ruleName !== startRuleName) {
      return true;
    }
  });

  rules.unshift(startRule);

  return rules;
}
