"use strict";

import AssertionNode from "../../node/assertion";

import { TERM_RULE_NAME, PROPERTY_RULE_NAME } from "../../ruleNames";

export default class PropertyAssertionNode extends AssertionNode {
  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getPropertyNode() {
    const ruleName = PROPERTY_RULE_NAME,
          propertyNode = this.getNodeByRuleName(ruleName);

    return propertyNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyAssertionNode, ruleName, childNodes, opacity, precedence); }
}
