"use strict";

import { NonTerminalNode } from "occam-languages";

import { NONSENSE_RULE_NAME, STATEMENT_RULE_NAME, PROCEDURE_REFERENCE_RULE_NAME } from "../ruleNames";

export default class HypothesisNode extends NonTerminalNode {
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

  getProcedureReferenceNode() {
    const ruleName = PROCEDURE_REFERENCE_RULE_NAME,
          procedureReferenceNode = this.getNodeByRuleName(ruleName);

    return procedureReferenceNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(HypothesisNode, ruleName, childNodes, opacity, precedence); }
}
