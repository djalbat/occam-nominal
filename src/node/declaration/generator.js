"use strict";

import DeclarationNode from "../../node/declaration";

import { PROVISIONALLY } from "../../constants";
import { GENERATOR_RULE_NAME, TYPE_RULE_NAME } from "../../ruleNames";

export default class GeneratorDeclarationNode extends DeclarationNode {
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

  getGeneratorNode() {
    const ruleName = GENERATOR_RULE_NAME,
          generatorNode = this.getNodeByRuleName(ruleName);

    return generatorNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(GeneratorDeclarationNode, ruleName, childNodes, opacity, precedence); }
}
