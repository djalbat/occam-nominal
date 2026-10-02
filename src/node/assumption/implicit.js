"use strict";

import { NonTerminalNode } from "occam-languages";

import { STATEMENT_RULE_NAME } from "../../ruleNames";

export default class ImplicitAssumptionNode extends NonTerminalNode {
  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ImplicitAssumptionNode, ruleName, childNodes, precedence, opacity); }
}
