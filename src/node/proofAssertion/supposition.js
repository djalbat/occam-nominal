"use strict";

import ProofAssertionNode from "../../node/proofAssertion";

import { NOMINAL_PROCEDURE_CALL_RULE_NAME } from "../../ruleNames";

export default class SuppositionNode extends ProofAssertionNode {
  getNominalProcedureCallNode() {
    const ruleName = NOMINAL_PROCEDURE_CALL_RULE_NAME,
          nominalProcedureCallNode = this.getNodeByRuleName(ruleName);

    return nominalProcedureCallNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ProofAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(SuppositionNode, ruleName, childNodes, opacity, precedence); }
}
