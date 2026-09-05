"use strict";

import FactNode from "../../node/fact";

import { PROCEDURE_REFERENCE_RULE_NAME } from "../../ruleNames";

export default class PremiseNode extends FactNode {
  getProcedureReferenceNode() {
    const ruleName = PROCEDURE_REFERENCE_RULE_NAME,
          procedureReferenceNode = this.getNodeByRuleName(ruleName);

    return procedureReferenceNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return FactNode.fromRuleNameChildNodesOpacityAndPrecedence(PremiseNode, ruleName, childNodes, opacity, precedence); }
}
