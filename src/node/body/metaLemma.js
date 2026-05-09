"use strict";

import BodyNode from "../../node/body";

export default class MetaLemmaBodyNode extends BodyNode {
  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return BodyNode.fromRuleNameChildNodesOpacityAndPrecedence(MetaLemmaBodyNode, ruleName, childNodes, opacity, precedence); }
}
