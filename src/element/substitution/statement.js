"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { stripBracketsFromStatement } from "../../utilities/brackets";
import { instantiateStatementSubstitution } from "../../process/instantiate";
import { statementSubstitutionFromStatementSubstitutionNode } from "../../utilities/element";
import { elide, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";
import { statementSubstitutionStringFromStatementAndMetavariable, statementSubstitutionStringFromStatementMetavariableAndSubstitution } from "../../utilities/string";

const { breakPointFromJSON } = breakPointUtilities;

export default define(class StatementSubstitution extends Substitution {
  constructor(contexts, string, node, breakPoint, resolved, targetStatement, replacementStatement) {
    super(contexts, string, node, breakPoint);

    this.resolved = resolved;
    this.targetStatement = targetStatement;
    this.replacementStatement = replacementStatement;
  }

  isResolved() {
    return this.resolved;
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

  validate(context, continuatino) {
    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution...`);

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution !== null) {
      const statementSubstitution = validSubstitution;  ///

      context.debug(`...the '${statementSubstitutionString}' statement substitution is already valid.`);

      continuatino(statementSubstitution);

      return;
    }

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    attempts((generalContext, specificContext) => {
      const validateTargetStatement = this.validateTargetStatement.bind(this),
            validateReplacementStatement = this.validateReplacementStatement.bind(this);

      return all([
        validateTargetStatement,
        validateReplacementStatement
      ], generalContext, specificContext, (validates) => {
        let statementSubstitution = null;

        if (validates) {
          const substitution = this;  ///

          statementSubstitution = substitution; ///

          context.addSubstitution(substitution);
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }

        if (validates) {
          context.debug(`...validated the '${statementSubstitutionString}' statement substitution.`);
        }

        return continuatino(statementSubstitution);
      });
    }, generalContext, specificContext);
  }

  validateTargetStatement(generalContext, specificContext, continuatino) {
    const context = generalContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's target statement...`);

    const targetStatementSingular = this.targetStatement.isSingular();

    if (!targetStatementSingular) {
      const targetStatementString = this.targetStatement.getString(),
            targetStatementValidates = false;

      context.debug(`The '${targetStatementString}' target statement is not singular.`);

      continuatino(targetStatementValidates);

      return;
    }

    elide((context) => {
      this.targetStatement.validate(context, (targetStatement) => {
        let targetStatementValidates = false;

        if (targetStatement !== null) {
          targetStatementValidates = true;
        }

        if (targetStatementValidates) {
          context.debug(`...validated the '${statementSubstitutionString}' statement substitution's target statement...`);
        }

        continuatino(targetStatementValidates);
      });
    }, context);
  }

  validateReplacementStatement(generalContext, specificContext, continuatino) {
    const context = specificContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's replacement statement...`);

    elide((context) => {
      this.replacementStatement.validate(context, (replacementStatement) => {
        let replacementStatementValidates = false;

        if (replacementStatement !== null) {
          replacementStatementValidates = true;
        }

        if (replacementStatementValidates) {
          context.debug(`...validated the '${statementSubstitutionString}' statement substitution's replacement statement.`);
        }

        continuatino(replacementStatementValidates);
      });
    }, context);
  }

  unifyTargetStatement(substitution, context) {
    let targetStatemnentUnifies = false;

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

    reconcile((specificContext) => {
      const statementUnifies = generalStatement.unifyStatement(specificStatement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        targetStatemnentUnifies = true;
      }
    }, specificContext);

    if (targetStatemnentUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's target statement with the '${generalSubstitutionString}' substitution's target statement.`);
    }

    return targetStatemnentUnifies;
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

    reconcile((specificContext) => {
      return generalStatement.unifyStatement(specificStatement, generalContext, specificContext, (statementUnifies) => {
        let replacementStatemnentUnifies = false;

        if (statementUnifies) {
          specificContext.commit(context);

          replacementStatemnentUnifies = true;
        }

        if (replacementStatemnentUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement statement with the '${generalSubstitutionString}' substitution's replacement statement.`);
        }

        return continuation(replacementStatemnentUnifies);
      });
    }, specificContext);
  }

  unifyComplexSubstitution(complexSubstitution, context, continuation) {
    const simpleSubstitution = this,  ///
          simpleSubstitutionString = simpleSubstitution.getString(),  ///
          complexSubstitutionString = complexSubstitution.getString();  ///

    context.trace(`Unifying the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution...`);

    reconcile((context) => {
      return this.unifyReplacementStatement(complexSubstitution, context, (replacementStatementUnifies) => {
        let substitution = null;

        if (!replacementStatementUnifies) {
          return continuation(substitution);
        }

        let simpleSubstitutionUnifies = false;

        const soleNonTrivialDerivedSubstitution = context.getSoleNonTrivialDerivedSubstitution();

        substitution = soleNonTrivialDerivedSubstitution;  ///

        if (substitution !== null) {
          simpleSubstitutionUnifies = true;
        }

        if (simpleSubstitutionUnifies) {
          context.debug(`...unified the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution.`);
        }

        return continuation(substitution);
      });
    }, context);
  }

  resolve(context, continuation) {
    const metavariableNode = this.getMetavariableNode(),
          simpleDerivedSubstitution = context.findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode);

    if (simpleDerivedSubstitution === null) {
      return continuation();
    }

    const simpleSubstitution = simpleDerivedSubstitution, ///
          complexSubstitution = this, ///
          complexSubstitutionString = complexSubstitution.getString();

    context.trace(`Resolving the ${complexSubstitutionString}' complex substitution...`);

    return simpleSubstitution.unifyComplexSubstitution(complexSubstitution, context, (substitution) => {
      if (substitution === null) {
        return continuation();
      }

      const replacementSubstitution = substitution; ///

      substitution = this.targetStatement.getSubstitution();

      const targetSubstitution = substitution; ///

      return targetSubstitution.unifySubstitution(replacementSubstitution, context, (substitutionUnifies) => {
        if (substitutionUnifies) {
          this.resolved = true;

          context.debug(`...resolved the '${complexSubstitutionString}' complex substitution.`);
        }

        return continuation();
      });
    });
  }

  static name = "StatementSubstitution";

  static fromJSON(json, context) {
    let statementSubstitutionn = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                statementSubstitutionNode = instantiateStatementSubstitution(string, context),
                node = statementSubstitutionNode, ///
                breakPoint = breakPointFromJSON(json),
                resolved = resolvedFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext),
                targetStatement = targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, generalContext),
                replacementStatement = replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, specificContext),
                contexts = [
                  generalContext,
                  specificContext
                ];

          statementSubstitutionn = new StatementSubstitution(contexts, string, node, breakPoint, resolved, targetStatement, replacementStatement);
        }, json, context);
      }, context);
    }

    return statementSubstitutionn;
  }

  static fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext) {
    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    let statementSubstitution;

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const statementSubstitutionString = statementSubstitutionStringFromStatementAndMetavariable(statement, metavariable),
                string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context);

          statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return statementSubstitution;
  }

  static fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) {
    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    let statementSubstitution;

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const statementSubstitutionString = statementSubstitutionStringFromStatementMetavariableAndSubstitution(statement, metavariable, substitution),
                string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context);

          statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return statementSubstitution;
  }
});

function resolvedFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext) {
  const resolved = true;

  return resolved;
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
