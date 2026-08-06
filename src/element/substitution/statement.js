"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { stripBracketsFromStatement } from "../../utilities/brackets";
import { instantiateStatementSubstitution } from "../../process/instantiate";
import { statementSubstitutionFromStatementSubstitutionNode } from "../../utilities/element";
import { ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";
import { statementSubstitutionStringFromStatementAndMetavariable, statementSubstitutionStringFromStatementMetavariableAndSubstitution } from "../../utilities/string";

const { breakPointFromJSON } = breakPointUtilities;

export default define(class StatementSubstitution extends Substitution {
  constructor(contexts, string, node, breakPoint, solved, targetStatement, replacementStatement) {
    super(contexts, string, node, breakPoint);

    this.solved = solved;
    this.targetStatement = targetStatement;
    this.replacementStatement = replacementStatement;
  }

  isSolved() {
    return this.solved;
  }

  getTargetStatement() {
    return this.targetStatement;
  }

  getReplacementStatement() {
    return this.replacementStatement;
  }

  getStatementSubstitutionNode() {
    const node = this.getNode(),
          statementSubstitutionNode = node; ///

    return statementSubstitutionNode;
  }

  getTargetNode() {
    const targetStatementNode = this.targetStatement.getNode(),
          targetNode = targetStatementNode; ///

    return targetNode;
  }

  getReplacementNode() {
    const replacementStatementNode = this.replacementStatement.getNode(),
          replacementNode = replacementStatementNode; ///

    return replacementNode;
  }

  isSimple() { return this.targetStatement.isSimple(); }

  getMetavariableNode() { return this.targetStatement.getMetavariableNode(); }

  matchMetavariableNode(metavariableNode) { return this.targetStatement.matchMetavariableNode(metavariableNode); }

  compareStatement(statement, context) {
    statement = stripBracketsFromStatement(statement, context); ///

    const replacementStatementEqualToStatement = this.replacementStatement.isEqualTo(statement),
          comparesToStatement = replacementStatementEqualToStatement;  ///

    return comparesToStatement;
  }

  compareParameter(parameter) {
    const targetStatementComparesToParameter = this.targetStatement.compareParameter(parameter),
          comparesToParameter = targetStatementComparesToParameter;  ///

    return comparesToParameter;
  }

  validate(state, context, continuation) {
    let validates;

    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution...`);

    let substitution;

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const statementSubstitution = substitution;  ///

      context.debug(`...the '${statementSubstitutionString}' statement substitution is already presenet.`);

      validates = continuation(statementSubstitution, context);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const validateTargetStatement = this.validateTargetStatement.bind(this),
              validateReplacementStatement = this.validateReplacementStatement.bind(this);

        validates = all([
          validateTargetStatement,
          validateReplacementStatement
        ], state, generalContext, specificContext, () => {
          let validates;

          substitution = this;  ///

          context.addSubstitution(substitution);

          this.commit(generalContext, specificContext);

          const statementSubstitution = substitution; ///

          validates = continuation(statementSubstitution, context);

          return validates;
        });
      }, generalContext, specificContext);
    }

    if (validates) {
      context.debug(`...validated the '${statementSubstitutionString}' statement substitution.`);
    }

    return validates;
  }

  validateTargetStatement(state, generalContext, specificContext, continuation) {
    let targetStatementValidates;

    const context = generalContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's target statement...`);

    const targetStatementSingular = this.targetStatement.isSingular();

    if (targetStatementSingular) {
      targetStatementValidates = this.targetStatement.validate(state, context, (targetStatement, context) => {
        let validates;

        const generalContext = context; ///

        validates = (state, generalContext, specificContext);

        return validates;
      });
    } else {
      const targetStatementString = this.targetStatement.getString();

      targetStatementValidates = false;

      context.debug(`The '${targetStatementString}' target statement is not singular.`);
    }

    if (targetStatementValidates) {
      context.trace(`...validated the '${statementSubstitutionString}' statement substitution's target statement.`);
    }

    return targetStatementValidates;
  }

  validateReplacementStatement(state, generalContext, specificContext, continuation) {
    let replacementStatementValidates;

    const context = specificContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's replacement statement...`);

    replacementStatementValidates = this.replacementStatement.validate(state, context, (replacementStatement, context) => {
      let validates;

      const specificContext = context;  ///

      validates = continuation(state, generalContext, specificContext);

      return validates;
    });

    if (replacementStatementValidates) {
      context.debug(`...validated the '${statementSubstitutionString}' statement substitution's replacement statement.`);
    }

    return replacementStatementValidates;
  }

  unifyTargetStatement(substitution, context, continuation) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's target statement with the '${generalSubstitutionString}' substitution's target statement...`);

    const generalSubstitutionGeneralContext = generalSubstitution.getGeneralContext(),
          specificSubstitutionGeneralContext = specificSubstitution.getGeneralContext(),
          generalSubstitutionTargetStatement = generalSubstitution.getTargetStatement(),
          specificSubstitutionTargetStatement = specificSubstitution.getTargetStatement(),
          generalContext = generalSubstitutionGeneralContext,  ///
          specificContext = specificSubstitutionGeneralContext,  ///
          generalStatement = generalSubstitutionTargetStatement, ///
          specificStatement = specificSubstitutionTargetStatement; ///

    return reconcile((specificContext) => {
      return generalStatement.unifyStatement(specificStatement, generalContext, specificContext, (statementUnifies) => {
        let targetStatemnentUnifies = false;

        if (statementUnifies) {
          specificContext.commit(context);

          targetStatemnentUnifies = true;
        }

        if (targetStatemnentUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's target statement with the '${generalSubstitutionString}' substitution's target statement.`);
        }

        return continuation(targetStatemnentUnifies);
      });
    }, specificContext);
  }

  unifyReplacementStatement(substitution, context, continuation) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's replacement statement with the '${generalSubstitutionString}' substitution's replacement statement...`);

    const generalSubstitutionSpecificContext = generalSubstitution.getSpecificContext(),
          specificSubstitutionSpecificContext = specificSubstitution.getSpecificContext(),
          generalSubstitutionReplacementStatement = generalSubstitution.getReplacementStatement(),
          specificSubstitutionReplacementStatement = specificSubstitution.getReplacementStatement(),
          generalContext = generalSubstitutionSpecificContext,  ///
          specificContext = specificSubstitutionSpecificContext,  ///
          generalStatement = generalSubstitutionReplacementStatement, ///
          specificStatement = specificSubstitutionReplacementStatement; ///

    return reconcile((specificContext) => {
      return generalStatement.unifyStatement(specificStatement, generalContext, specificContext, (statementUnifies) => {
        const soleNonTrivialInferredSubstitution = specificContext.getSoleNonTrivialInferredSubstitution(),
              substitution = soleNonTrivialInferredSubstitution; ///

        return continuation(substitution);
      });
    }, specificContext);
  }

  unifyComplexSubstitution(complexSubstitution, context, continuation) {
    const simpleSubstitution = this,  ///
          simpleSubstitutionString = simpleSubstitution.getString(),  ///
          complexSubstitutionString = complexSubstitution.getString();  ///

    context.trace(`Unifying the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution...`);

    return this.unifyReplacementStatement(complexSubstitution, context, (substitution) => {
      let complexSubstitutionUnifies = false;

      if (substitution !== null) {
        complexSubstitutionUnifies = true;
      }

      if (complexSubstitutionUnifies) {
        context.debug(`...unified the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution.`);
      }

      return continuation(complexSubstitutionUnifies, substitution);
    });
  }

  solve(context, continuation) {
    const metavariableNode = this.getMetavariableNode(),
          simpleInferredSubstitution = context.findSimpleInferredSubstitutionByMetavariableNode(metavariableNode);

    if (simpleInferredSubstitution === null) {
      return continuation();
    }

    const simpleSubstitution = simpleInferredSubstitution, ///
          complexSubstitution = this, ///
          complexSubstitutionString = complexSubstitution.getString();

    context.trace(`Resolving the ${complexSubstitutionString}' complex substitution...`);

    return simpleSubstitution.unifyComplexSubstitution(complexSubstitution, context, (complexSubstitutionUnifies, substitution) => {
      if (!complexSubstitutionUnifies) {
        return continuation();
      }

      const simpleSubstitution = substitution; ///

      substitution = this.targetStatement.getSubstitution();

      return substitution.unifySimpleSubstitution(simpleSubstitution, context, (simpleSubstitutionUnifies, substitution) => {
        let complexSubstitutionResvoles = false;

        if (complexSubstitutionUnifies) {
          if (substitution !== null) {
            const inferredSubstitution = substitution; ///

            context.addInferredSubstitution(inferredSubstitution);
          }

          complexSubstitutionResvoles = true;

          this.solved = true;
        }

        if (complexSubstitutionResvoles) {
          context.debug(`...solved the '${complexSubstitutionString}' complex substitution.`);
        }

        return continuation();
      });
    });
  }

  static name = "StatementSubstitution";

  static fromJSON(json, context) {
    const { name } = json;

    if (this.name !== name) {
      return;
    }

    return instantiate((context) => {
      return unserialises((json, generalContext, specificContext) => {
        const { string } = json,
              statementSubstitutionNode = instantiateStatementSubstitution(string, context),
              node = statementSubstitutionNode, ///
              contexts = [
                generalContext,
                specificContext
              ],
              breakPoint = breakPointFromJSON(json),
              solved = solvedFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext),
              targetStatement = targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, generalContext),
              replacementStatement = replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, specificContext),
              statementSubstitutionn = new StatementSubstitution(contexts, string, node, breakPoint, solved, targetStatement, replacementStatement);

        return statementSubstitutionn;
      }, json, context);
    }, context);
  }

  static fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext) {
    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    return ablates((generalContext, specificContext) => {
      return instantiate((specificContext) => {
        return manifest((generalContext) => {
          const statementSubstitutionString = statementSubstitutionStringFromStatementAndMetavariable(statement, metavariable),
                string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context),
                statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);

          return statementSubstitution;
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);
  }

  static fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) {
    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    return ablates((generalContext, specificContext) => {
      return instantiate((specificContext) => {
        return manifest((generalContext) => {
          const statementSubstitutionString = statementSubstitutionStringFromStatementMetavariableAndSubstitution(statement, metavariable, substitution),
                string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context),
                statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);

          return statementSubstitution;
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);
  }
});

function solvedFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext) {
  const solved = true;

  return solved;
}

function targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, generalContext) {
  const targetStatementNode = statementSubstitutionNode.getTargetStatementNode(),
        targetStatement = generalContext.findStatementByStatementNode(targetStatementNode);

  return targetStatement;
}

function replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, specificContext) {
  const replacementStatementNode = statementSubstitutionNode.getReplacementStatementNode(),
        replacementStatement = specificContext.findStatementByStatementNode(replacementStatementNode);

  return replacementStatement;
}
