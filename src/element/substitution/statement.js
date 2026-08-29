"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { define } from "../../elements";
import { stripBracketsFromStatement } from "../../utilities/brackets";
import { instantiateStatementSubstitution } from "../../process/instantiate";
import { statementSubstitutionFromStatementSubstitutionNode } from "../../utilities/element";
import { ablates, manifest, attempts, reconcile, participate, instantiate, unserialises } from "../../utilities/context";
import { statementSubstitutionStringFromStatementAndMetavariable, statementSubstitutionStringFromStatementMetavariableAndSubstitution } from "../../utilities/string";
import state from "easy/lib/mixins/state";

const { cut, all, isolate } = continuationUtilities,
      { breakPointFromJSON } = breakPointUtilities;

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

  validate(state, context, forward, back) {
    forward = cut(forward, back); ///

    let substitution;

    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution...`);

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const statementSubstitution = substitution;  ///

      context.debug(`...the '${statementSubstitutionString}' statement substitution is already presenet.`);

      return forward(statementSubstitution, context, back);
    }

    return isolate((state, context, forward, back) => {
      substitution = this;  ///

      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      return attempts((generalContext, specificContext) => {
        const validateTargetStatement = this.validateTargetStatement.bind(this),
              validateReplacementStatement = this.validateReplacementStatement.bind(this);

        return all([
          validateTargetStatement,
          validateReplacementStatement
        ], state, context, generalContext, specificContext, (state, context, generalContext, specificContext) => {
          this.commit(generalContext, specificContext);

          return forward(back);
        }, back);
      }, generalContext, specificContext);
    }, state, context, (state, context, back) => {
      const statementSubstitution = substitution;  ///

      context.addSubstitution(substitution);

      context.debug(`...validated the '${statementSubstitutionString}' statement substitution.`);

      return forward(statementSubstitution, context, back);
    }, back);
  }

  validateTargetStatement(state, context, generalContext, specificContext, forward, back) {
    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's target statement...`);

    const targetStatementSingular = this.targetStatement.isSingular();

    if (!targetStatementSingular) {
      const targetStatementString = this.targetStatement.getString();

      context.debug(`The '${targetStatementString}' target statement is not singular.`);

      return back();
    }

    return this.targetStatement.validate(state, generalContext, (targetStatement, generalContext, back) => {
      this.targetStatement = targetStatement;

      context.trace(`...validated the '${statementSubstitutionString}' statement substitution's target statement.`);

      return forward(state, context, generalContext, specificContext, back);
    }, back);
  }

  validateReplacementStatement(state, context, generalContext, specificContext, forward, back) {
    const statementSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${statementSubstitutionString}' statement substitution's replacement statement...`);

    return participate((specificContext) => {
      return this.replacementStatement.validate(state, specificContext, (replacementStatement, specificContext, back) => {
        this.replacementStatement = replacementStatement;

        context.debug(`...validated the '${statementSubstitutionString}' statement substitution's replacement statement.`);

        return forward(state, context, generalContext, specificContext, back);
      }, back);
    }, specificContext, context);
  }

  unifyTargetStatement(substitution, context, forward, back) {
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
      return generalStatement.unifyStatement(specificStatement, generalContext, specificContext, (generalContext, _, back) => {
        specificContext.commit(context);

        context.trace(`...unified the '${specificSubstitutionString}' substitution's target statement with the '${generalSubstitutionString}' substitution's target statement.`);

        return forward(context, back);
      }, back);
    }, specificContext);
  }

  unifyReplacementStatement(substitution, context, forward, back) {
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
      return generalStatement.unifyStatement(specificStatement, generalContext, specificContext, (generalContext, specificContext, back) => {
        const singularNonTrivialInferredSubstitution = specificContext.getSingularNonTrivialInferredSubstitution();

        if (singularNonTrivialInferredSubstitution === null) {
          return back();
        }

        const substitution = singularNonTrivialInferredSubstitution; ///

        return forward(substitution, context, back);
      }, back);
    }, specificContext);
  }

  unifyComplexSubstitution(complexSubstitution, context, forward, back) {
    const simpleSubstitution = this,  ///
          simpleSubstitutionString = simpleSubstitution.getString(),  ///
          complexSubstitutionString = complexSubstitution.getString();  ///

    context.trace(`Unifying the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution...`);

    return this.unifyReplacementStatement(complexSubstitution, context, (substitution, context, back) => {
      context.debug(`...unified the '${complexSubstitutionString}' complex substitution with the '${simpleSubstitutionString}' simple substitution.`);

      return forward(substitution, context, back);
    }, back);
  }

  solve(context, forward, back) {
    const metavariableNode = this.getMetavariableNode(),
          simpleInferredSubstitution = context.findSimpleInferredSubstitutionByMetavariableNode(metavariableNode),
          simpleSubstitution = simpleInferredSubstitution, ///
          complexSubstitution = this, ///
          complexSubstitutionString = complexSubstitution.getString();

    if (simpleSubstitution === null) {
      context.trace(`Cannot solve the '${complexSubstitutionString}' complex substitution because there is no corresponding simple substitution.`);

      return forward(context, back);
    }

    const simpleSubstitutionString = simpleSubstitution.getString();

    context.trace(`Solving the '${complexSubstitutionString}' complex substitution given the '${simpleSubstitutionString}' simple substitution...`);

    return simpleSubstitution.unifyComplexSubstitution(complexSubstitution, context, (substitution, context, back) => {
      const simpleSubstitution = substitution; ///

      substitution = this.targetStatement.getSubstitution();

      return substitution.unifySimpleSubstitution(simpleSubstitution, context, (context, back) => {
        this.solved = true;

        context.debug(`...solved the '${complexSubstitutionString}' complex substitution given the '${simpleSubstitutionString}' simple substitution.`);

        return forward(context, back);
      }, back);
    }, (exception) => {
      if (exception) {
        return back(exception);
      }

      context.trace(`Unable to solve the '${complexSubstitutionString}' complex substitution given the '${simpleSubstitutionString}' simple substitution.`);

      return back();
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
                contexts = [
                  generalContext,
                  specificContext
                ],
                breakPoint = breakPointFromJSON(json),
                solved = solvedFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext),
                targetStatement = targetStatementFromStatementSubstitutionNode(statementSubstitutionNode, generalContext),
                replacementStatement = replacementStatementFromStatementSubstitutionNode(statementSubstitutionNode, specificContext);

          statementSubstitutionn = new StatementSubstitution(contexts, string, node, breakPoint, solved, targetStatement, replacementStatement);
        }, json, context);
      }, context);
    }

    return statementSubstitutionn;
  }

  static fromStatementAndMetavariable(statement, metavariable, generalContext, specificContext) {
    let statementSubstitution;

    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    const statementSubstitutionString = statementSubstitutionStringFromStatementAndMetavariable(statement, metavariable);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context);

          statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return statementSubstitution;
  }

  static fromStatementMetavariableAndSubstitution(statement, metavariable, substitution, generalContext, specificContext) {
    let statementSubstitution;

    const context = specificContext;  ///

    statement = stripBracketsFromStatement(statement, context); ///

    const statementSubstitutionString = statementSubstitutionStringFromStatementMetavariableAndSubstitution(statement, metavariable, substitution);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = statementSubstitutionString, ///
                context = specificContext,  ///
                statementSubstitutionNode = instantiateStatementSubstitution(string, context);

          statementSubstitution = statementSubstitutionFromStatementSubstitutionNode(statementSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return statementSubstitution;
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
