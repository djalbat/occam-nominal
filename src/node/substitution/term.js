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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return SubstitutionNode.fromRuleNameChildNodesPrecedenceAndOpacity(TermSubstitutionNode, ruleName, childNodes, precedence, opacity); }
}

