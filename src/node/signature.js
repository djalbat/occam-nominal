"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { TERM_RULE_NAME } from "../ruleNames";

export default class SignatureNode extends NonTerminalNode {
  getTermNodes() {
    const ruleName = TERM_RULE_NAME,
          termNodes = this.getNodesByRuleName(ruleName);

    return termNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(SignatureNode, ruleName, childNodes, opacity, precedence); }
}
