"use strict";

import SubstitutionNode from "../../node/substitution";

import { STATEMENT_RULE_NAME } from "../../ruleNames";

export default class StatementSubstitutionNode extends SubstitutionNode {
  isResolved() {
    let resolved = true;

    const substitutionNode = this.getSubstitutionNode();

    if (substitutionNode !== null) {
      resolved = false;
    }

    return resolved;
  }

  getSubstitutionNode() {
    const targetStatementNode = this.getTargetStatementNode(),
      substitutionNode = targetStatementNode.getSubstitutionNode();

    return substitutionNode;
  }

  getTermSubstitutionNode() {
    const targetStatementNode = this.getTargetStatementNode(),
          termSubstitutionNode = targetStatementNode.getTermSubstitutionNode();

    return termSubstitutionNode;
  }

  getFrameSubstitutionNode() {
    const targetStatementNode = this.getTargetStatementNode(),
          frameSubstitutionNode = targetStatementNode.getFrameSubstitutionNode();

    return frameSubstitutionNode;
  }

  getTargetStatementNode() {
    const lastStatementNode = this.getLastStatementNode(),
          targetStatementNode = lastStatementNode; ///

    return targetStatementNode;
  }

  getReplacementStatementNode() {
    const firstStatementNode = this.getFirstStatementNode(),
          replacementStatementNode = firstStatementNode; ///

    return replacementStatementNode;
  }

  getLastStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          lastStatementNode = this.getLastNodeByRuleName(ruleName);

    return lastStatementNode;
  }

  getFirstStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          firstStatementNode = this.getFirstNodeByRuleName(ruleName);

    return firstStatementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return SubstitutionNode.fromRuleNameChildNodesOpacityAndPrecedence(StatementSubstitutionNode, ruleName, childNodes, opacity, precedence); }
}
