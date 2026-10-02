"use strict";

import { NonTerminalNode } from "occam-languages";

import { NONSENSE_RULE_NAME, STATEMENT_RULE_NAME } from "../ruleNames";

export default class CombinatorNode extends NonTerminalNode {
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

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(CombinatorNode, ruleName, childNodes, precedence, opacity); }
}
