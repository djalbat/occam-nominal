"use strict";

import Substitution from "../substitution";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { stripBracketsFromStatement } from "../../utilities/brackets";
import { instantiateStatementSubstitution } from "../../process/instantiate";
import { statementSubstitutionFromStatementSubstitutionNode } from "../../utilities/element";
import { elide, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";
import { statementSubstitutionStringFromStatementAndMetavariable, statementSubstitutionStringFromStatementMetavariableAndSubstitution } from "../../utilities/string";

export default define(class StatementSubstitution extends Substitution {
  constructor(contexts, string, node, breakPoint, resolved, substitution, targetStatement, replacementStatement) {
    super(contexts, string, node, breakPoint);

    this.resolved = resolved;
    this.substitution = substitution;
    this.targetStatement = targetStatement;
    this.replacementStatement = replacementStatement;
  }

  isResolved() {
    return this.resolved;
  }

  getSubstitution() {
    return this.substitution;
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

  getMetavariableNode() { return this.targetStatement.getMetavariableNode(); }

  isSimple() {
    const simple = (this.substitution === null);

    return simple;
  }

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

  validate(substitution, context) {
    let statementSubstitution = null;

    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution...`);

    let validates = false;

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution) {
      validates = true;

      statementSubstitution = validSubstitution;  ///

      context.debug(`...the '${statementSubstitutionString}' statement substitution is already valid.`);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const targetStatementValidates = this.validateTargetStatement(generalContext, specificContext);

        if (targetStatementValidates) {
          const replacementStatementValidates = this.validateReplacementStatement(generalContext, specificContext);

          if (replacementStatementValidates) {
            const substitutionValidates = this.validateSubstitution(substitution, generalContext, specificContext);

            if (substitutionValidates) {
              validates = true;
            }
          }
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }
      }, generalContext, specificContext);

      if (validates) {
        const substitution = this;  ///

        statementSubstitution = substitution; ///

        context.addSubstitution(substitution);
      }
    }

    if (validates) {
      context.debug(`...validated the '${statementSubstitutionString}' statement substitution.`);
    }

    return statementSubstitution;
  }

  validateSubstitution(substitution, generalContext, specificContext) {
    let substitutionValidates = true;

    if (substitution !== null) {
      const context = generalContext,  ///
            statementSubstitutionString = this.getString(); ///

      context.trace(`Validating the '${statementSubstitutionString}' statement substitution's substitution...`);

      this.substitution = substitution;

      substitutionValidates = true;

      if (substitutionValidates) {
        context.debug(`...validatewd the '${statementSubstitutionString}' statement substitution's substitution.`);
      }
    }

    return substitutionValidates;
  }

  validateTargetStatement(generalContext, specificContext) {
    let targetStatementValidates = false;

    const context = generalContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's target statement...`);

    const targetStatementSingular = this.targetStatement.isSingular();

    if (targetStatementSingular) {
      manifest((context) => {
        elide((context) => {
          const targetStatement = this.targetStatement.validate(context);

          if (targetStatement !== null) {
            targetStatementValidates = true;
          }
        }, context);
      }, specificContext, context);
    } else {
      const targetStatementString = this.targetStatement.getString();

      context.debug(`The '${targetStatementString}' target statement is not singular.`);
    }

    if (targetStatementValidates) {
      context.debug(`...validated the '${statementSubstitutionString}' statement substitution's target statement...`);
    }

    return targetStatementValidates;
  }

  validateReplacementStatement(generalContext, specificContext) {
    let replacementStatementValidates = false;

    const context = specificContext,  ///
          statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's replacement statement...`);

    elide((context) => {
      const replacementStatement = this.replacementStatement.validate(context);

      if (replacementStatement !== null) {
        replacementStatementValidates = true;
      }
    }, context);

    if (replacementStatementValidates) {
      context.debug(`...validated the '${statementSubstitutionString}' statement substitution's replacement statement.`);
    }

    return replacementStatementValidates;
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

  unifyReplacementStatement(substitution, context) {
    let replacementStatemnentUnifies = false;

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
      const statementUnifies = generalStatement.unifyStatement(specificStatement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        replacementStatemnentUnifies = true;
      }
    }, specificContext);

    if (replacementStatemnentUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement statement with the '${generalSubstitutionString}' substitution's replacement statement.`);
    }

    return replacementStatemnentUnifies;
  }

  unifyComplexSubstitution(complexSubstitution, context) {
    let substitution = null;

    const simpleSubstitution = this,  ///
          simpleSubstitutionString = simpleSubstitution.getString(),  ///
          complexSubstitutionString = complexSubstitution.getString();  ///

    context.trace(`Unifying the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution...`);

    let simpleSubstitutionUnifies = false;

    reconcile((context) => {
      const replacementStatementUnifies = this.unifyReplacementStatement(complexSubstitution, context);

      if (replacementStatementUnifies) {
        const soleNonTrivialDerivedSubstitution = context.getSoleNonTrivialDerivedSubstitution();

        substitution = soleNonTrivialDerivedSubstitution;  ///
      }
    }, context);

    if (substitution !== null) {
      simpleSubstitutionUnifies = true;
    }

    if (simpleSubstitutionUnifies) {
      context.debug(`...unified the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution.`);
    }

    return substitution;
  }

  resolve(context) {
    const metavariableNode = this.getMetavariableNode(),
          simpleDerivedSubstitution = context.findSimpleDerivedSubstitutionByMetavariableNode(metavariableNode);

    if (simpleDerivedSubstitution !== null) {
      const simpleSubstitution = simpleDerivedSubstitution, ///
            complexSubstitution = this, ///
            complexSubstitutionString = complexSubstitution.getString();

      context.trace(`Resolving the ${complexSubstitutionString}' complex substitution...`);

      const substitution = simpleSubstitution.unifyComplexSubstitution(complexSubstitution, context);

      if (substitution !== null) {
        const simpleSubstitutionUnifies = this.substitution.unifySubstitution(substitution, context);

        if (simpleSubstitutionUnifies) {
          this.resolved = true;

          context.debug(`...resolved the '${complexSubstitutionString}' complex substitution.`);
        }
      }
    }
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
                resolved = resolvedFromStatementSubstitutionNode(statementSubstitutionNode, context),
                substitution = substitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext),
                targetStatement = targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, generalContext),
                replacementStatement = replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, specificContext),
                contexts = [
                  generalContext,
                  specificContext
                ];

          statementSubstitutionn = new StatementSubstitution(contexts, string, node, breakPoint, resolved, substitution, targetStatement, replacementStatement);
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
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context,  ///
              statementSubstitutionString = statementSubstitutionStringFromStatementAndMetavariable(statement, metavariable),
              string = statementSubstitutionString, ///
              statementSubstitutionNode = instantiateStatementSubstitution(string, context);

        statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return statementSubstitution;
  }

  static fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) {
    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    let statementSubstitution;

    ablates((generalContext, specificContext) => {
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context,  ///
              statementSubstitutionString = statementSubstitutionStringFromStatementMetavariableAndSubstitution(statement, metavariable, substitution),
              string = statementSubstitutionString, ///
              statementSubstitutionNode = instantiateStatementSubstitution(string, context);

        statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return statementSubstitution;
  }
});

function resolvedFromStatementSubstitutionNode(statementSubstitutionNode, context) {
  const resolved = true;

  return resolved;
}

function substitutionFromStatementSubstitutionNode(statementSubstitutionNode, context) {
  const substitutionNode = statementSubstitutionNode.getSubstitutionNode(),
        substitution = context.findSubstitutionBySubstitutionNode(substitutionNode);

  return substitution;
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
