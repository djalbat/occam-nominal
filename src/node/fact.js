"use strict";

import { NonTerminalNode } from "occam-languages";

import { NONSENSE_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";

export default class FactNode extends NonTerminalNode {
  isMalformed() {
    const nonsenseNode = this.getNonsenseNode(),
          malformed = (nonsenseNode !== null);

    return malformed;
  }

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

  static fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence); }
}
