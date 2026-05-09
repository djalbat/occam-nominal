"use strict";

import ProofAssertion from "../proofAssertion";

import { define } from "../../elements";
import { instantiateSupposition} from "../../process/instantiate";
import { procedureCallFromSuppositionNode } from "../../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../../utilities/breakPoint";
import { declare, attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const suppositionString = this.getString();

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    const statement = this.getStatement(),
          procedureCall = this.getProcedureCall();

    if ((statement !== null) || (procedureCall !== null)) {
      declare((context) => {
        const validates = this.validate(context);

        if (validates) {
          verifies = true;
        }
      }, context);
    } else {
      context.debug(`Unable to validate the '${suppositionString}' supposition because it is nonsense.`);
    }

    return verifies;
  }

  validate(context) {
    let validates = false;

    const suppositionString = this.getString(); ///

    context.trace(`Validatting the '${suppositionString}' supposition...`);

    attempt((context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const statementValidates = this.validateStatement(context);

        if (statementValidates) {
          validates = true;
        }
      }

      if (procedureCall !== null) {
        const procedureCallValidates = this.validateProcedureCall(context);

        if (procedureCallValidates) {
          validates = true;
        }
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

    if (validates) {
      context.debug(`...validated the '${suppositionString}' supposition.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    const suppositionString = this.getString();

    context.trace(`Validating the '${suppositionString}' supposition's statement... `);

    let statement;

    statement = this.getStatement();

    statement = statement.validate(context);  ///

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${suppositionString}' supposition statement. `);
    }

    return statementValidates;
  }

  validateProcedureCall(context) {
    let procedureCallValidates = false;

    const suppositionString = this.getString(), ///
          procedureCallString = this.procedureCall.getString();

    context.trace(`Validatting the '${suppositionString}' supposition's '${procedureCallString}' procedure call...`);

    const procedureCall = this.procedureCall.validate(context);

    if (procedureCall !== null) {
      procedureCallValidates =true;
    }

    if (procedureCallValidates) {
      context.debug(`...validated the '${suppositionString}' supposition's '${procedureCallString}' procedure call.`);
    }

    return procedureCallValidates;
  }

  unifySupposition(supposition, generalContext, specificContext) {
    let suppositionUnifies;

    const context = specificContext,  ///
          specificSupposition = supposition,  ///
          generalSuppositionString = this.getString(), ///
          specificSuppositionString = specificSupposition.getString();

    context.trace(`Unifying the '${specificSuppositionString}' supposition with the '${generalSuppositionString}' supposition...`);

    const statement = specificSupposition.getStatement(),
          statementUnifies = this.unifyStatement(statement, generalContext, specificContext);

    suppositionUnifies = statementUnifies;  ///

    if (suppositionUnifies) {
      context.debug(`...unified the '${specificSuppositionString}' supposition with the '${generalSuppositionString}' supposition.`);
    }

    return suppositionUnifies;
  }

  async unifyIndependently(context) {
    let unifiesIndependently = false;

    const suppositionString = this.getString(); ///

    context.trace(`Unifying the '${suppositionString}' supposition independently...`);

    await reconcile(async (context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const suppositionContext = this.getContext(),
              generalContext = suppositionContext,  ///
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
      context.debug(`...unified the '${suppositionString}' supposition independently.`);
    }

    return unifiesIndependently;
  }

  unifySubproof(subproof, context) {
    let subproofUnifies = false;

    const suppositionString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${suppositionString}' supposition...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion !== null) {
      const suppositionContext = this.getContext(),
            generalContext = suppositionContext, ///
            spsecfiicContext = context; ///

      subproofUnifies = subproofAssertion.unifySubproof(subproof, generalContext, spsecfiicContext);
    }

    if (subproofUnifies) {
      context.debug(`...unified the '${subproofString}' subproof with the '${suppositionString}' supposition.`);
    }

    return subproofUnifies;
  }

  unifyProofAssertion(proofAssertion, context) {
    let proofAssertionUnifies = false;

    const suppositionString = this.getString(), ///
          proofAssertionString = proofAssertion.getString();

    context.trace(`Unifying the '${proofAssertionString}' proof assertion with the '${suppositionString}' supposition...`);

    const proofAssertionContext = proofAssertion.getContext(),
          suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = proofAssertionContext;  ///

    reconcile((specificContext) => {
      const statement = proofAssertion.getStatement(),
            statementUnifies = this.unifyStatement(statement, generalContext, specificContext);

      if (statementUnifies) {
        specificContext.commit(context);

        proofAssertionUnifies = true;
      }
    }, specificContext);

    if (proofAssertionUnifies) {
      context.debug(`...unified the '${proofAssertionString}' proof assertion with the '${suppositionString}' supposition.`);
    }

    return proofAssertionUnifies;
  }

  unifySubproofOrProofAssertion(subproofOrProofAssertion, context) {
    let subproofOrProofAssertionUnifies;

    const suppositionString = this.getString(), ///
          subproofOrProofAssertionString = subproofOrProofAssertion.getString();

    context.trace(`Unifying the '${subproofOrProofAssertionString}' subproof or proof assertion with the '${suppositionString}' supposition...`);

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
      context.debug(`...unified the '${subproofOrProofAssertionString}' subproof or proof assertion with the '${suppositionString}' supposition.`);
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
