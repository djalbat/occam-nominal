"use strict";

import DeclarationNode from "../../node/declaration";

import { PROVISIONAL } from "../../constants";
import { TYPE_RULE_NAME, TYPES_RULE_NAME } from "../../ruleNames";

export default class SimpleTypeDeclarationNode extends DeclarationNode {
  isProvisional() {
    let provisional = false;

    this.someChildNode((childNode) => {
      const childNodeTerminalNode = childNode.isTerminalNode();

      if (childNodeTerminalNode) {
        const terminalNode = childNode,
              content = terminalNode.getContent(),
              contentProvisional = (content === PROVISIONAL);

        if (contentProvisional) {
          provisional = true;

          return true;
        }
      }
    });

    return provisional;
  }

  getTypePrefixName() {
    const typeNode = this.getTypeNode(),
          typePrefixName = typeNode.getTypePrefixName();

    return typePrefixName;
  }

  getSuperTypeNodes() {
    let superTypeNodes = [];

    const typesNode = this.getTypesNode();

    if (typesNode !== null) {
      const typeNodes = typesNode.getTypeNodes();

      superTypeNodes = typeNodes; ///
    }

    return superTypeNodes;
  }

  getNominalTypeName() {
    const typeNode = this.getTypeNode(),
          nominalTypeName = typeNode.getNominalTypeName();

    return nominalTypeName;
  }

  getTypeName() {
    let typeName = null;

    const typeNode = this.getTypeNode();

    if (typeNode !== null) {
      typeName = typeNode.getTypeName();
    }

    return typeName;
  }

  getTypeNode() {
    const ruleName = TYPE_RULE_NAME,
          typeNode = this.getNodeByRuleName(ruleName);

    return typeNode;
  }

  getTypesNode() {
    const ruleName = TYPES_RULE_NAME,
          typesNode = this.getNodeByRuleName(ruleName);

    return typesNode;
  }

  static fromRuleNameChildNodesOpacityAndPrecedence(ruleName, childNodes, opacity, precedence) { return DeclarationNode.fromRuleNameChildNodesOpacityAndPrecedence(SimpleTypeDeclarationNode, ruleName, childNodes, opacity, precedence); }
}

