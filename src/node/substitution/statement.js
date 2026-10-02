"use strict";

import SubstitutionNode from "../../node/substitution";

import { STATEMENT_RULE_NAME } from "../../ruleNames";

export default class StatementSubstitutionNode extends SubstitutionNode {
  isSolved() {
    let solved = true;

    const substitutionNode = this.getSubstitutionNode();

    if (substitutionNode !== null) {
      solved = false;
    }

    return solved;
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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return SubstitutionNode.fromRuleNameChildNodesPrecedenceAndOpacity(StatementSubstitutionNode, ruleName, childNodes, precedence, opacity); }
}
