"use strict";

import { breakPointUtilities, continuationUtilities } from "occam-languages";

import ProofAssertion from "../proofAssertion";

import { define } from "../../elements";
import { exists } from "../../utilities/continuation";
import { instantiateSupposition } from "../../process/instantiate";
import { procedureCallFromSuppositionNode } from "../../utilities/element";
import { declare, attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Supposition extends ProofAssertion {
  constructor(context, string, node, breakPoint, statement, procedureCall) {
    super(context, string, node, breakPoint, statement);

    this.procedureCall = procedureCall;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  getSuppositionNode() {
    const node = this.getNode(),
          suppositionNode = node; ///

    return suppositionNode;
  }

  getStatementNode() {
    const suppositionNode = this.getSuppositionNode(),
          statementNode = suppositionNode.getStatementNode();

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
    const suppositionString = this.getString();

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${suppositionString}' supposition because it is nonsense.`);

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
          context.debug(`...verified the '${suppositionString}' supposition.`);
        }

        continuation(verifies);
      });
    }, context);
  });

  validate(context, continuation) {
    const suppositionString = this.getString(); ///

    context.trace(`Validatting the '${suppositionString}' supposition...`);

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
          context.debug(`...validated the '${suppositionString}' supposition.`);
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

    const suppositionString = this.getString();

    context.trace(`Validating the '${suppositionString}' supposition's statsement...`);

    statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${suppositionString}' supposition's statement.`);
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

    const suppositionString = this.getString();

    context.trace(`Validatting the '${suppositionString}' supposition's procedure call...`);

    this.procedureCall.validate(context, (procedureCallValidates) => {
      if (procedureCallValidates) {
        context.debug(`...validated the '${suppositionString}' supposition's procedure call.`);
      }

      continuation(procedureCallValidates);
    });
  }

  unifyIndependently(context) {
    let unifiesIndependently = false;

    const suppositionString = this.getString(); ///

    context.trace(`Unifying the '${suppositionString}' supposition independently...`);

    reconcile((context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const suppositionContext = this.getContext(), ///
              generalContext = suppositionContext,  ///
              specificContext = context,  ///
              statementUnifiesIndependently = statement.unifyIndependently(generalContext, specificContext);

        if (statementUnifiesIndependently) {
          unifiesIndependently = true;
        }
      }

      if (procedureCall !== null) {
        const procedureCallResolvedIndependently = procedureCall.unifyIndependently(context);

        if (procedureCallResolvedIndependently) {
          unifiesIndependently = true;
        }
      }
    }, context);

    if (unifiesIndependently) {
      context.debug(`...unified the '${suppositionString}' supposition independently.`);
    }

    return unifiesIndependently;
  }

  unifySubproof(subproof, context, continuation) {
    const suppositionString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${suppositionString}' supposition...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion === null) {
      const subproofUnifies = false;

      continuation(subproofUnifies);

      return;
    }

    const suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = context; ///

    reconcile((context) => {
      subproofAssertion.unifySubproof(subproof, generalContext, specificContext, (subproofUnifies) => {
        if (subproofUnifies) {
          context.commit();
        }

        if (subproofUnifies) {
          context.debug(`...unified the '${subproofString}' subproof with the '${suppositionString}' supposition.`);
        }

        continuation(subproofUnifies);
      });
    }, context);
  }

  unifyProofAssertion(proofAssertion, context, continuation) {
    const suppositionString = this.getString(), ///
          proofAssertionString = proofAssertion.getString();

    context.trace(`Unifying the '${proofAssertionString}' proof assertion with the '${suppositionString}' supposition...`);

    const proofAssertionContext = proofAssertion.getContext(),
          suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = proofAssertionContext;  ///

    reconcile((specificContext) => {
      const statement = proofAssertion.getStatement();

      this.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let proofAssertionUnifies = false;

        if (statementUnifies) {
          proofAssertionUnifies = true;

          specificContext.commit(context);
        }

        if (proofAssertionUnifies) {
          context.debug(`...unified the '${proofAssertionString}' proof assertion with the '${suppositionString}' supposition.`);
        }

        continuation(proofAssertionUnifies);
      });
    }, specificContext);
  }

  unifySubproofOrProofAssertion(subproofOrProofAssertion, context, continuation) {
    const subproofOrProofAssertionProofAssertion = subproofOrProofAssertion.isProofAssertion();

    if (subproofOrProofAssertionProofAssertion) {
      const proofAssertion = subproofOrProofAssertion;  ///

      this.unifyProofAssertion(proofAssertion, context, continuation);
    } else {
      const subproof = subproofOrProofAssertion;  ///

      this.unifySubproof(subproof, context, continuation);
    }
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

  static name = "Supposition";

  static fromJSON(json, context) {
    let supposition;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              suppositionNode = instantiateSupposition(string, context),
              node = suppositionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromSuppositionNode(suppositionNode, context),
              procedureCall = procedureCallFromSuppositionNode(suppositionNode, context);

        supposition = new Supposition(context, string, node, breakPoint, statement, procedureCall);
      }, json, context);
    }, context);

    return supposition;
  }
});

function statementFromSuppositionNode(suppositionNode, context) {
  const statementNode = suppositionNode.getStatementNode(),
    statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
