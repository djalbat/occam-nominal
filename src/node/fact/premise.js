"use strict";

import FactNode from "../../node/fact";

import { PROCEDURE_CALL_RULE_NAME } from "../../ruleNames";

export default class PremiseNode extends FactNode {
  getProcedureCallNode() {
    const ruleName = PROCEDURE_CALL_RULE_NAME,
          procedureCallNode = this.getNodeByRuleName(ruleName);

    return procedureCallNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return FactNode.fromRuleNameChildNodesOpacityAndPrecedence(PremiseNode, ruleName, childNodes, opacity, precedence); }
}
