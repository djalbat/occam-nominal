"use strict";

import { NonTerminalNode } from "occam-languages";

import { STATEMENT_RULE_NAME, METAVARIABLE_RULE_NAME } from "../ruleNames";

export default class ConstraintNode extends NonTerminalNode {
  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ConstraintNode, ruleName, childNodes, precedence, opacity); }
}
