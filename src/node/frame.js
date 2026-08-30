"use strict";

import { NonTerminalNode } from "occam-languages";

import { LINK_RULE_NAME, ASSUMPTION_RULE_NAME } from "../ruleNames";

export default class FrameNode extends NonTerminalNode {
  isSingular() {
    let singular = false;

    const linkNode = this.getLinkNode();

    if (linkNode !== null) {
      const assumptionNodes = this.getAssumptionNodes(),
            assumptionNodesLength = assumptionNodes.length;

      if (assumptionNodesLength === 0) {
        singular = true;
      }
    }

    return singular;
  }

  getLinkNode() {
    const ruleName = LINK_RULE_NAME,
          linkNode = this.getNodeByRuleName(ruleName);

    return linkNode;
  }

  getAssumptionNodes() {
    const ruleName = ASSUMPTION_RULE_NAME,
          declarationNodes = this.getNodesByRuleName(ruleName);

    return declarationNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(FrameNode, ruleName, childNodes, opacity, precedence); }
}
