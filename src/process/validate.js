"use strict";

import { queryUtilities } from "occam-query";

import ContinuationPass from "../pass/continuation";

import { declare } from "../utilities/state";
import { termFromTermNode, statementFromStatementNode } from "../utilities/element";

const { nodeQuery } = queryUtilities;

const termNodeQuery = nodeQuery("/term"),
      typeNodeQuery = nodeQuery("/type"),
      statementNodeQuery = nodeQuery("/statement");

class ValidateTermPass extends ContinuationPass {
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

        const term = termFromTermNode(termNode, context);

        declare((state) => {
          const termValidates = term.validate(state, context, (term, context) => {
            let validates;

            validates = continuation(context);

            return validates;
          });

          if (termValidates) {
            success = true;
          }
        });

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

class ValidateStatementPass extends ContinuationPass {
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
        let success = false;

        const statement = statementFromStatementNode(statementNode, context);

        declare((state) => {
          const statementValidates = statement.validate(state, context, (statement, context) => {
            let validates;

            validates = continuation(context);

            return validates;
          });

          if (statementValidates) {
            success = true;
          }
        });

        return success;
      }
    },
    {
      nodeQuery: termNodeQuery,
      run: (termNode, context, continuation) => {
        let success = false;

        const term = termFromTermNode(termNode, context);

        declare((state) => {
          const termValidates = term.validate(state, context, (term, context) => {
            let validates;

            validates = continuation(context);

            return validates;
          });

          if (termValidates) {
            success = true;
          }
        });

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

const validateTermPass = new ValidateTermPass(),
      validateStatementPass = new ValidateStatementPass();

export function validateTermAsProperty(term, context, continuation) {
  let termValidatesAsProperty = false;

  const termNode = term.getNode(),
        success = validateTermPass.run(termNode, context, continuation);

  if (success) {
    termValidatesAsProperty = true;
  }

  return termValidatesAsProperty;
}

export function validateTermAsGenerator(term, context, continuation) {
  let termValidatesAsGenerator = false;

  const termNode = term.getNode(),
        success = validateTermPass.run(termNode, context, continuation);

  if (success) {
    termValidatesAsGenerator = true;
  }

  return termValidatesAsGenerator;
}

export function validateTermAsConstructor(term, context, continuation) {
  let termValidatesAsConstructor = false;

  const termNode = term.getNode(),
        success = validateTermPass.run(termNode, context, continuation);

  if (success) {
    termValidatesAsConstructor = true;
  }

  return termValidatesAsConstructor;
}

export function validateStatementAsCombinator(statement, context, continuation) {
  let statementValidatesAsCombinator = false;

  const statementNode = statement.getNode(),
        success = validateStatementPass.run(statementNode, context, continuation);

  if (success) {
    statementValidatesAsCombinator = true;
  }

  return statementValidatesAsCombinator;
}
