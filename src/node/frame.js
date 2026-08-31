"use strict";

import { NonTerminalNode } from "occam-languages";

import { ASSUMPTION_RULE_NAME, METAVARIABLE_RULE_NAME } from "../ruleNames";

export default class FrameNode extends NonTerminalNode {
  isSingular() {
    let singular = false;

    const metavariableNode = this.getMetavariableNode();

    if (metavariableNode !== null) {
      const assumptionNodes = this.getAssumptionNodes(),
            assumptionNodesLength = assumptionNodes.length;

      if (assumptionNodesLength === 0) {
        singular = true;
      }
    }

    return singular;
  }

  getAssumptionNodes() {
    const ruleName = ASSUMPTION_RULE_NAME,
          declarationNodes = this.getNodesByRuleName(ruleName);

    return declarationNodes;
  }

  getMetavariableNode() {
    const ruleName = METAVARIABLE_RULE_NAME,
          metavariableNode = this.getNodeByRuleName(ruleName);

    return metavariableNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(FrameNode, ruleName, childNodes, opacity, precedence); }
}
