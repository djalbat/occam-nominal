"use strict";

import { NonTerminalNode } from "occam-languages";

import { METAVARIABLE_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";

export default class AssumptionpNode extends NonTerminalNode {
  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(AssumptionpNode, ruleName, childNodes, opacity, precedence); }
}
