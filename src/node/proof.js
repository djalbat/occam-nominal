"use strict";

import { NonTerminalNode } from "occam-languages";

import { DERIVATION_RULE_NAME } from "../ruleNames";

export default class ProofNode extends NonTerminalNode {
  getDerivationNode() {
    const ruleName = DERIVATION_RULE_NAME,
          derivationNode = this.getNodeByRuleName(ruleName);

    return derivationNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ProofNode, ruleName, childNodes, precedence, opacity); }
}
