"use strict";

import BodyNode from "../../node/body";

export default class LemmaBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(LemmaBodyNode, ruleName, childNodes, opacity, precedence); }
}
