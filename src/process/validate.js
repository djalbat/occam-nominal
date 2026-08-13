"use strict";

import { queryUtilities } from "occam-query";

import ContinuationPass from "../pass/continuation";

import { declare } from "../utilities/state";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class ValidateTermAsPropertyPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(),
          descended = this.descend(childNodes, context, continuation),
          success = descended;  ///

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        let success = false;

        const term = termFromTermNode(termNode, context),
              termValidates = term.validate(state, context, (term, context) => {
                let validates;

                validates = continuation(context);

                return validates;
              });

        if (termValidates) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = continuation(context);
        }

        return success;
      }
    }
  ];
}

class ValidateTermAsGeneratorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(),
          descended = this.descend(childNodes, context, continuation),
          success = descended;  ///

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        let success = false;

        const term = termFromTermNode(termNode, context),
              termValidates = term.validate(state, context, (term, context) => {
                let validates;

                validates = continuation(context);

                return validates;
              });

        if (termValidates) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = continuation(context);
        }

        return success;
      }
    }
  ];
}

class ValidateTermAsConstructorPass extends ContinuationPass {
  run(termNode, context, continuation) {
    const nonTerminalNode = termNode,  ///
          childNodes = nonTerminalNode.getChildNodes(),
          descended = this.descend(childNodes, context, continuation),
          success = descended;  ///

    return success;
  }

  static maps = [
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        let success = false;

        const term = termFromTermNode(termNode, context),
              termValidates = term.validate(state, context, (term, context) => {
                let validates;

                validates = continuation(context);

                return validates;
              });

        if (termValidates) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = continuation(context);
        }

        return success;
      }
    }
  ];
}

class ValidateStatementAsCombinatorPass extends ContinuationPass {
  run(statementNode, context, continuation) {
    const nonTerminalNode = statementNode,  ///
          childNodes = nonTerminalNode.getChildNodes(),
          descended = this.descend(childNodes, context, continuation),
          success = descended;  ///

    return success;
  }

  static maps = [
    {
      nodeQuery: statementNodeQuery,
      run: (statementNode, context, continuation) => {
        let success;

        const statement = statementFromStatementNode(statementNode, context);

        declare((state) => {
          const statementValidates = statement.validate(state, context, (statement, context) => {
            let validates;

            validates = continuation(success, context);

            return validates;
          });

          if (statementValidates) {
            success = true;
          }
        });

        return true;
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        let success = false;

        const term = termFromTermNode(termNode, context),
              termValidates = term.validate(state, context, (term, context) => {
                let validates;

                validates = continuation(context);

                return validates;
              });

        if (termValidates) {
          success = true;
        }

        return success;
      }
    },
    {
      nodeQuery: typeNodeQuery,
      run: (typeNode, context, continuation) => {
        let success = false;

        const nominalTypeName = typeNode.getNominalTypeName(),
              typePresent = context.isTypePresentByNominalTypeName(nominalTypeName);

        if (typePresent) {
          success = continuation(context);
        }

        return success;
      }
    }
  ];
}

const validateTermAsPropertyPass = new ValidateTermAsPropertyPass(),
      validateTermAsGeneratorPass = new ValidateTermAsGeneratorPass(),
      validateTermAsConstructorPass = new ValidateTermAsConstructorPass(),
      validateStatementAsCombinatorPass = new ValidateStatementAsCombinatorPass();

export function validateTermAsProperty(term, context, continuation) {
  const termNode = term.getNode(),
        success = validateTermAsPropertyPass.run(termNode, context, continuation),
        termValidatesAsProperty = success;  ///

  return termValidatesAsProperty;
}

export function validateTermAsGenerator(term, context, continuation) {
  const termNode = term.getNode(),
        success = validateTermAsGeneratorPass.run(termNode, context, continuation),
        termValidatesAsGenerator = success; ///

  return termValidatesAsGenerator;
}

export function validateTermAsConstructor(term, context, continuation) {
  const termNode = term.getNode(),
        success = validateTermAsConstructorPass.run(termNode, context, continuation),
        termValidatesAsConstructor = success; ///

  return termValidatesAsConstructor;
}

export function validateStatementAsCombinator(statement, context, continuation) {
  const statementNode = statement.getNode(),
        success = validateStatementAsCombinatorPass.run(statementNode, context, continuation),
        statementValidatesAsCombinator = success; ///

  return statementValidatesAsCombinator;
}
