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
  run(termNode, context, continuatino) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuatino);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuatino) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuatino(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuatino) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        continuatino(success);
      }
    }
  ];
}

class GeneratorPass extends ContinuationPass {
  run(termNode, context, continuatino) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuatino);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuatino) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuatino(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuatino) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        continuatino(success);
      }
    }
  ];
}

class CombinatorPass extends ContinuationPass {
  run(statementNode, context, continuatino) {
    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuatino);
  }

  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, continuatino) => {
        const statement = statementFromStatementNode(statementNode, context);

        descend((context) => {
          statement.validate(context, (statement) => {
            let success = false;

            if (statement !== null) {
              success = true;
            }

            continuatino(success);
          });
        }, context);
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuatino) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuatino(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuatino) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        continuatino(success);
      }
    }
  ];
}

class ConstructorPass extends ContinuationPass {
  run(termNode, context, continuatino) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes();

    this.descend(childNodes, context, continuatino);
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuatino) => {
        const term = termFromTermNode(termNode, context);

        term.validate(context, (term, context) => {
          let success = false;

          if (term !== null) {
            success = true;
          }

          continuatino(success);
        });
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuatino) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = true;
        }

        continuatino(success);
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

export function validateStatementAsCombinator(statement, context, continuatino) {
  const statementNode = statement.getNode();

  combinatorPass.run(statementNode, context, continuatino);
}
