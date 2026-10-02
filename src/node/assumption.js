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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(AssumptionNode, ruleName, childNodes, precedence, opacity); }
}
