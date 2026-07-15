"use strict";

import { breakPointUtilities } from "occam-languages";

import Substitution from "../substitution";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { stripBracketsFromTerm } from "../../utilities/brackets";
import { instantiateTermSubstitution } from "../../process/instantiate";
import { termSubstitutionFromTermSubstitutionNode } from "../../utilities/element";
import { termSubstitutionStringFromTermAndVariable } from "../../utilities/string";
import { elide, ablates, descend, manifest, attempts, reconcile, instantiate, unserialises } from "../../utilities/context";

const { breakPointFromJSON } = breakPointUtilities;

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

  validate(context, continuatino) {
    const termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution...`);

    const validSubstitution = this.findValidSubstitution(context);

    if (validSubstitution !== null) {
      const termSubstitution = validSubstitution;  ///

      context.debug(`...the '${termSubstitutionString}' term substitution is already valid.`);

      return continuatino(termSubstitution);
    }

    const generalContext = this.getGeneralContext(),
          specificContext = this.getSpecificContext();

    attempts((generalContext, specificContext) => {
      const validateTargetTerm = this.validateTargetTerm.bind(this),
            validateReplacementTerm = this.validateReplacementTerm.bind(this);

      return all([
        validateTargetTerm,
        validateReplacementTerm
      ], generalContext, specificContext, (validates) => {
        let termSubstitution = null;

        if (validates) {
          const substitution = this;  ///

          termSubstitution = substitution; ///

          context.addSubstitution(substitution);
        }

        if (validates) {
          this.commit(generalContext, specificContext);
        }

        if (validates) {
          context.debug(`...validated the '${termSubstitutionString}' term substitution.`);
        }

        return continuatino(termSubstitution);
      });
    }, generalContext, specificContext);
  }

  validateTargetTerm(generalContext, specificContext, continuatino) {
    const context = generalContext,  ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's target term...`);

    const targetTermSingular = this.targetTerm.isSingular();

    if (!targetTermSingular) {
      const targetTermString = this.targetTerm.getString(),
            targetTermValidates = false;

      context.debug(`The '${targetTermString}' target term is not singular.`);

      return continuatino(targetTermValidates);
    }

    elide((context) => {
      return this.targetTerm.validate(context, (targetTerm) => {
        let targetTermValidates = false;

        if (targetTerm !== null) {
          targetTermValidates = true;
        }

        if (targetTermValidates) {
          context.debug(`...validated the '${termSubstitutionString}' term substitution's target term...`);
        }

        return continuatino(targetTermValidates);
      });
    }, context);
  }

  validateReplacementTerm(generalContext, specificContext, continuatino) {
    const context = specificContext,  ///
          termSubstitutionString = this.getString();  ///

    context.trace(`Validating the '${termSubstitutionString}' term substitution's replacement term...`);

    elide((context) => {
      return this.replacementTerm.validate(context, (replacementTerm) => {
        let replacementTermValidates = false;

        if (replacementTerm !== null) {
          replacementTermValidates = true;
        }

        if (replacementTermValidates) {
          context.debug(`...validated the '${termSubstitutionString}' term substitution's replacement term.`);
        }

        return continuatino(replacementTermValidates);
      });
    }, context);
  }

  unifySubstitution(substitution, context, continuation) {
    const generalSubstitution = this, ///
          specificSubstitution = substitution,
          generalSubstitutionString = generalSubstitution.getString(),
          specificSubstitutionString = specificSubstitution.getString();

    context.trace(`Unifying the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution...`);

    reconcile((context) => {
      const unifyTargetTerm = this.unifyTargetTerm.bind(this),
            unifyReplacementTerm = this.unifyReplacementTerm.bind(this);

      return all([
        unifyReplacementTerm,
        unifyTargetTerm
      ], substitution, context, (substitutionUnifies) => {
        if (substitutionUnifies) {
          context.commit();
        }

        if (substitutionUnifies) {
          context.debug(`...unified the '${specificSubstitutionString}' substitution with the '${generalSubstitutionString}' substitution.`);
        }

        return continuation(substitutionUnifies);
      });
    }, context);
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

    reconcile((specificContext) => {
      const termNode = generalTerm.getTermNode(),
            variable = variableFromTermNode(termNode, generalContext);

      if (variable === null) {
        const targetTermUnifies = false;

        return continuation(targetTermUnifies);
      }

      const term = specificTerm;  ///

      return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
        let targetTermUnifies = false;

        if (termUnifies) {
          specificContext.commit(context);

          targetTermUnifies = true;
        }

        if (targetTermUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's target term with the '${generalSubstitutionString}' substitution's target term.`);
        }

        return continuation(targetTermUnifies);
      });
    }, specificContext);
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

    reconcile((specificContext) => {
      const termNode = generalTerm.getNode(),
            variable = variableFromTermNode(termNode, generalContext);

      if (variable === null) {
        const replacementTermUnifies = false;

        return continuation(replacementTermUnifies);
      }

      const term = specificTerm;  ///

      return variable.unifyTerm(term, generalContext, specificContext, (termUnifies) => {
        let replacementTermUnifies = false;

        if (termUnifies) {
          specificContext.commit(context);

          replacementTermUnifies = true;
        }

        if (replacementTermUnifies) {
          context.trace(`...unified the '${specificSubstitutionString}' substitution's replacement term with the '${generalSubstitutionString}' substitution's replacement term.`);
        }

        return continuation(replacementTermUnifies);
      });
    }, specificContext);
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

  static fromStatementNode(statementNode, context) {
    let termSubstitution = null;

    const termSubstitutionNode = statementNode.getTermSubstitutionNode();

    if (termSubstitutionNode !== null) {
      descend((context) => {
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
      instantiate((specificContext) => {
        manifest((generalContext) => {
          const termSubstitutionString = termSubstitutionStringFromTermAndVariable(term, variable),
                string = termSubstitutionString,  ///
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
