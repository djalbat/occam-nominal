"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { define } from "../../elements";
import { stripBracketsFromTerm } from "../../utilities/brackets";
import { instantiateTermSubstitution } from "../../process/instantiate";
import { termSubstitutionFromTermSubstitutionNode } from "../../utilities/element";
import { termSubstitutionStringFromTermAndVariable } from "../../utilities/string";
import {
  join,
  ablates,
  manifest,
  attempts,
  reconcile,
  instantiate,
  unserialises,
  participate
} from "../../utilities/context";

const { all } = continuationUtilities,
      { breakPointFromJSON } = breakPointUtilities;

export default define(class TermSubstitution extends Substitution {
  constructor(context, string, node, breakPoint, targetTerm, replacementTerm) {
    super(context, string, node, breakPoint);

    this.targetTerm = targetTerm;
    this.replacementTerm = replacementTerm;
  }

  getTargetTerm() {
    return this.targetTerm;
  }

  getReplacementTerm() {
    return this.replacementTerm;
  }

  getTermSubstitutionNode() {
    const node = this.getNode(),
          termSubstitutionNode = node;  ///

    return termSubstitutionNode;
  }

  getTargetNode() {
    const targetTermNode = this.targetTerm.getNode(),
          tergetNode = targetTermNode; ///

    return tergetNode;
  }

  getReplacementNode() {
    const replacementTermNode = this.replacementTerm.getNode(),
          replacementNode = replacementTermNode; ///

    return replacementNode;
  }

  getVariableNode() { return this.targetTerm.getVariableNode(); }

  isTrivial() {
    const targetTermEqualToReplacementTerm = this.targetTerm.isEqualTo(this.replacementTerm),
          trivial = targetTermEqualToReplacementTerm; ///

    return trivial;
  }

  matchVariableNode(variableNode) { return this.targetTerm.matchVariableNode(variableNode); }

  compareParameter(parameter) {
    const targetTermComparesToParameter = this.targetTerm.compareParameter(parameter),
          comparesToParameter = targetTermComparesToParameter;  ///

    return comparesToParameter;
  }

  compareTerm(term, context) {
    term = stripBracketsFromTerm(term, context); ///

    const replacementTermEqualToTerm = this.replacementTerm.isEqualTo(term),
          comparedToTerm = replacementTermEqualToTerm; ///

    return comparedToTerm;
  }

  validate(state, context, forward, back) {
    let substitution;

    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution...`);

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const termSubstitution = substitution;  ///

      context.debug(`...the '${termSubstitutionString}' term substitution is already presenet.`);

      return forward(termSubstitution, context, back);
    }

    substitution = this;  ///

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    return attempts((generalContext, specificContext) => {
      const validateTargetTerm = this.validateTargetTerm.bind(this),
            validateReplacementTerm = this.validateReplacementTerm.bind(this);

      return all([
        validateTargetTerm,
        validateReplacementTerm
      ], state, context, generalContext, specificContext, (state, context, generalContext, specificContext) => {
        const termSubstitution = substitution;  ///

        this.commit(generalContext, specificContext);

        context.addSubstitution(substitution);

        context.debug(`...validated the '${termSubstitutionString}' term substitution.`);

        return forward(termSubstitution, context, back);
      }, back);
    }, generalContext, specificContext);
  }

  validateTargetTerm(state, context, generalContext, specificContext, forward, back) {
    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's target term...`);

    const targetTermSingular = this.targetTerm.isSingular();

    if (!targetTermSingular) {
      const targetTermString = this.targetTerm.getString();

      context.debug(`The '${targetTermString}' target term is not singular.`);

      return back();
    }

    return this.targetTerm.validate(state, generalContext, (targetTerm, generalContext) => {
      this.targetTerm = targetTerm;;

      context.trace(`...validated the '${termSubstitutionString}' term substitution's target term.`);

      return forward(state, context, generalContext, specificContext, back);
    }, back);
  }

  validateReplacementTerm(state, context, generalContext, specificContext, forward, back) {
    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's replacement term...`);

    return participate((specificContext) => {
      return this.replacementTerm.validate(state, specificContext, (replacementTerm, specificContext) => {
        this.replacementTerm = replacementTerm;

        context.debug(`...validated the '${termSubstitutionString}' term substitution's replacement term.`);

        return forward(state, context, generalContext, specificContext, back);
      }, back);
    }, specificContext, context);
  }

  unifySimpleSubstitution(simpleSuubstitution, context, forward, back) {
    const substitutionString = this.getString(),  ///
          simpleSubstitutionString = simpleSuubstitution.getString();

    context.trace(`Unifying the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution...`);

    return reconcile((context) => {
      const substitution = simpleSuubstitution, ///
            unifyTargetTerm = this.unifyTargetTerm.bind(this),
            unifyReplacementTerm = this.unifyReplacementTerm.bind(this);

      return all([
        unifyReplacementTerm,
        unifyTargetTerm
      ], substitution, context, (simpleSubstitutionUnifies) => {
        const soleInferredSubstitution = context.getSoleInferredSubstitution(),
              substitution = soleInferredSubstitution; ///

        if (simpleSubstitutionUnifies) {
          context.debug(`...unified the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution.`);
        }

        return continuation(simpleSubstitutionUnifies, substitution);
      });
    }, context);
  }

  unifyReplacementTerm(substitution, context, forward, back) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's replacement term with the '${generalSubstitutionString}' substitution's replacement term...`);

    const generalSubstitutionSpecificContext = generalSubstitution.getSpecificContext(),
          specificSubstitutionSpecificContext = specificSubstitution.getSpecificContext(),
          generalSubstitutionReplacementTerm = generalSubstitution.getReplacementTerm(),
          specificSubstitutionReplacementTerm = specificSubstitution.getReplacementTerm(),
          generalContext = generalSubstitutionSpecificContext,  ///
          specificContext = specificSubstitutionSpecificContext,  ///
          generalTerm = generalSubstitutionReplacementTerm, ///
          specificTerm = specificSubstitutionReplacementTerm; ///

    const termNode = generalTerm.getTermNode(),
          variable = variableFromTermNode(termNode, generalContext);

    if (variable === null) {
      const replacementTermUnifies = false;

      return continuation(replacementTermUnifies);
    }

    const term = specificTerm;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return variable.unifyTerm(term, generalContext, specificContext, (generalContext, specificContext, back) => {
          let replacementTermUnifies = false;

          if (termUnifies) {
            specificContext.commit(context);

            replacementTermUnifies = true;
          }

          if (replacementTermUnifies) {
            context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement term with the '${generalSubstitutionString}' substitution's replacement term.`);
          }

          return continuation(replacementTermUnifies, substitution, context);
        });
      }, specificContext);
    }, specificContext, context);
  }

  unifyTargetTerm(substitution, context, forward, back) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution's target term with the '${generalSubstitutionString}' substitution's target term...`);

    const generalSubstitutionGeneralContext = generalSubstitution.getGeneralContext(),
          specificSubstitutionGeneralContext = specificSubstitution.getGeneralContext(),
          generalSubstitutionTargetTerm = generalSubstitution.getTargetTerm(),
          specificSubstitutionTargetTerm = specificSubstitution.getTargetTerm(),
          generalContext = generalSubstitutionGeneralContext,  ///
          specificContext = specificSubstitutionGeneralContext,  ///
          generalTerm = generalSubstitutionTargetTerm, ///
          specificTerm = specificSubstitutionTargetTerm; ///

    const termNode = generalTerm.getTermNode(),
          variable = variableFromTermNode(termNode, generalContext);

    if (variable === null) {
      const targetTermUnifies = false;

      return continuation(targetTermUnifies);
    }

    const term = specificTerm;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return variable.unifyTerm(term, generalContext, specificContext, (generalContext, specificContext, back) => {
          let targetTermUnifies = false;

          if (termUnifies) {
            specificContext.commit(context);

            targetTermUnifies = true;
          }

          if (targetTermUnifies) {
            context.trace(`...unified the '${specificSubstitutionString}' substitution's target term with the '${generalSubstitutionString}' substitution's target term.`);
          }

          return continuation(targetTermUnifies, substitution, context);
        });
      }, specificContext);
    }, specificContext, context);
  }

  static name = "TermSubstitution";

  static fromJSON(json, context) {
    let termSubstitutionn;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                termSubstitutionNode = instantiateTermSubstitution(string, context),
                node = termSubstitutionNode,  ///
                contexts = [
                  generalContext,
                  specificContext
                ],
                breakPoint = breakPointFromJSON(json),
                targetTerm = targetTermFromTermSubstitutionNode(termSubstitutionNode, generalContext),
                replacementTerm = replacementTermFromTermSubstitutionNode(termSubstitutionNode, specificContext);

          termSubstitutionn = new TermSubstitution(contexts, string, node, breakPoint, targetTerm, replacementTerm);
        }, json, context);
      }, context);
    }

    return termSubstitutionn;
  }

  static fromStatementNode(statementNode, context) {
    let termSubstitution = null;

    const termSubstitutionNode = statementNode.getTermSubstitutionNode();

    if (termSubstitutionNode !== null) {
      const generalContext = context, ///
            specificContext = context,  ///
            termSubstitutionString = context.nodeAsString(termSubstitutionNode);

      ablates((generalContext, specificContext) => {
        instantiate((specificContext) => {
          manifest((generalContext) => {
            const string = termSubstitutionString,  ///
                  context = specificContext,  ///
                  termSubstitutionNode = instantiateTermSubstitution(string, context);

            termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);
          }, generalContext, specificContext);
        }, specificContext);
      }, generalContext, specificContext);
    }

    return termSubstitution;
  }

  static fromTermAndVariable(term, variable, generalContext, specificContext) {
    let termSubstitution;

    const context = specificContext;  ///

    term = stripBracketsFromTerm(term, context); ///

    const termSubstitutionString = termSubstitutionStringFromTermAndVariable(term, variable);

    ablates((generalContext, specificContext) => {
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const string = termSubstitutionString,  ///
                context = specificContext,  ///
                termSubstitutionNode = instantiateTermSubstitution(string, context);

          termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);

    return termSubstitution;
  }
});

function variableFromTermNode(termNode, generalContext) {
  let variable = null;

  const variableNode = termNode.getVariableNode();

  if (variableNode !== null) {
    const variableIdentifier = variableNode.getVariableIdentifier(),
          declaredVariable = generalContext.findDeclaredVariableByVariableIdentifier(variableIdentifier);

    variable = declaredVariable;  ///
  }

  return variable;
}

function targetTermFromTermSubstitutionNode(termSubstitutionNode, generalContext) {
  const targetTermNode = termSubstitutionNode.getTargetTermNode(),
        targetTerm = generalContext.findTermByTermNode(targetTermNode);

  return targetTerm;
}

function replacementTermFromTermSubstitutionNode(termSubstitutionNode, specificContext) {
  const replacementTermNode = termSubstitutionNode.getReplacementTermNode(),
        replacementTerm = specificContext.findTermByTermNode(replacementTermNode);

  return replacementTerm;
}
