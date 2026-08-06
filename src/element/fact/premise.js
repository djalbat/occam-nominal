"use strict";

import { breakPointUtilities } from "occam-languages";

import Fact from "../fact";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { declare } from "../../utilities/state";
import { instantiatePremise } from "../../process/instantiate";
import { referenceFromPremiseNode, procedureCallFromPremiseNode } from "../../utilities/element";
import { attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Premise extends Fact {
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
    const premiseString = this.getString(); ///

    context.trace(`Verifying the '${premiseString}' premise...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${premiseString}' premise because it is nonsense.`);

      return continuation(verifies, context);
    }

    let validates;

    declare((state) => {
      validates = this.validate(state, context, (premise, context) => true);
    });

    if (!validates) {
      const verifies = false;

      return continuation(verifies, context);
    }

    const verifies = true;

    if (verifies) {
      context.debug(`...verified the '${premiseString}' premise.`);
    }

    return continuation(verifies, context);
  });

  validate(state, context, continuation) {
    let validates;

    const premiseString = this.getString(); ///

    context.trace(`Validating the '${premiseString}' premise...`);

    attempt((context) => {
      const validateStatement = this.validateStatement.bind(this),
            validateProcedureCall = this.validateProcedureCall.bind(this);

      validates = all([
        validateStatement,
        validateProcedureCall
      ], state, context, (state, context) => {
        let validates;

        const premise = this;  ///

        this.commit(context);

        validates = continuation(premise, context);

        return validates;
      });
    }, context);

    if (validates) {
      context.debug(`...validated the '${premiseString}' premise.`);
    }

    return validates;
  }

  unifyIndependently(context, continuation) {
    const premiseString = this.getString(); ///

    context.trace(`Unifying the '${premiseString}' premise independently...`);

    return reconcile((context) => {
      const statement = this.getStatement(),
            procedureCall = this.getProcedureCall();

      if (statement !== null) {
        const premiseContext = this.getContext(), ///
              generalContext = premiseContext,  ///
              specificContext = context;  ///

        return statement.unifyIndependently(generalContext, specificContext, (statementUnifiesIndependently) => {
          let unifiesIndependently = false;

          if (statementUnifiesIndependently) {
            unifiesIndependently = true;
          }

          if (unifiesIndependently) {
            context.debug(`...unified the '${premiseString}' premise independently.`);
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
            context.debug(`...unified the '${premiseString}' premise independently.`);
          }

          return continuation(unifiesIndependently);
        });
      }
    }, context);
  }

  unifySubproof(subproof, context, continuation) {
    const premiseString = this.getString(), ///
          subproofString = subproof.getString();

    context.trace(`Unifying the '${subproofString}' subproof with the '${premiseString}' premise...`);

    const subproofAssertion = this.findSubproofAssertion();

    if (subproofAssertion === null) {
      const subproofUnifies = false;

      return continuation(subproofUnifies);
    }

    const premiseContext = this.getContext(), ///
          generalContext = premiseContext, ///
          specificContext = context;  ///

    return reconcile((context) => {
      return subproofAssertion.unifySubproof(subproof, generalContext, specificContext, (subproofUnifies) => {
        if (subproofUnifies) {
          context.commit();
        }

        if (subproofUnifies) {
          context.debug(`...unified the '${subproofString}' subproof with the '${premiseString}' premise.`);
        }

        return continuation(subproofUnifies);
      });
    }, context);
  }

  unifyFact(fact, context, continuation) {
    const factString = fact.getString(),
          premiseString = this.getString(); ///

    context.trace(`Unifying the '${factString}' fact with the '${premiseString}' premise...`);

    const factContext = fact.getContext(),
          premiseContext = this.getContext(), ///
          generalContext = premiseContext, ///
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
          context.debug(`...unified the '${factString}' fact with the '${premiseString}' premise.`);
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

  static name = "Premise";

  static fromJSON(json, context) {
    return instantiate((context) => {
      return unserialise((json, context) => {
        const { string } = json,
              premiseNode = instantiatePremise(string, context),
              node = premiseNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromPremiseNode(premiseNode, context),
              reference = referenceFromPremiseNode(premiseNode, context),
              procedureCall = procedureCallFromPremiseNode(premiseNode, context),
              premise = new Premise(context, string, node, breakPoint, statement, reference, procedureCall);

        return premise;
      }, json, context);
    }, context);
  }
});

function statementFromPremiseNode(premiseNode, context) {
  const statementNode = premiseNode.getStatementNode(),
        statement = context.findStatementByStatementNode(statementNode);

  return statement;
}
