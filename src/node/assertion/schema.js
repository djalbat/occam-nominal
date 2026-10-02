"use strict";

import AssertionNode from "../../node/assertion";

import { LINK_RULE_NAME, FRAME_RULE_NAME } from "../../ruleNames";

export default class SchemaAssertionNode extends AssertionNode {
  getLinkNode() {
    const ruleName = LINK_RULE_NAME,
          linkNode = this.getNodeByRuleName(ruleName);

    return linkNode;
  }

  getFrameNode() {
    const ruleName = FRAME_RULE_NAME,
          frameNode = this.getNodeByRuleName(ruleName);

    return frameNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return AssertionNode.fromRuleNameChildNodesPrecedenceAndOpacity(SchemaAssertionNode, ruleName, childNodes, precedence, opacity); }
}
