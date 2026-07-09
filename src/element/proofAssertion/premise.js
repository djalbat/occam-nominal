"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import ProofAssertion from "../proofAssertion";

import { define } from "../../elements";
import { instantiatePremise } from "../../process/instantiate";
import { procedureCallFromPremiseNode } from "../../utilities/element";
import { declare, attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

const { exists } = continuationUtilities,
      { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Premise extends ProofAssertion {
  constructor(context, string, node, breakPoint, statement, procedureCall) {
    super(context, string, node, breakPoint, statement);

    this.procedureCall = procedureCall;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  getPremiseNode() {
    const node = this.getNode(),
          premiseNode = node; ///

    return premiseNode;
  }

  getStatementNode() {
    const premiseNode = this.getPremiseNode(),
          statementNode = premiseNode.getStatementNode();

    return statementNode;
  }

  findSubproofAssertion() {
    let subproofAssertion = null;

    const statementNode = this.getStatementNode();

    if (statementNode !== null) {
      const subproofAssertionNode = statementNode.getSubproofAssertionNode();

      if (subproofAssertionNode !== null) {
        const context = this.getContext();

        subproofAssertion = context.findAssertionByAssertionNode(subproofAssertionNode);
      }
    }

    return subproofAssertion;
  }

  isNonsensical() {
    const statement = this.getStatement(),
          procedureCall = this.getProcedureCall(),
          nonsensical = ((statement === null) && (procedureCall === null));

    return nonsensical;
  }

  verify = breakable(function (context, continuation) {
    const premiseString = this.getString();

    context.trace(`Verifying the '${premiseString}' premise...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${premiseString}' premise because it is nonsense.`);

      continuation(verifies);

      return;
    }

    declare((context) => {
      this.validate(context, (validates) => {
        let verifies = false;

        if (validates) {
          verifies = true;
        }

        if (verifies) {
          context.debug(`...verified the '${premiseString}' premise.`);
        }

        continuation(verifies);
      });
    }, context);
  });

  validate(context, continuation) {
    const premiseString = this.getString(); ///

    context.trace(`Validatting the '${premiseString}' premise...`);

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      exists([
        validateStatement,
        validateProcedureCall
      ], context, (validates) => {
        if (validates) {
          this.commit(context);
        }

        if (validates) {
          context.debug(`...validated the '${premiseString}' premise.`);
        }

        continuation(validates);
      });
    }, context);
  }

  validateStatement(context, continuation) {
    const statement = this.getStatement();

    if (statement === null) {
      const statementValidates = false;

      continuation(statementValidates);

      return;
    }

    const premiseString = this.getString();

    context.trace(`Validating the '${premiseString}' premise's statsement...`);

    statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${premiseString}' premise's statement.`);
      }

      continuation(statementValidates);
    });
  }

  validateProcedureCall(context, continuation) {
    const procedureCall = this.getProcedureCall();

    if (procedureCall === null) {
      const procedureCallValidates = false;

      continuation(procedureCallValidates);

      return;
    }

    const premiseString = this.getString();

    context.trace(`Validatting the '${premiseString}' premise's procedure call...`);

    this.procedureCall.validate(context, (procedureCallValidates) => {
      if (procedureCallValidates) {
        context.debug(`...validated the '${premiseString}' premise's procedure call.`);
      }

      continuation(procedureCallValidates);
    });
  }

  async unifyIndependently(context) {
    let unifiesIndependently = false;

    const premiseString = this.getString(); ///

    context.trace(`Unifying the '${premiseString}' premise independently...`);

    await reconcile(async (context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const premiseContext = this.getContext(), ///
              generalContext = premiseContext,  ///
              specificContext = context,  ///
              statementUnifiesIndependently = statement.unifyIndependently(generalContext, specificContext);

        if (statementUnifiesIndependently) {
          unifiesIndependently = true;
        }
      }

      if (procedureCall !== null) {
        const procedureCallResolvedIndependently = await procedureCall.unifyIndependently(context);

        if (procedureCallResolvedIndependently) {
          unifiesIndependently = true;
        }
      }
    }, context);

    if (unifiesIndependently) {
      context.debug(`...unified the '${premiseString}' premise independently.`);
    }

    return unifiesIndependently;
  }

  unifySubproof(subproof, context) {
    let subproofUnifies = false;

    const premiseString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${premiseString}' premise...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion !== null) {
      const premiseContext = this.getContext(), ///
            generalContext = premiseContext, ///
            specificContext = context; ///

      subproofUnifies = subproofAssertion.unifySubproof(subproof, generalContext, specificContext);
    }

    if (subproofUnifies) {
      context.debug(`...unified the '${subproofString}' subproof with the '${premiseString}' premise.`);
    }

    return subproofUnifies;
  }

  async unifyProofAssertion(proofAssertion, context) {
    let proofAssertionUnifies = false;

    const premiseString = this.getString(), ///
          proofAssertionString = proofAssertion.getString();

    context.trace(`Unifying the '${proofAssertionString}' proof assertion with the '${premiseString}' premise...`);

    const proofAssertionContext = proofAssertion.getContext(),
          premiseContext = this.getContext(), ///
          generalContext = premiseContext, ///
          specificContext = proofAssertionContext;  ///

    await reconcile(async (specificContext) => {
      const statement = proofAssertion.getStatement(),
            statementUnifies = await this.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        proofAssertionUnifies = true;

        specificContext.commit(context);
      }
    }, specificContext);

    if (proofAssertionUnifies) {
      context.debug(`...unified the '${proofAssertionString}' proof assertion with the '${premiseString}' premise.`);
    }

    return proofAssertionUnifies;
  }

  unifySubproofOrProofAssertion(subproofOrProofAssertion, context) {
    let subproofOrProofAssertionUnifies;

    const premiseString = this.getString(), ///
          subproofOrProofAssertionString = subproofOrProofAssertion.getString();

    context.trace(`Unifying the '${subproofOrProofAssertionString}' subproof or proof assertion with the '${premiseString}' premise...`);

    const subproofOrProofAssertionProofAssertion = subproofOrProofAssertion.isProofAssertion(),
          proofAssertion = subproofOrProofAssertionProofAssertion ?
                             subproofOrProofAssertion :
                               null,
          subproof = subproofOrProofAssertionProofAssertion ?
                       null :
                         subproofOrProofAssertion;

    reconcile((context) => {
      if (proofAssertion !== null) {
        const proofAssertionUnifies = this.unifyProofAssertion(proofAssertion, context);

        if (proofAssertionUnifies) {
          subproofOrProofAssertionUnifies = true;
        }
      }

      if (subproof !== null) {
        const subproofUnifies = this.unifySubproof(subproof, context);

        if (subproofUnifies) {
          subproofOrProofAssertionUnifies = true;
        }
      }

      if (subproofOrProofAssertionUnifies) {
        context.commit();
      }
    }, context);

    if (subproofOrProofAssertionUnifies) {
      context.debug(`...unified the '${subproofOrProofAssertionString}' subproof or proof assertion with the '${premiseString}' premise.`);
    }

    return subproofOrProofAssertionUnifies;
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

  static name = "Premise";

  static fromJSON(json, context) {
    let premise;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              premiseNode = instantiatePremise(string, context),
              node = premiseNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromPremiseNode(premiseNode, context),
              procedureCall = procedureCallFromPremiseNode(premiseNode, context);

        premise = new Premise(context, string, node, breakPoint, statement, procedureCall);
      }, json, context);
    }, context);

    return premise;
  }
});

function statementFromPremiseNode(premiseNode, context) {
  const statementNode = premiseNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
