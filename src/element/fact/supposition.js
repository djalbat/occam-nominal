"use strict";

import { breakPointUtilities } from "occam-languages";

import Fact from "../fact";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiateSupposition } from "../../process/instantiate";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";
import { referenceFromSuppositionNode, procedureCallFromSuppositionNode } from "../../utilities/element";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Supposition extends Fact {
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
    const suppositionString = this.getString(); ///

    context.trace(`Verifying the '${suppositionString}' supposition...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${suppositionString}' supposition because it is nonsense.`);

      return continuation(verifies, context);
    }

    let validates;

    declare((state) => {
      validates = this.validate(state, context, (supposition, context) => true);
    });

    if (!validates) {
      const verifies = false;

      return continuation(verifies, context);
    }

    const verifies = true;

    if (verifies) {
      context.debug(`...verified the '${suppositionString}' supposition.`);
    }

    return continuation(verifies, context);
  });

  validate(state, context, continuation) {
    let validates;

    const suppositionString = this.getString(); ///

    context.trace(`Validating the '${suppositionString}' supposition...`);

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      validates = all([
        validateStatement,
        validateProcedureCall
      ], state, context, (state, context) => {
        let validates;

        const supposition = this;  ///

        this.commit(context);

        validates = continuation(supposition, context);

        return validates;
      });
    }, context);

    if (validates) {
      context.debug(`...validated the '${suppositionString}' supposition.`);
    }

    return validates;
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
        return procedureCall.unifyIndependently(context, (procedureCallUnifiedIndependently) => {
          let unifiesIndependently = false;

          if (procedureCallUnifiedIndependently) {
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

  unifyFact(fact, context, continuation) {
    const factString = fact.getString(),
          suppositionString = this.getString(); ///

    context.trace(`Unifying the '${factString}' fact with the '${suppositionString}' supposition...`);

    const factContext = fact.getContext(),
          suppositionContext = this.getContext(), ///
          generalContext = suppositionContext, ///
          specificContext = factContext;  ///

    return reconcile((specificContext) => {
      const statement = fact.getStatement();

      return this.unifyStatement(statement, generalContext, specificContext, (statementUnifies) => {
        let factUnifies = false;

        if (statementUnifies) {
          factUnifies = true;

          specificContext.commit(context);
        }

        if (factUnifies) {
          context.debug(`...unified the '${factString}' fact with the '${suppositionString}' supposition.`);
        }

        return continuation(factUnifies);
      });
    }, specificContext);
  }

  unifyFactOrSubproof(factOrSubproof, context, continuation) {
    const factOrSubproofFact = factOrSubproof.isFact();

    if (factOrSubproofFact) {
      const fact = factOrSubproof;  ///

      return this.unifyFact(fact, context, continuation);
    }

    const subproof = factOrSubproof;  ///

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
              reference = referenceFromSuppositionNode(suppositionNode, context),
              procedureCall = procedureCallFromSuppositionNode(suppositionNode, context),
              supposition = new Supposition(context, string, node, breakPoint, statement, reference, procedureCall);

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
