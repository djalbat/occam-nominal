"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { stripBracketsFromTerm } from "../../utilities/brackets";
import { instantiateTermSubstitution } from "../../process/instantiate";
import { termSubstitutionFromTermSubstitutionNode } from "../../utilities/element";
import { termSubstitutionStringFromTermAndVariable } from "../../utilities/string";
import { join, pass, waive, elide, ablate, ablates, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

const { asynchronousAll } = continuationUtilities,
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

  validate(strict, context, continuation) {
    if (continuation === undefined) {
      continuation = context; ///

      context = strict; ///

      strict = false;
    }

    let validates;

    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution...`);

    let substitution;

    substitution = this.findSubstitution(context);

    if (substitution !== null) {
      const termSubstitution = substitution;  ///

      context.debug(`...the '${termSubstitutionString}' term substitution is already presenet.`);

      validates = continuation(termSubstitution, context);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      (strict ? pass : waive)((context) => {
        attempts((generalContext, specificContext) => {
          const validateTargetTerm = this.validateTargetTerm.bind(this),
                validateReplacementTerm = this.validateReplacementTerm.bind(this);

          validates = all([
            validateTargetTerm,
            validateReplacementTerm
          ], generalContext, specificContext, () => {
            let validates;

            substitution = this;  ///

            context.addSubstitution(substitution);

            this.commit(generalContext, specificContext);

            const termSubstitution = substitution; ///

            validates = continuation(termSubstitution, context);

            return validates;
          });
        }, generalContext, specificContext);
      }, context);
    }

    if (validates) {
      context.debug(`...validated the '${termSubstitutionString}' term substitution.`);
    }

    return validates;
  }

  validateTargetTerm(generalContext, specificContext, continuation) {
    let targetTermValidates;

    const context = generalContext,  ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's target term...`);

    const targetTermSingular = this.targetTerm.isSingular();

    if (targetTermSingular) {
      elide((context) => {
        targetTermValidates = this.targetTerm.validate(context, (targetTerm, context) => {
          const generalContext = context; ///

          return continuation(generalContext, specificContext);
        });
      }, context);
    } else {
      const targetTermString = this.targetTerm.getString();

      targetTermValidates = false;

      context.debug(`The '${targetTermString}' target term is not singular.`);
    }

    if (targetTermValidates) {
      context.trace(`...validated the '${termSubstitutionString}' term substitution's target term.`);
    }

    return targetTermValidates;
  }

  validateReplacementTerm(generalContext, specificContext, continuation) {
    let replacementTermValidates;

    const context = specificContext,  ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's replacement term...`);

    elide((context) => {
      replacementTermValidates = this.replacementTerm.validate(context, (replacementTerm, context) => {
        const specificContext = context;  ///

        return continuation(generalContext, specificContext);
      });
    }, context);

    if (replacementTermValidates) {
      context.debug(`...validated the '${termSubstitutionString}' term substitution's replacement term.`);
    }

    return replacementTermValidates;
  }

  unifySimpleSubstitution(simpleSuubstitution, context, continuation) {
    const substitutionString = this.getString(),  ///
          simpleSubstitutionString = simpleSuubstitution.getString();

    context.trace(`Unifying the '${simpleSubstitutionString}' simple substitution with the '${substitutionString}' substitution...`);

    return reconcile((context) => {
      const substitution = simpleSuubstitution, ///
            unifyTargetTerm = this.unifyTargetTerm.bind(this),
            unifyReplacementTerm = this.unifyReplacementTerm.bind(this);

      return asynchronousAll([
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

  unifyReplacementTerm(substitution, context, continuation) {
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
        return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
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

  unifyTargetTerm(substitution, context, continuation) {
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
        return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
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
    const { name } = json;

    if (this.name !== name) {
      return;
    }

    return instantiate((context) => {
      return unserialises((json, generalContext, specificContext) => {
        const { string } = json,
              termSubstitutionNode = instantiateTermSubstitution(string, context),
              node = termSubstitutionNode,  ///
              contexts = [
                generalContext,
                specificContext
              ],
              breakPoint = breakPointFromJSON(json),
              targetTerm = targetTermFromTermSubstitutionNode(termSubstitutionNode, generalContext),
              replacementTerm = replacementTermFromTermSubstitutionNode(termSubstitutionNode, specificContext),
              termSubstitutionn = new TermSubstitution(contexts, string, node, breakPoint, targetTerm, replacementTerm);

        return termSubstitutionn;
      }, json, context);
    }, context);
  }

  static fromStatementNode(statementNode, context) {
    let termSubstitution = null;

    const termSubstitutionNode = statementNode.getTermSubstitutionNode();

    if (termSubstitutionNode !== null) {
      ablate((context) => {
        const generalContext = context, ///
              specificContext = context;  ///

        termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);
      }, context);
    }

    return termSubstitution;
  }

  static fromTermAndVariable(term, variable, generalContext, specificContext) {
    const context = specificContext;  ///

    term = stripBracketsFromTerm(term, context); ///

    return ablates((generalContext, specificContext) => {
      return instantiate((specificContext) => {
        return manifest((generalContext) => {
          const termSubstitutionString = termSubstitutionStringFromTermAndVariable(term, variable),
                string = termSubstitutionString,  ///
                context = specificContext,  ///
                termSubstitutionNode = instantiateTermSubstitution(string, context),
                termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);

          return termSubstitution;
        }, generalContext, specificContext);
      }, specificContext);
    }, generalContext, specificContext);
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
