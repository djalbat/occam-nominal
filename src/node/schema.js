"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { SCHEMA_BODY_RULE_NAME, SCHEMA_HEADER_RULE_NAME } from "../ruleNames";

export default class SchemaNode extends NonTerminalNode {
  getBodyNode() {
    const ruleName = SCHEMA_BODY_RULE_NAME,  ///
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
    const ruleName = SCHEMA_HEADER_RULE_NAME,  ///
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

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(SchemaNode, ruleName, childNodes, opacity, precedence); }
}
