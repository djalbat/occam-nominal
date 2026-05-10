"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { evaluate, instantiate } from "../utilities/context";
import { instantiateNominalProcedureCall } from "../process/instantiate";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";
import { parametersFromNominalProcedureCallNode, procedureReferenceFromNominalProcedureCallNode } from "../utilities/element";

export default define(class NominalProcedureCall extends Element {
  constructor(context, string, node, breakPoint, parameters, procedureReference) {
    super(context, string, node, breakPoint);

    this.parameters = parameters;
    this.procedureReference = procedureReference;
  }

  getParameters() {
    return this.parameters;
  }

  getProcedureReference() {
    return this.procedureReference;
  }

  getNominalProcedureCallNode() {
    const node = this.getNode(),
          nominalProcedureCallNode = node;

    return nominalProcedureCallNode;
  }

  getProcedureName() { return this.procedureReference.getProcedureName(); }

  findNodes(context) {
    const substitutions = context.getSubstitutions(),
          nodes = this.parameters.map((parameter) => {
            const node = parameter.findNode(substitutions);

            return node;
          });

    return nodes;
  }

  validate(context) {
    let validates = false;

    const nominalProcedureCallString = this.getString(); ///

    context.trace(`Validating the '${nominalProcedureCallString}' nominal procedure call...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName);

    if (procedure !== null) {
      const procedureBoolean = procedure.isBoolean();

      if (procedureBoolean) {
        validates = true;
      } else {
        context.debug(`The '${nominalProcedureCallString}' procedure is not boolean.`);
      }
    } else {
      context.debug(`The '${nominalProcedureCallString}' procedure is not present.`);
    }

    if (validates) {
      context.debug(`...validated the '${nominalProcedureCallString}' nominal procedure call.`);
    }

    return validates;
  }

  async unifyIndependently(context) {
    let unifiesIndependently = false;

    const nominalProcedureCallString = this.getString(); ///

    context.trace(`Unifying the '${nominalProcedureCallString}' nominal procedure call independently...`);

    const procedureName = this.getProcedureName(),
          procedure = context.findProcedureByProcedureName(procedureName),
          nodes = this.findNodes(context);

    let term = null;

    try {
      term = await evaluate(procedure, nodes, context);
    } catch (exception) {
      const message = exception.getMessage();

      context.info(message);
    }

    if (term !== null) {
      const boolean = term.isBoolean();

      if (!boolean) {
        context.info(`The '${nominalProcedureCallString}' nominal procedure call did not return a boolean.`);
      } else {
        const primitiveValue = term.getPrimitiveValue();

        if (primitiveValue) {
          unifiesIndependently = true;
        }
      }
    }

    if (unifiesIndependently) {
      context.debug(`...unified the '${nominalProcedureCallString}' nominal procedure call independently.`);
    }

    return unifiesIndependently;
  }

  static name = "NominalProcedureCall";

  toJSON() {
    const string = this.getString();

    let breakPoint;

    breakPoint = this.getBreakPoint();

    const breakPointJSON = breakPointToBreakPointJSON(breakPoint);

    breakPoint = breakPointJSON;  ///

    const json = {
      string,
      breakPoint
    };

    return json;
  }

  static fromJSON(json, context) {
    return instantiate((context) => {
      const { string } = json,
            nominalProcedureCallNode = instantiateNominalProcedureCall(string, context),
            node = nominalProcedureCallNode,  ///
            breakPoint = breakPointFromJSON(json),
            parameters = parametersFromNominalProcedureCallNode(json, context),
            procedureReference = procedureReferenceFromNominalProcedureCallNode(json, context);

      context = null;

      const nominalProcedureCall = new NominalProcedureCall(context, string, node, breakPoint, parameters, procedureReference);

      return nominalProcedureCall;
    }, context);
  }
});
