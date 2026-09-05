"use strict";

import FactNode from "../../node/fact";

import { PROCEDURE_REFERENCE_RULE_NAME } from "../../ruleNames";

export default class SuppositionNode extends FactNode {
  getProcedureReferenceNode() {
    const ruleName = PROCEDURE_REFERENCE_RULE_NAME,
          procedureReferenceNode = this.getNodeByRuleName(ruleName);

    return procedureReferenceNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return FactNode.fromRuleNameChildNodesOpacityAndPrecedence(SuppositionNode, ruleName, childNodes, opacity, precedence); }
}
