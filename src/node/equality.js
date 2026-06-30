"use strict";

import { arrayUtilities } from "necessary";

import NonTerminalNode from "../nonTerminalNode";

import { TERM_RULE_NAME } from "../ruleNames";

const { first, last } = arrayUtilities;

export default class EqualityNode extends NonTerminalNode {
  getLeftTermNode() {
    const termNodes = this.getTermNodes(),
          firstTermNode = first(termNodes),
          leftTermNode = firstTermNode; ///

    return leftTermNode;
  }

  getRightTermNode() {
    const termNodes = this.getTermNodes(),
          firstTermNode = last(termNodes),
          rightTermNode = firstTermNode; ///

    return rightTermNode;
  }

  getTermNodes() {
    const ruleName = TERM_RULE_NAME,
          termNodes = this.getNodesByRuleName(ruleName);

    return termNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(EqualityNode, ruleName, childNodes, opacity, precedence); }
}
