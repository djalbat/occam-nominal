"use strict";

import { NonTerminalNode } from "occam-languages";

export default class TopLevelAssertionNode extends NonTerminalNode {
  getBodyNode() {
    const { bodyRuleName } = this.constructor,
          ruleName = bodyRuleName,  ///
          axiomBodyNode = this.getNodeByRuleName(ruleName);

    return axiomBodyNode;
  }

  getHeaderNode() {
    const { headerRuleName } = this.constructor,
          ruleName = headerRuleName,  ///
          headerNode = this.getNodeByRuleName(ruleName);

    return headerNode;
  }

  getSignatureNode() {
    const headerNode = this.getHeaderNode(),
          signatureNode = headerNode.getSignatureNode();

    return signatureNode;
  }

  getLabelNodes() {
    const headerNode = this.getHeaderNode(),
          labelNodes = headerNode.getLabelNodes();

    return labelNodes;
  }

  getProofNode() {
    const bodyNode = this.getBodyNode(),
          proofNode = bodyNode.getProofNode();

    return proofNode;
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
