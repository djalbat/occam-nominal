"use strict";

import ProofAssertionNode from "../../node/proofAssertion";

import { PROCEDURE_CALL_RULE_NAME } from "../../ruleNames";

export default class PremiseNode extends ProofAssertionNode {
  getProcedureCallNode() {
    const ruleName = PROCEDURE_CALL_RULE_NAME,
          procedureCallNode = this.getNodeByRuleName(ruleName);

    return procedureCallNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return ProofAssertionNode.fromRuleNameChildNodesOpacityAndPrecedence(PremiseNode, ruleName, childNodes, opacity, precedence); }
}
