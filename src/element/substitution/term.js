"use strict";

import Substitution from "../substitution";

import { define } from "../../elements";
import { breakPointFromJSON } from "../../utilities/breakPoint";
import { stripBracketsFromTerm } from "../../utilities/brackets";
import { instantiateTermSubstitution } from "../../process/instantiate";
import { termSubstitutionFromTermSubstitutionNode } from "../../utilities/element";
import { termSubstitutionStringFromTermAndVariable } from "../../utilities/string";
import { elide, ablate, manifest, attempts, reconcile, ablates, instantiate, unserialises } from "../../utilities/context";

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

  compareTerm(term, context) {
    term = stripBracketsFromTerm(term, context); ///

    const replacementTermEqualToTerm = this.replacementTerm.isEqualTo(term),
          comparedToTerm = replacementTermEqualToTerm; ///

    return comparedToTerm;
  }

  compareParameter(parameter) {
    const targetTermComparesToParameter = this.targetTerm.compareParameter(parameter),
          comparesToParameter = targetTermComparesToParameter;  ///

    return comparesToParameter;
  }

  validate(context) {
    let termSubstitution = null;

    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution...`);

    let validates = false;

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution) {
      validates = true;

      termSubstitution = validSubstitution; ///

      context.debug(`...the '${termSubstitutionString}' term substitution is already valid.`);
    } else {
      const generalContext = this.getGeneralContext(),
            specificContext = this.getSpecificContext();

      attempts((generalContext, specificContext) => {
        const targetTermValidates = this.validateTargetTerm(generalContext, specificContext);

        if (targetTermValidates) {
          const replacementTermValidates = this.validateReplacementTerm(generalContext, specificContext);

          if (replacementTermValidates) {
            validates = true;
          }
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }
      }, generalContext, specificContext);

      if (validates) {
        const substitution = this;  ///

        termSubstitution = substitution;  ///

        context.addSubstitution(substitution);
      }
    }

    if (validates) {
      context.debug(`...validated the '${termSubstitutionString}' term substitution.`);
    }

    return termSubstitution;
  }

  validateTargetTerm(generalContext, specificContext) {
    let targetTermValidates = false;

    const context = generalContext, ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's target term...`);

    const targetTermSingular = this.targetTerm.isSingular();

    if (targetTermSingular) {
      manifest((context) => {
        elide((context) => {
          const targetTerm = this.targetTerm.validate(context, (targetTerm, context) => {
            const validatesForwards = true;

            return validatesForwards;
          });

          if (targetTerm !== null) {
            this.targetTerm = targetTerm;

            targetTermValidates = true;
          }
        }, context);
      }, specificContext, context);
    } else {
      const targetTermString = this.targetTerm.getString();

      context.debug(`The '${targetTermString}' target term is not singular.`);
    }

    if (targetTermValidates) {
      context.debug(`...validated the '${termSubstitutionString}' term substitution's target term...`);
    }

    return targetTermValidates;
  }

  validateReplacementTerm(generalContext, specificContext) {
    let replacementTermValidates = false;

    const context = specificContext,  ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's replacement term...`);

    elide((context) => {
      const replacementTerm = this.replacementTerm.validate(context, (replacementTerm, context) => {
        const validatesForwards = true;

        return validatesForwards;
      });

      if (replacementTerm !== null) {
        this.replacementTerm = replacementTerm;

        replacementTermValidates = true;
      }
    }, context);

    if (replacementTermValidates) {
      context.debug(`...validated the '${termSubstitutionString}' term substitution's replacement term...`);
    }

    return replacementTermValidates;
  }

  unifySubstitution(substitution, context) {
    let substitutionUnifies = false;

    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution...`);

    reconcile((context) => {
      const replacementTermUnifies = this.unifyReplacementTerm(substitution, context);

      if (replacementTermUnifies) {
        const targetTermUnifies = this.unifyTargetTerm(substitution, context);

        if (targetTermUnifies) {
          context.commit();

          substitutionUnifies = true;
        }
      }
    }, context);

    if (substitutionUnifies) {
      context.debug(`...unified the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution.`);
    }

    return substitutionUnifies;
  }

  unifyTargetTerm(substitution, context) {
    let targetTermUnifies = false;

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

    reconcile((specificContext) => {
      const termNode = generalTerm.getNode(),
            variable = variableFromTermNode(termNode, generalContext);

      if (variable !== null) {
        const term = specificTerm,  ///
              termUnifies = variable.unifyTerm(term, generalContext, specificContext);

        if (termUnifies) {
          specificContext.commit(context);

          targetTermUnifies = true;
        }
      }
    }, specificContext);

    if (targetTermUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's target term with the '${generalSubstitutionString}' substitution's target term.`);
    }

    return targetTermUnifies;
  }

  unifyReplacementTerm(substitution, context) {
    let replacementTermUnifies = false;

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

    reconcile((specificContext) => {
      const termNode = generalTerm.getNode(),
            variable = variableFromTermNode(termNode, generalContext);

      if (variable !== null) {
        const term = specificTerm,  ///
              termUnifies = variable.unifyTerm(term, generalContext, specificContext);

        if (termUnifies) {
          specificContext.commit(context);

          replacementTermUnifies = true;
        }
      }
    }, specificContext);

    if (replacementTermUnifies) {
      context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement term with the '${generalSubstitutionString}' substitution's replacement term.`);
    }

    return replacementTermUnifies;
  }

  static name = "TermSubstitution";

  static fromJSON(json, context) {
    let termSubstitutionn = null;

    const { name } = json;

    if (this.name === name) {
      instantiate((context) => {
        unserialises((json, generalContext, specificContext) => {
          const { string } = json,
                termSubstitutionNode = instantiateTermSubstitution(string, context),
                node = termSubstitutionNode,  ///
                breakPoint = breakPointFromJSON(json),
                targetTerm = targetTermFromTermSubstitutionNode(termSubstitutionNode, generalContext),
                replacementTerm = replacementTermFromTermSubstitutionNode(termSubstitutionNode, specificContext),
                contexts = [
                  generalContext,
                  specificContext
                ];

          termSubstitutionn = new TermSubstitution(contexts, string, node, breakPoint, targetTerm, replacementTerm);
        }, json, context);
      }, context);
    }

    return termSubstitutionn;
  }

  static fromStatement(statement, context) {
    let termSubstitution = null;

    const termSubstitutionNode = statement.getTermSubstitutionNode();

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

    let termSubstitution;

    ablates((generalContext, specificContext) => {
      const context = specificContext;  ///

      instantiate((context) => {
        const specificContext = context, ///
              termSubstitutionString = termSubstitutionStringFromTermAndVariable(term, variable),
              string = termSubstitutionString,  ///
              termSubstitutionNode = instantiateTermSubstitution(string, context);

        termSubstitution = termSubstitutionFromTermSubstitutionNode(termSubstitutionNode, generalContext, specificContext);
      }, context);
    }, generalContext, specificContext);

    return termSubstitution;
  }
});

function variableFromTermNode(termNode, generalContext) {
  let variable = null;

  const variableNode = termNode.getVariableNode();

  if (variableNode !== null) {
    variable = generalContext.findVariableByVariableNode(variableNode);
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
