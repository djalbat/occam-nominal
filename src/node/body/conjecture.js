"use strict";

import BodyNode from "../../node/body";

export default class ConjectureBodyNode extends BodyNode {
  static fromRuleNameChildNodesPrecedenceAndOpacity(ruleName, childNodes, precedence, opacity) { return BodyNode.fromRuleNameChildNodesPrecedenceAndOpacity(ConjectureBodyNode, ruleName, childNodes, precedence, opacity); }
}
