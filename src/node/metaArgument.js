"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { STATEMENT_RULE_NAME } from "../ruleNames";

export default class MetaArgumentNode extends NonTerminalNode {
  getSingularStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          singularStatementNode = this.getNodeByRuleName(ruleName);

    return singularStatementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaArgumentNode, ruleName, childNodes, opacity, precedence); }
}
