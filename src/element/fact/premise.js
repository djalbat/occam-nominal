"use strict";

import { breakPointUtilities } from "occam-languages";

import Fact from "../fact";

import { all } from "../../utilities/continuation";
import { define } from "../../elements";
import { instantiatePremise } from "../../process/instantiate";
import { procedureCallFromPremiseNode } from "../../utilities/element";
import { declare, attempt, reconcile, serialise, unserialise, instantiate } from "../../utilities/context";

const { breakable, breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Premise extends Fact {
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
    const premiseString = this.getString(); ///

    context.trace(`Verifying the '${premiseString}' premise...`);

    const nonsensical = this.isNonsensical();

    if (nonsensical) {
      const verifies = false;

      context.debug(`Unable to verify the '${premiseString}' premise because it is nonsense.`);

      return continuation(verifies, context);
    }

    return declare((context) => {
      let validates;

      attempt((context) => {
        validates = this.validate(context, (premise, context) => true);

        if (validates) {
          this.commit(context);
        }
      }, context);

      if (!validates) {
        const verifies = false;

        return continuation(verifies, context);
      }

      const verifies = true;

      if (verifies) {
        context.debug(`...verified the '${premiseString}' premise.`);
      }

      return continuation(verifies, context);
    }, context);
  });

  validate(context, continuation) {
    let validates;

    const premiseString = this.getString(); ///

    context.trace(`Validating the '${premiseString}' premise...`);

    const validateStatement = this.validateStatement.bind(this),
          validateProcedureCall = this.validateProcedureCall.bind(this);

    validates = all([
      validateStatement,
      validateProcedureCall
    ], context, (context) => {
      const premise = this;  ///

      return continuation(premise, context);
    });

    if (validates) {
      context.debug(`...validated the '${premiseString}' premise.`);
    }

    return validates;
  }

  validateStatement(context, continuation) {
    let statementValidates = true;  ///

    const statement = this.getStatement();

    if (statement !== null) {
      const premiseString = this.getString();  ///

      context.trace(`Validating the '${premiseString}' premise's statement...`);

      statementValidates = statement.validate(context, (statement, context) => {
        return continuation(context);
      });

      if (statementValidates) {
        context.trace(`...validated the '${premiseString}' premise's statement.`);
      }
    }

    return statementValidates;
  }

  validateProcedureCall(context, continuation) {
    let procedureCallValidates = true;  ///

    const procedureCall = this.getProcedureCall();

    if (procedureCall !== null) {
      const premiseString = this.getString();  ///

      context.trace(`Validating the '${premiseString}' premise's procedure call...`);

      procedureCallValidates = procedureCall.validate(context, (procedureCall, context) => {
        return continuation(context);
      });

      if (procedureCallValidates) {
        context.trace(`...validated the '${premiseString}' premise's procedure call.`);
      }
    }

    return procedureCallValidates;
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
        return procedureCall.unifyIndependently(context, (procedureCallResolvedIndependently) => {
          let unifiesIndependently = false;

          if (procedureCallResolvedIndependently) {
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
              procedureCall = procedureCallFromPremiseNode(premiseNode, context),
              premise = new Premise(context, string, node, breakPoint, statement, procedureCall);

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
