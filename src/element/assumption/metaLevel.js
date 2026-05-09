"use strict";

import { Element } from "occam-languages";

import { define } from "../../elements";
import { unifyStatement } from "../../process/unify";
import { stripBracketsFromStatement } from "../../utilities/brackets";
import { instantiateMetaLevelAssumption } from "../../process/instantiate";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../../utilities/breakPoint";
import { metaLevelAssumptionFromMetaLevelAssumptionNode } from "../../utilities/element";
import { metaLevelAssumptionStringFromReferenceAndStatement } from "../../utilities/string";
import { ablate, attempt, descend, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

export default define(class MetaLevelAssumption extends Element {
  constructor(context, string, node, breakPoint, reference, statement) {
    super(context, string, node, breakPoint);

    this.reference = reference;
    this.statement = statement;
  }

  getReference() {
    return this.reference;
  }

  getStatement() {
    return this.statement;
  }

  getMetaLevelAssumptionNode() {
    const node = this.getNode(),
          metaLevelAssumptionNode = node;  ///

    return metaLevelAssumptionNode;
  }

  getMetavariable() { return this.reference.getMetavariable(); }

  getTopLevelMetaAssertion() { return this.reference.getTopLevelMetaAssertion(); }

  isEqualTo(metaLevelAssumption) {
    const metaLevelAssumptionNode = metaLevelAssumption.getNode(),
          metaLevelAssumptionNodeMatches = this.matchMetaLevelAssumptionNode(metaLevelAssumptionNode),
          equalTo = metaLevelAssumptionNodeMatches;  ///

    return equalTo;
  }

  matchMetaLevelAssumptionNode(metaLevelAssumptionNode) {
    const node = metaLevelAssumptionNode, ///
          nodeMatches = this.matchNode(node),
          metaLevelAssumptionNodeMatches = nodeMatches; ///

    return metaLevelAssumptionNodeMatches;
  }

  findValidMetaLevelAssumption(context) {
    const metaLevelAssumptionNode = this.getMetaLevelAssumptionNode(),
          metaLevelAssumption = context.findMetaLevelAssumptionByMetaLevelAssumptionNode(metaLevelAssumptionNode),
          validMetaLevelAssumption = metaLevelAssumption;  ///

    return validMetaLevelAssumption;
  }

  validate(context) {
    let metaLevelAssumption = null;

    const metaLevelAssumptionString = this.getString();  ///

    context.trace(`Validating the '${metaLevelAssumptionString}' meta-lLevel assumption...`);

    let validates = false;

    const validMetaLevelAssumption = this.findValidMetaLevelAssumption(context);

    if (validMetaLevelAssumption) {
      validates = true;

      metaLevelAssumption = validMetaLevelAssumption; ///

      context.debug(`...the '${metaLevelAssumptionString}' meta-level assumption is already valid.`);
    } else {
      const temporaryContext = context; ///

      context = this.getContext();

      attempt((context) => {
        const statementValidates = this.validateStatement(context);

        if (statementValidates) {
          const referenceValidates = this.validateReference(context);

          if (referenceValidates) {
            const stated = context.isStated();

            let validatesWhenStated = false,
              validatesWhenDerived = false;

            if (stated) {
              validatesWhenStated = this.validateWhenStated(context);
            } else {
              validatesWhenDerived = this.validateWhenDerived(context);
            }

            if (validatesWhenStated || validatesWhenDerived) {
              validates = true;
            }
          }
        }

        if (validates) {
          this.commit(context);
        }
      }, context);

      context = temporaryContext; ///

      if (validates) {
        metaLevelAssumption = this;  ///

        context.addMetaLevelAssumption(metaLevelAssumption);
      }
    }

    if (validates) {
      context.debug(`...validated the '${metaLevelAssumptionString}' meta-level assumption.`);
    }

    return metaLevelAssumption;
  }

  validateReference(context) {
    let referenceValidates = false;

    const metaLevelAssumptionString = this.getString();  ///

    context.trace(`Validating the '${metaLevelAssumptionString}' meta-level assumption's reference...`);

    const reference = this.reference.validate(context);

    if (reference !== null) {
      const context = reference.getContext(),
            metavariable = this.reference.getMetavariable(),
            metavariablePresent = context.isMetavariablePresent(metavariable, context);

      if (metavariablePresent) {
        this.reference = reference;

        referenceValidates = true;
      }
    }

    if (referenceValidates) {
      context.debug(`...validated the '${metaLevelAssumptionString}' meta-level assumption's reference.`);
    }

    return referenceValidates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const metaLevelAssumptionString = this.getString();  ///

    context.trace(`Validating the '${metaLevelAssumptionString}' meta-level assumption's statement...`);

    descend((context) => {
      const statement = this.statement.validate(context);

      if (statement !== null) {
        statementValidates = true;
      }
    }, context);

    if (statementValidates) {
      context.debug(`...validated the '${metaLevelAssumptionString}' meta-level assumption's statement.`);
    }

    return statementValidates;
  }

  validateWhenStated(context) {
    let validatesWhenStated;

    const metaLevelAssumptionString = this.getString();  ///

    context.trace(`Validating the '${metaLevelAssumptionString}' stated meta-level assumption...`);

    validatesWhenStated = true

    if (validatesWhenStated) {
      context.debug(`...validated the '${metaLevelAssumptionString}' stated meta-level assumption.`);
    }

    return validatesWhenStated;
  }

  validateWhenDerived(context) {
    let validatesWhenDerived;

    const metaLevelAssumptionString = this.getString();  ///

    context.trace(`Validating the '${metaLevelAssumptionString}' derived meta-level assumption...`);

    validatesWhenDerived = true;

    if (validatesWhenDerived) {
      context.debug(`...validated the '${metaLevelAssumptionString}' derived meta-level assumption.`);
    }

    return validatesWhenDerived;
  }

  unifyAssumption(assumption, context) {
    let assumptionUnifies = false;

    const assumptionString = assumption.getString(),  ///
          metaLevelAssumptionString = this.getString();

    context.trace(`Unifying the '${assumptionString}' assumption with the '${metaLevelAssumptionString}' meta-level assumption...`);

    const metaLevelAssumptionContext = this.getContext(), ///
          assumptionContext = assumption.getContext(), ///
          generalContext = metaLevelAssumptionContext,
          specificContext = assumptionContext;  ///

    reconcile((specificContext) => {
      const reference = assumption.getReference(),
            referneceUnifies = this.unifyReference(reference, generalContext, specificContext);

      if (referneceUnifies) {
        const statement = assumption.getStatement(),
              statementUnifieds = this.unifyStatement(statement, generalContext, specificContext);

        if (statementUnifieds) {
          specificContext.commit(context);

          assumptionUnifies = true;
        }
      }
    }, specificContext);

    if (assumptionUnifies) {
      context.debug(`...unified the '${assumptionString}' assumption with the '${metaLevelAssumptionString}' meta-level assumption...`);
    }

    return assumptionUnifies;
  }

  unifyReference(reference, generalContext, specificContext) {
    let referenceUnifies;

    const context = specificContext,  ///
          referenceString = reference.getString(),
          metaLevelAssumptionString = this.getString(); ///

    context.trace(`Unifying the '${referenceString}' reference with the '${metaLevelAssumptionString}' meta-level assumption's reference...`);

    const metavariable = this.getMetavariable();

    referenceUnifies = metavariable.unifyReference(reference, generalContext, specificContext);

    if (referenceUnifies) {
      context.debug(`..unified the '${referenceString}' with the '${metaLevelAssumptionString}' meta-level assumption's reference.`);
    }

    return referenceUnifies;
  }

  unifyStatement(statement, generalContext, specificContext) {
    let statementUnifies;

    const context = specificContext,  ///
          statementString = statement.getString(),
          metaLevelAssumptionString = this.getString(); ///

    context.trace(`Unifying the '${statementString}' statement with the '${metaLevelAssumptionString}' meta-level assumption's statement...`);

    const generalStatement = this.statement,  ///
          specificStatement = stripBracketsFromStatement(statement, context);  ///

    statementUnifies = unifyStatement(generalStatement, specificStatement, generalContext, specificContext);

    if (statementUnifies) {
      context.debug(`...unified the '${statementString}' statement with the '${metaLevelAssumptionString}' meta-level assumption's statement.`);
    }

    return statementUnifies;
  }

  toJSON() {
    const context = this.getContext();

    return serialise((context) => {
      const string = this.getString();

      let breakPoint;

      breakPoint = this.getBreakPoint();

      const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

      breakPoint = breakPointJSON;  ///

      const json = {
        context,
        string,
        breakPoint
      };

      return json;
    }, context);
  }

  static name = "MetaLevelAssumption";

  static fromJSON(json, context) {
    let metaLevelAssumption;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              metaLevelAssumptionNode = instantiateMetaLevelAssumption(string, context),
              node = metaLevelAssumptionNode,  ///
              breakPoint = breakPointFromJSON(json),
              reference = referenceFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context),
              statement = statementFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context);

        metaLevelAssumption = new MetaLevelAssumption(context, string, node, breakPoint, reference, statement);
      }, json, context);
    }, context);

    return metaLevelAssumption;
  }

  static fromStep(step, context) {
    let metaLevelAssumption;

    let statement;

    statement = step.getStatement();

    statement = stripBracketsFromStatement(statement, context); ///

    const reference = step.getReference();

    ablate((context) => {
      instantiate((context) => {
        const metaLevelAssumptionString = metaLevelAssumptionStringFromReferenceAndStatement(reference, statement),
              string = metaLevelAssumptionString,  ///
              metaLevelAssumptionNode = instantiateMetaLevelAssumption(string, context);

        metaLevelAssumption = metaLevelAssumptionFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context);
      }, context);
    }, context);

    return metaLevelAssumption;
  }
});

function referenceFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context) {
  const referenceNode = metaLevelAssumptionNode.getReferenceNode(),
        refernece = context.findReferenceByReferenceNode(referenceNode);

  return refernece;
}

function statementFromMetaLevelAssumptionNode(metaLevelAssumptionNode, context) {
  const statementNode = metaLevelAssumptionNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
