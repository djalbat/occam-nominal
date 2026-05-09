"use strict";

import { NonTerminalNode } from "occam-languages";

export default class TopLevelMetaAssertionNode extends NonTerminalNode {
  getBodyNode() {
    const { bodyRuleName } = this.constructor,
          ruleName = bodyRuleName,  ///
          axiomBodyNode = this.getNodeByRuleName(ruleName);

    return axiomBodyNode;
  }

  getLabelNode() {
    const headerNode = this.getHeaderNode(),
          labelNode = headerNode.getLabelNode();

    return labelNode;
  }

  getProofNode() {
    const bodyNode = this.getBodyNode(),
          proofNode = bodyNode.getProofNode();

    return proofNode;
  }

  getHeaderNode() {
    const { headerRuleName } = this.constructor,
          ruleName = headerRuleName,  ///
          headerNode = this.getNodeByRuleName(ruleName);

    return headerNode;
  }

  getDeductionNode() {
    const bodyNode = this.getBodyNode(),
          deductionNode = bodyNode.getDeductionNode();

    return deductionNode;
  }

  getSuppositionNodes() {
    const bodyNode = this.getBodyNode(),
          suppositionNodes = bodyNode.getSuppositionNodes();

    return suppositionNodes;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(Class, ruleName, childNodes, opacity, precedence); }
}
