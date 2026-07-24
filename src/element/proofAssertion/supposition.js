"use strict";

import { breakPointUtilities } from "occam-languages";

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

      return continuation(verifies);
    }

    return declare((context) => {
      return this.validate(context, (validates) => {
        let verifies = false;

        if (validates) {
          verifies = true;
        }

        if (verifies) {
          context.debug(`...verified the '${suppositionString}' supposition.`);
        }

        return continuation(verifies);
      });
    }, context);
  });

  validate(context, continuation) {
    const suppositionString = this.getString(); ///

    context.trace(`Validatting the '${suppositionString}' supposition...`);

    return attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      return exists([
        validateStatement,
        validateProcedureCall
      ], context, (validates) => {
        if (validates) {
          this.commit(context);
        }

        if (validates) {
          context.debug(`...validated the '${suppositionString}' supposition.`);
        }

        return continuation(validates);
      });
    }, context);
  }

  validateStatement(context, continuation) {
    const statement = this.getStatement();

    if (statement === null) {
      const statementValidates = false;

      return continuation(statementValidates);
    }

    const suppositionString = this.getString();

    context.trace(`Validating the '${suppositionString}' supposition's statsement...`);

    return statement.validate(context, (statement) => {
      let statementValidates = false;

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${suppositionString}' supposition's statement.`);
      }

      return continuation(statementValidates);
    });
  }

  validateProcedureCall(context, continuation) {
    const procedureCall = this.getProcedureCall();

    if (procedureCall === null) {
      const procedureCallValidates = false;

      return continuation(procedureCallValidates);
    }

    const suppositionString = this.getString();

    context.trace(`Validatting the '${suppositionString}' supposition's procedure call...`);

    return procedureCall.validate(context, (procedureCallValidates) => {
      if (procedureCallValidates) {
        context.debug(`...validated the '${suppositionString}' supposition's procedure call.`);
      }

      return continuation(procedureCallValidates);
    });
  }

  unifyIndependently(context, continuation) {
    const suppositionString = this.getString(); ///

    context.trace(`Unifying the '${suppositionString}' supposition independently...`);

    return reconcile((context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const suppositionContext = this.getContext(), ///
              generalContext = suppositionContext,  ///
              specificContext = context;  ///

        return statement.unifyIndependently(generalContext, specificContext, (statementUnifiesIndependently) => {
          let unifiesIndependently = false;

          if (statementUnifiesIndependently) {
            unifiesIndependently = true;
          }

          if (unifiesIndependently) {
            context.debug(`...unified the '${suppositionString}' supposition independently.`);
          }

          return continuation(unifiesIndependently);
        });
      }

      if (procedureCall !== null) {
        return procedureCall.unifyIndependently(context, (procedureCallResolvedIndependently) => {
          let unifiesIndependently = false;

          if (procedureCallResolvedIndependently) {
            unifiesIndependently = true;
          }

          if (unifiesIndependently) {
            context.debug(`...unified the '${suppositionString}' supposition independently.`);
          }

          return continuation(unifiesIndependently);
        });
      }
    }, context);
  }

  unifySubproof(subproof, context, continuation) {
    const suppositionString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${suppositionString}' supposition...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion === null) {
      const subproofUnifies = false;

      return continuation(subproofUnifies);
    }

    const suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = context; ///

    return reconcile((context) => {
      return subproofAssertion.unifySubproof(subproof, generalContext, specificContext, (subproofUnifies) => {
        if (subproofUnifies) {
          context.commit();
        }

        if (subproofUnifies) {
          context.debug(`...unified the '${subproofString}' subproof with the '${suppositionString}' supposition.`);
        }

        return continuation(subproofUnifies);
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

    return reconcile((specificContext) => {
      const statement = proofAssertion.getStatement();

      return this.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let proofAssertionUnifies = false;

        if (statementUnifies) {
          proofAssertionUnifies = true;

          specificContext.commit(context);
        }

        if (proofAssertionUnifies) {
          context.debug(`...unified the '${proofAssertionString}' proof assertion with the '${suppositionString}' supposition.`);
        }

        return continuation(proofAssertionUnifies);
      });
    }, specificContext);
  }

  unifySubproofOrProofAssertion(subproofOrProofAssertion, context, continuation) {
    const subproofOrProofAssertionProofAssertion = subproofOrProofAssertion.isProofAssertion();

    if (subproofOrProofAssertionProofAssertion) {
      const proofAssertion = subproofOrProofAssertion;  ///

      return this.unifyProofAssertion(proofAssertion, context, continuation);
    }

    const subproof = subproofOrProofAssertion;  ///

    return this.unifySubproof(subproof, context, continuation);
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
    return instantiate((context) => {
      return unserialise((json, context) => {
        const { string } = json,
              suppositionNode = instantiateSupposition(string, context),
              node = suppositionNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromSuppositionNode(suppositionNode, context),
              procedureCall = procedureCallFromSuppositionNode(suppositionNode, context),
              supposition = new Supposition(context, string, node, breakPoint, statement, procedureCall);

        return supposition;
      }, json, context);
    }, context);
  }
});

function statementFromSuppositionNode(suppositionNode, context) {
  const statementNode = suppositionNode.getStatementNode(),
    statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
