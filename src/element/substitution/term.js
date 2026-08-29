"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { define } from "../../elements";
import { desist, declare } from "../../utilities/state";
import { stripBracketsFromTerm } from "../../utilities/brackets";
import { instantiateTermSubstitution } from "../../process/instantiate";
import { termSubstitutionFromTermSubstitutionNode } from "../../utilities/element";
import { termSubstitutionStringFromTermAndVariable } from "../../utilities/string";
import { join, ablates, manifest, attempts, reconcile, participate, instantiate, unserialises } from "../../utilities/context";

const { unbreakable } = breakPointUtilities,
      { cut, all, isolate } = continuationUtilities;

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

  verify = unbreakable(function (context, forward, back) {
    forward = cut(forward, back); ///

    const termSubstitutionString = this.getString(); ///

    context.trace(`Verifying the '${termSubstitutionString}' term substitution...`);

    return desist((state) => {
      return declare((state) => {
        return this.validate(state, context, (termSubstitution, context , back) => {
          context.debug(`...verified the '${termSubstitutionString}' term substitution.`);

          return forward(context, back);
        }, back);
      }, state);
    });
  });

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

    return isolate((state, context, forward, back) => {
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
          this.commit(generalContext, specificContext);

          return forward(back);
        }, back);
      }, generalContext, specificContext);
    }, state, context, (state, context, back) => {
      const termSubstitution = substitution;  ///

      context.addSubstitution(substitution);

      context.debug(`...validated the '${termSubstitutionString}' term substitution.`);

      return forward(termSubstitution, context, back);
    }, back);
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

  unifySimpleSubstitution(simpleSubstitution, context, forward, back) {
    const specificCopntxt = context,  ///
          substitutionString = this.getString(),  ///
          simpleSubstitutionString = simpleSubstitution.getString();

    context.trace(`Unifying the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution...`);

    return reconcile((context) => {
      const substitution = simpleSubstitution, ///
            unifyTargetTerm = this.unifyTargetTerm.bind(this),
            unifyReplacementTerm = this.unifyReplacementTerm.bind(this);

      return all([
        unifyTargetTerm,
        unifyReplacementTerm
      ], substitution, context, (substitution, context, back) => {
        context.commit();

        context = specificCopntxt;  ///

        context.debug(`...unified the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution.`);

        return forward(context, back);
      }, back);
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
      return back();
    }

    const term = specificTerm;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return variable.unifyTerm(term, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement term with the '${generalSubstitutionString}' substitution's replacement term.`);

          return forward(substitution, context, back);
        }, back);
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
          variable = variableFromTermNode(termNode, generalContext),
          term = specificTerm;  ///

    return join((specificContext) => {
      return reconcile((specificContext) => {
        return variable.unifyTerm(term, generalContext, specificContext, (generalContext, specificContext, back) => {
          specificContext.commit(context);

          context.trace(`...unified the '${specificSubstitutionString}' substitution's target term with the '${generalSubstitutionString}' substitution's target term.`);

          return forward(substitution, context, back);
        }, back);
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
                breakPoint = null,
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
