"use strict";

import SubstitutionNode from "../../node/substitution";

import { TERM_RULE_NAME } from "../../ruleNames";

export default class TermSubstitutionNode extends SubstitutionNode {
  getTargetTermNode() {
    const lastTermNode = this.getLastTermNode(),
          targetTermNode = lastTermNode; ///

    return targetTermNode;
  }

  getReplacementTermNode() {
    const firstTermNode = this.getFirstTermNode(),
          replacementTermNode = firstTermNode; ///

    return replacementTermNode;
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

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return SubstitutionNode.fromRuleNameChildNodesOpacityAndPrecedence(TermSubstitutionNode, ruleName, childNodes, opacity, precedence); }
}

