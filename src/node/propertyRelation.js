"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME, PROPERTY_RULE_NAME } from "../ruleNames";

export default class PropertyRelationNode extends NonTerminalNode {
  getPropertyName() {
    const propertyNode = this.getPropertyNode(),
          propertyName = propertyNode.getPropertyName();

    return propertyName;
  }

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

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyRelationNode, ruleName, childNodes, opacity, precedence); }
}
