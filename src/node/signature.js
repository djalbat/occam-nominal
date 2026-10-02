"use strict";

import { NonTerminalNode } from "occam-languages";

import { TERM_RULE_NAME } from "../ruleNames";

export default class SignatureNode extends NonTerminalNode {
  getTermNodes() {
    const ruleName = TERM_RULE_NAME,
          termNodes = this.getNodesByRuleName(ruleName);

    return termNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(SignatureNode, ruleName, childNodes, precedence, opacity); }
}
