"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { all } from "../utilities/continuation";
import { define } from "../elements";
import { declare } from "../utilities/state";
import { instantiateHypothesis } from "../process/instantiate";
import { attempt, serialise, unserialise, instantiate } from "../utilities/context";
import { statementFromHypothesisNode, procedureCallFromHypothesisNode } from "../utilities/element";

const { breakPointFromJSON, breakPointToBreakPointJSON } = breakPointUtilities;

export default define(class Hypothesis extends Element {
  constructor(context, string, node, breakPoint, statement, procedureCall) {
    super(context, string, node, breakPoint);

    this.statement = statement;
    this.procedureCall = procedureCall;
  }

  getStatement() {
    return this.statement;
  }

  getProcedureCall() {
    return this.procedureCall;
  }

  getHypothesisNode() {
    const node = this.getNode(),
          hypothesisNode = node;  ///

    return hypothesisNode;
  }

  verify(context) {
    let verifies = false;

    this.break(context);

    const hypothesisString = this.getString(); ///

    context.trace(`Verifying the '${hypothesisString}' hypothesis...`);

    if ((this.statement !== null) || (this.procedureCall !== null)) {
      declare((state) => {
        const validates = this.validate(state, context);

        if (validates) {
          verifies = true;
        }
      })
    } else {
      context.debug(`Unable to verify the '${hypothesisString}' hypothesis because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${hypothesisString}' hypothesis.`);
    }

    return verifies;
  }

  validate(state, context, continuation) {
    let validates;

    const specificContext = context,  ///
          hypothesisString = this.getString();  ///

    context.trace(`Validating the '${hypothesisString}' hypothesis...`);

    let hypothesis;

    hypothesis = this.findConstraint(context);

    if (hypothesis !== null) {
      context.debug(`The '${hypothesisString}' hypothesis is already present.`);

      validates = continuation(hypothesis, context);
    } else {
      hypothesis = this;  ///

      context = this.getContext();

      attempt((context) => {
        const validateStatement = this.validateStatement.bind(this),
              validateProcedureCall = this.validateProcedureCall.bind(this);

        validates = all([
          validateStatement,
          validateProcedureCall
        ], state, context, (state, context) => {
          let validates;

          this.commit(context);

          context = specificContext;  ///

          validates = continuation(hypothesis, context);

          return validates;
        });
      }, context);
    }

    context = specificContext;  ///

    if (validates) {
      context.debug(`...validated the '${hypothesisString}' hypothesis.`);
    }

    return validates;
  }

  validateStatement(context) {
    let statementValidates = false;

    if (this.statement !== null) {
      const hypothesisString = this.getString();

      context.trace(`Validating the '${hypothesisString}' hypothesis's statement...`);

      const statement = this.statement.validate(state, context);  ///

      if (statement !== null) {
        statementValidates = true;
      }

      if (statementValidates) {
        context.debug(`...validated the '${hypothesisString}' hypothesis's statement.`);
      }
    }

    return statementValidates;
  }

  validateProcedureCall(context) {
    let procedureCallValidates = false;

    if (this.procedureCall !== null) {
      const hypothesisString = this.getString();

      context.trace(`Validating the '${hypothesisString}' hypothesis's procedure call...`);

      const procedureCall = this.procedureCall.validate(state, context);  ///

      if (procedureCall !== null) {
        procedureCallValidates = true;
      }

      if (procedureCallValidates) {
        context.debug(`...validated the '${hypothesisString}' hypothesis's procedure call.`);
      }
    }

    return procedureCallValidates;
  }

  discharge(context) {
    let discharges = false;

    const hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis...`);

    const statementDischarges = this.dischargeStatement(context);

    if (statementDischarges) {
      discharges = true;
    }

    if (discharges) {
      context.debug(`...discharged the '${hypothesisString}' hypothesis.`);
    }

    return discharges;
  }

  dischargeStatement(context) {
    let statementDischarges = false;

    if (this.statement !== null) {
      const hypothesisString = this.getString();

      context.trace(`Discharging the '${hypothesisString}' hypothesis's statement...`);

      const discharges = this.statement.discharge(context);  ///

      if (discharges) {
        statementDischarges = true;
      }

      if (statementDischarges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis' statement.`);
      }
    }

    return statementDischarges;
  }

  dischargeGivenTerm(term, context) {
    let dischargesGivenTerm = false;

    const termString = term.getString(),
          hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis given the '${termString}' term...`);

    const procedureCallDischargesGivenTerm = this.dischargeProcedureCallGivenTerm(term, context);

    if (procedureCallDischargesGivenTerm) {
      dischargesGivenTerm = true;
    }

    if (dischargesGivenTerm) {
      context.debug(`...discharged the '${hypothesisString}' hypothesis given the '${termString}' term.`);
    }

    return dischargesGivenTerm;
  }

  dischargeProcedureCallGivenTerm(term, context) {
    let procedureCallDischarges = false;

    if (this.procedureCall !== null) {
      const termString = term.getString(),
            hypothesisString = this.getString();

      context.trace(`Discharging the '${hypothesisString}' hypothesis's procedure call given the '${termString}' term...`);

      const discharges = this.procedureCall.dischargeGivenTerm(term, context);  ///

      if (discharges) {
        procedureCallDischarges = true;
      }

      if (procedureCallDischarges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis' procedure call given the '${termString}' term.`);
      }
    }

    return procedureCallDischarges;
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

  static name = "Hypothesis";

  static fromJSON(json, context) {
    let hypothesis;

    instantiate((context) => {
      unserialise((json, context) => {
        const { string } = json,
              hypothesisNode = instantiateHypothesis(string, context),
              node = hypothesisNode,  ///
              breakPoint = breakPointFromJSON(json),
              statement = statementFromHypothesisNode(hypothesisNode, context),
              procedureCall = procedureCallFromHypothesisNode(hypothesisNode, context);

        hypothesis = new Hypothesis(context, string, node, breakPoint, statement, procedureCall);
      }, json, context);
    }, context);

    return hypothesis;
  }
});
