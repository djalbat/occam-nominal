"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { instantiate } from "../utilities/context";
import { instantiateProcedureReference } from "../process/instantiate";
import { nameFromProcedureReferenceNode } from "../utilities/element";
import { breakPointFromJSON, breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class ProcedureReference extends Element {
  constructor(context, string, node, breakPoint, name) {
    super(context, string, node, breakPoint);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  getProcedureReferenceNode() {
    const node = this.getNode(),
          procedureReferenceNode = node;  ///

    return procedureReferenceNode;
  }

  getProcedureName() {
    const procedureName = this.name;  ///

    return procedureName;
  }

  static name = "ProcedureReference";

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
            procedureReferenceNode = instantiateProcedureReference(string, context),
            node = procedureReferenceNode,  ///
            breakPoint = breakPointFromJSON(json),
            name = nameFromProcedureReferenceNode(procedureReferenceNode, context);

      context = null;

      const procedureReference = new ProcedureReference(context, string, node, breakPoint, name);

      return procedureReference;
    }, context);
  }
});
