"use strict";

import SubstitutionNode from "../../node/substitution";

import { FRAME_RULE_NAME } from "../../ruleNames";

export default class FrameSubstitutionNode extends SubstitutionNode {
  getTargetFrameNode() {
    const lastFrameNode = this.getLastFrameNode(),
          targetFrameNode = lastFrameNode; ///

    return targetFrameNode;
  }

  getReplacementFrameNode() {
    const firstFrameNode = this.getFirstFrameNode(),
          replacementFrameNode = firstFrameNode; ///

    return replacementFrameNode;
  }

  getLastFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          lastFrameNode = this.getLastNodeByRuleName(ruleName);

    return lastFrameNode;
  }

  getFirstFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          firstFrameNode = this.getFirstNodeByRuleName(ruleName);

    return firstFrameNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return SubstitutionNode.fromRuleNameChildNodesOpacityAndPrecedence(FrameSubstitutionNode, ruleName, childNodes, opacity, precedence); }
}
