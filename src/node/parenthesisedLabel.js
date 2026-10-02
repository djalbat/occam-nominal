"use strict";

import { NonTerminalNode } from "occam-languages";

import { LABEL_RULE_NAME } from "../ruleNames";

export default class ParenthesisedLabelNode extends NonTerminalNode {
  getLabelNode() {
    const ruleName = LABEL_RULE_NAME,
          labelNode = this.getNodeByRuleName(ruleName);

    return labelNode;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return NonTerminalNode.fromRuleNameChildNodesPrecedenceAndOpacity(ParenthesisedLabelNode, ruleName, childNodes, precedence, opacity); }
}
