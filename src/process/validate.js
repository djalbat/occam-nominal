"use strict";

import { queryUtilities } from "occam-query";

import ContinuationPass from "../pass/continuation";

import { descend } from "../utilities/context";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class PropertyPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    return this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return continuation(success);
      }
    }
  ];
}

class GeneratorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    return this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return continuation(success);
      }
    }
  ];
}

class CombinatorPass extends ContinuationPass {
  run(statementNode, context, continuation) {
    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    return this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, continuation) => {
        const statement = statementFromStatementNode(statementNode, context);

        return descend((context) => {
          return statement.validate(context, (statement) => {
            let success = false;

            if (statement !== null) {
              success = true;
            }

            return continuation(success);
          });
        }, context);
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return continuation(success);
      }
    }
  ];
}

class ConstructorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    return this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        return term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          return continuation(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        return continuation(success);
      }
    }
  ];
}

const propertyPass = new PropertyPass(),
      generatorPass = new GeneratorPass(),
      combinatorPass = new CombinatorPass(),
      constructorPass = new ConstructorPass();

export function validateTermAsProperty(term, context, continuation) {
  const termNode = term.getNode();

  return propertyPass.run(termNode, context, continuation);
}

export function validateTermAsGenerator(term, context, continuation) {
  const termNode = term.getNode();

  return generatorPass.run(termNode, context, continuation);
}

export function validateTermAsConstructor(term, context, continuation) {
  const termNode = term.getNode();

  return constructorPass.run(termNode, context, continuation);
}

export function validateStatementAsCombinator(statement, context, continuation) {
  const statementNode = statement.getNode();

  return combinatorPass.run(statementNode, context, continuation);
}
