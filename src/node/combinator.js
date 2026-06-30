"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { STATEMENT_RULE_NAME } from "../ruleNames";

export default class CombinatorNode extends NonTerminalNode {
  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(CombinatorNode, ruleName, childNodes, opacity, precedence); }
}
