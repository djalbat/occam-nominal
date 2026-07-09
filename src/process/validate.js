"use strict";

import { queryUtilities } from "occam-query";
import { ContinuationPass } from "occam-languages";

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

    this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuation(success);
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

        continuation(success);
      }
    }
  ];
}

class GeneratorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuation(success);
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

        continuation(success);
      }
    }
  ];
}

class CombinatorPass extends ContinuationPass {
  run(statementNode, context, continuation) {
    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, continuation) => {
        const statement = statementFromStatementNode(statementNode, context);

        descend((context) => {
          statement.validate(context, (statement) => {
            let success = false;

            if (statement !== null) {
              success = true;
            }

            continuation(success);
          });
        }, context);
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuation(success);
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

        continuation(success);
      }
    }
  ];
}

class ConstructorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuation);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuation(success);
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

        continuation(success);
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

  propertyPass.run(termNode, context, continuation);
}

export function validateTermAsGenerator(term, context, continuation) {
  const termNode = term.getNode();

  generatorPass.run(termNode, context, continuation);
}

export function validateTermAsConstructor(term, context, continuation) {
  const termNode = term.getNode();

  constructorPass.run(termNode, context, continuation);
}

export function validateStatementAsCombinator(statement, context, continuation) {
  const statementNode = statement.getNode();

  combinatorPass.run(statementNode, context, continuation);
}
