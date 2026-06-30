"use strict";

import NonTerminalNode from "../nonTerminalNode";

import { PARAMETER_RULE_NAME, PROCEDURE_REFERENCE_RULE_NAME } from "../ruleNames";

export default class ProcedureCallNode extends NonTerminalNode {
  getProcedureName() {
    const procedureReferenceNode = this.getProcedureReferenceNode(),
          procedureName = procedureReferenceNode.getProcedureName();

    return procedureName;
  }

  getParameterNodes() {
    const ruleName = PARAMETER_RULE_NAME,
          parameterNodes = this.getNodesByRuleName(ruleName);

    return parameterNodes;
  }

  getProcedureReferenceNode() {
    const ruleName = PROCEDURE_REFERENCE_RULE_NAME,
          procedureReferenceNode = this.getNodeByRuleName(ruleName);

    return procedureReferenceNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return NonTerminalNode.fromRuleNameChildNodesOpacityAndPrecedence(ProcedureCallNode, ruleName, childNodes, opacity, precedence); }
}
