"use strict";

import { NonTerminalNode } from "occam-languages";

import { REFERENCE_RULE_NAME, STATEMENT_RULE_NAME } from "../../ruleNames";

export default class MetaLevelAssumptionpNode extends NonTerminalNode {
  getReferenceNode() {
    const ruleName = REFERENCE_RULE_NAME,
          referenceNode = this.getNodeByRuleName(ruleName);

    return referenceNode;
  }

  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaLevelAssumptionpNode, ruleName, childNodes, opacity, precedence); }
}
