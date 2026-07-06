"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";
import { instantiateHypothesis } from "../process/instantiate";
import { declare, attempt, serialise, unserialise, instantiate } from "../utilities/context";
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

  async verify(context) {
    let verifies = false;

    await this.break(context);

    const hypothesisString = this.getString(); ///

    context.trace(`Verifying the '${hypothesisString}' hypothesis...`);

    if ((this.statement !== null) || (this.procedureCall !== null)) {
      declare((context) => {
        const validates = this.validate(context);

        if (validates) {
          verifies = true;
        }
      }, context)
    } else {
      context.debug(`Unable to verify the '${hypothesisString}' hypothesis because it is nonsense.`);
    }

    if (verifies) {
      context.debug(`...verified the '${hypothesisString}' hypothesis.`);
    }

    return verifies;
  }

  validate(context) {
    let validates = false;

    const hypothesisString = this.getString(); ///

    context.trace(`Validating the '${hypothesisString}' hypothesis...`);

    attempt((context) => {
      const statementValidates = this.validateStatement(context),
            procedureCallValidates =  this.validateProcedureCall(context);

      if (statementValidates || procedureCallValidates) {
        validates = true;
      }

      if (validates) {
        this.commit(context);
      }
    }, context);

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

      const statement = this.statement.validate(context);  ///

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

      const procedureCall = this.procedureCall.validate(context);  ///

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

  async dischargeGivenTerm(term, context) {
    let dischargesGivenTerm = false;

    const termString = term.getString(),
          hypothesisString = this.getString(); ///

    context.trace(`Discharging the '${hypothesisString}' hypothesis given the '${termString}' term...`);

    const procedureCallDischargesGivenTerm = await this.dischargeProcedureCallGivenTerm(term, context);

    if (procedureCallDischargesGivenTerm) {
      dischargesGivenTerm = true;
    }

    if (dischargesGivenTerm) {
      context.debug(`...discharged the '${hypothesisString}' hypothesis given the '${termString}' term.`);
    }

    return dischargesGivenTerm;
  }

  async dischargeProcedureCallGivenTerm(term, context) {
    let procedureCallDischarges = false;

    if (this.procedureCall !== null) {
      const termString = term.getString(),
            hypothesisString = this.getString();

      context.trace(`Discharging the '${hypothesisString}' hypothesis's procedure call given the '${termString}' term...`);

      const discharges = await this.procedureCall.dischargeGivenTerm(term, context);  ///

      if (discharges) {
        procedureCallDischarges = true;
      }

      if (procedureCallDischarges) {
        context.debug(`...discharged the '${hypothesisString}' hypothesis' procedure call given the '${termString}' term.`);
      }
    }

    return procedureCallDischarges;
  }

  static name = "Hypothesis";

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
