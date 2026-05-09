"use strict";

import SubstitutionNode from "../../node/substitution";

import { REFERENCE_RULE_NAME } from "../../ruleNames";

export default class ReferenceSubstitutionNode extends SubstitutionNode {
  getTargetReferenceNode() {
    const lastReferenceNode = this.getLastReferenceNode(),
          targetReferenceNode = lastReferenceNode; ///

    return targetReferenceNode;
  }

  getReplacementReferenceNode() {
    const firstReferenceNode = this.getFirstReferenceNode(),
          replacementReferenceNode = firstReferenceNode; ///

    return replacementReferenceNode;
  }

  getLastReferenceNode() {
    const ruleName = REFERENCE_RULE_NAME,
          lastReferenceNode = this.getLastNodeByRuleName(ruleName);

    return lastReferenceNode;
  }

  getFirstReferenceNode() {
    const ruleName = REFERENCE_RULE_NAME,
          firstReferenceNode = this.getFirstNodeByRuleName(ruleName);

    return firstReferenceNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return SubstitutionNode.fromRuleNameChildNodesOpacityAndPrecedence(ReferenceSubstitutionNode, ruleName, childNodes, opacity, precedence); }
}

