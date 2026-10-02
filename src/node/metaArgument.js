"use strict";

import { NonTerminalNode } from "occam-languages";

import { STATEMENT_RULE_NAME } from "../ruleNames";

export default class MetaArgumentNode extends NonTerminalNode {
  getSingularStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          singularStatementNode = this.getNodeByRuleName(ruleName);

    return singularStatementNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(MetaArgumentNode, ruleName, childNodes, precedence, opacity); }
}
