"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { DERIVATION_RULE_NAME } from "../ruleNames";

export default class ProofNode extends NonTerminalNode {
  getDerivationNode() {
    const ruleName = DERIVATION_RULE_NAME,
          derivationNode = this.getNodeByRuleName(ruleName);

    return derivationNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ProofNode, ruleName, childNodes, opacity, precedence); }
}
