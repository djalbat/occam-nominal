"use strict";

import BodyNode from "../../node/body";

import { PROOF_RULE_NAME, PREMISE_RULE_NAME, CONCLUSION_RULE_NAME } from "../../ruleNames";

export default class RuleBodyNode extends BodyNode {
  getProofNode() {
    const ruleName = PROOF_RULE_NAME,
          proofNode = this.getNodeByRuleName(ruleName);

    return proofNode;
  }

  getPremiseNodes() {
    const ruleName = PREMISE_RULE_NAME,
          premiseNodes = this.getNodesByRuleName(ruleName);

    return premiseNodes;
  }

  getConclusionNode() {
    const ruleName = CONCLUSION_RULE_NAME,
          conclusionNode = this.getNodeByRuleName(ruleName);

    return conclusionNode;
  }

  getDeductionNode() {
    const deductionNode = null;

    return deductionNode;
  }

  getSuppositionNodes() {
    const suppositionNodes = null;

    return suppositionNodes;
  }

  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(RuleBodyNode, ruleName, childNodes, precedence, opacity); }
}
