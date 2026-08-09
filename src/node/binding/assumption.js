"use strict";

import BindingNode from "../../node/binding";

export default class AssumptionNode extends BindingNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BindingNode.fromRuleNameChildNodesOpacityAndPrecedence(AssumptionNode, ruleName, childNodes, opacity, precedence); }
}
