"use strict";

import BindingNode from "../../node/binding";

export default class GoalNode extends BindingNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BindingNode.fromRuleNameChildNodesOpacityAndPrecedence(GoalNode, ruleName, childNodes, opacity, precedence); }
}
