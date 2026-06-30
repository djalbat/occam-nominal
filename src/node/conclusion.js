"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { NONSENSE_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";

export default class ConclusionNode extends NonTerminalNode {
  getNonsenseNode() {
    const ruleName = NONSENSE_RULE_NAME,
          nonsenseNode = this.getNodeByRuleName(ruleName);

    return nonsenseNode;
  }

  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ConclusionNode, ruleName, childNodes, opacity, precedence); }
}
