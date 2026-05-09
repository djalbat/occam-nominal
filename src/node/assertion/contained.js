"use strict";

import AssertionNode from "../../node/assertion";

import { MISSING } from "../../constants";
import { TERM_RULE_NAME, FRAME_RULE_NAME, STATEMENT_RULE_NAME } from "../../ruleNames";

export default class ContainedAssertionNode extends AssertionNode {
  isNegated() {
    let negated = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode, ///
              content = terminalNode.getContent(),
              contentMessing = (content === MISSING);

        if (contentMessing) {
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

  getStatementNode() {
    const ruleName = STATEMENT_RULE_NAME,
          statementNode = this.getNodeByRuleName(ruleName);

    return statementNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return AssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(ContainedAssertionNode, ruleName, childNodes, opacity, precedence); }
}
