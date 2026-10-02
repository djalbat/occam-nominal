"use strict";

import BodyNode from "../../node/body";

export default class TheoremBodyNode extends BodyNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(TheoremBodyNode, ruleName, childNodes, precedence, opacity); }
}
