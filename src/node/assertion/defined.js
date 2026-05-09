"use strict";

import AssertionNode from "../../node/assertion";

import { UNDEFINED } from "../../constants";
import { FRAME_RULE_NAME, TERM_RULE_NAME } from "../../ruleNames";

export default class DefinedAssertionNode extends AssertionNode {
  isNegated() {
    let negated = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent(),
              contentUndefined = (content === UNDEFINED);

        if (contentUndefined) {
          negated = true;

          return true;
        }
      }
    });

    return negated;
  }

  getTermNode() {
    const ruleName = TERM_RULE_NAME,
          termNode = this.getNodeByRuleName(ruleName);

    return termNode;
  }

  getFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          frameNode = this.getNodeByRuleName(ruleName);

    return frameNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(DefinedAssertionNode, ruleName, childNodes, opacity, precedence); }
}
