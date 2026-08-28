"use strict";

import { NonTerminalNode } from "occam-languages";

import { LINK_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";

export default class AssumptionNode extends NonTerminalNode {
  getLinkNode() {
    const ruleName = LINK_RULE_NAME,
          linkNode = this.getNodeByRuleName(ruleName);

    return linkNode;
  }

  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(AssumptionNode, ruleName, childNodes, opacity, precedence); }
}
