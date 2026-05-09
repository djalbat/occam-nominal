"use strict";

import AssertionNode from "../../node/assertion";

import { STATEMENT_RULE_NAME } from "../../ruleNames";

export default class SubproofAssertionNode extends AssertionNode {
  getStatementNodes() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNodes = this.getNodesByRuleName(ruleName);

    return statementNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(SubproofAssertionNode, ruleName, childNodes, opacity, precedence); }
}
