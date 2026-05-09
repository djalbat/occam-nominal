"use strict";

import DeclarationNode from "../../node/declaration";

import { PROVISIONALLY } from "../../constants";
import { CONSTRUCTOR_RULE_NAME, TYPE_RULE_NAME } from "../../ruleNames";

export default class ConstructorDeclarationNode extends DeclarationNode {
  isProvisional() {
    let provisional = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode,
              content = terminalNode.getContent(),
              contentProvisionally = (content === PROVISIONALLY);

        if (contentProvisionally) {
          provisional = true;

          return true;
        }
      }
    });

    return provisional;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getConstructorNode() {
    const ruleName = CONSTRUCTOR_RULE_NAME,
          constructorNode = this.getNodeByRuleName(ruleName);

    return constructorNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(ConstructorDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
