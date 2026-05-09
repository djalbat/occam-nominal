"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiateHypothesis } from "../process/instantiate";
import { statementFromHypothesisNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { declare, attempt, serialise, unserialise, instantiate } from "../utilities/context";

export default define(class Hypothesis extends Element {
  constructor(context, string, node, breakPoint, statement) {
    super(context, string, node, breakPoint);

    this.statement = statement;
  }

  getStatement() {
    return this.statement;
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

    if (this.statement !== null) {
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
      const statementValidates = this.validateStatement(context);

      if (statementValidates) {
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

  validateStatement(context) {
    let statementValidates = false;

    const hypothesisString = this.getString();

    context.trace(`Validating the '${hypothesisString}' hypothesis's statement... `);

    const statement = this.statement.validate(context);  ///

    if (statement !== null) {
      statementValidates = true;
    }

    if (statementValidates) {
      context.debug(`...validated the '${hypothesisString}' hypothesis's statement. `);
    }

    return statementValidates;
  }

  dischargeStatement(context) {
    let statementDischarges = false;

    const hypothesisString = this.getString();

    context.trace(`Discharging the '${hypothesisString}' hypothesis's statement... `);

    const discharges = this.statement.discharge(context);  ///

    if (discharges) {
      statementDischarges = true;
    }

    if (statementDischarges) {
      context.debug(`...discharged the '${hypothesisString}' hypothesis' statement. `);
    }

    return statementDischarges;
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
              statement = statementFromHypothesisNode(hypothesisNode, context);

        hypothesis = new Hypothesis(context, string, node, breakPoint, statement);
      }, json, context);
    }, context);

    return hypothesis;
  }
});
