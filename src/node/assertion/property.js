"use strict";

import AssertionNode from "../../node/assertion";

import { TERM_RULE_NAME } from "../../ruleNames";

export default class PropertyAssertionNode extends AssertionNode {
  getSubjectTermNode() {
    const firstTermNode = this.getFirstTermNode(),
          subjectTermNode = firstTermNode; ///

    return subjectTermNode;
  }

  getPropertyTermNode() {
    const lastTermNode = this.getLastTermNode(),
          propertyTermNode = lastTermNode; ///

    return propertyTermNode;
  }

  getLastTermNode() {
    const ruleName = TERM_RULE_NAME,
          lastTermNode = this.getLastNodeByRuleName(ruleName);

    return lastTermNode;
  }

  getFirstTermNode() {
    const ruleName = TERM_RULE_NAME,
          firstTermNode = this.getFirstNodeByRuleName(ruleName);

    return firstTermNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(PropertyAssertionNode, ruleName, childNodes, opacity, precedence); }
}
