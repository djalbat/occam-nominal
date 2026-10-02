"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME, TYPE_RULE_NAME } from "../ruleNames";

export default class ArgumentNode extends NonTerminalNode {
  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getSingularTermNode() {
    const ruleName = TERM_RULE_NAME,
          singularTermNode = this.getSingularNodeByRuleName(ruleName);

    return singularTermNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ArgumentNode, ruleName, childNodes, precedence, opacity); }
}
