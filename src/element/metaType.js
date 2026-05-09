"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";
import { breakPointToBreakPointJSON } from "../utilities/breakPoint";

export default define(class MetaType extends Element {
  constructor(context, string, node, breakPoint, name) {
    super(context, string, node, breakPoint);

    this.name = name;
  }

  getName() {
    return this.name;
  }

  getMetaTypeNode() {
    const node = this.getNode(),
          metaTypeNode = node;  ///

    return metaTypeNode;
  }

  isEqualTo(metaType) {
    const equalTo = (this === metaType);

    return equalTo;
  }

  compareMetaTypeName(metaTypeName) {
    const comparesToMetaTypeName = (metaTypeName === this.name);

    return comparesToMetaTypeName;
  }

  static name = "MetaType";

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
    const { string } = json,
          metaTypeName = string,  ///
          metaType = context.findMetaTypeByMetaTypeName(metaTypeName);

    return metaType;
  }

  static fromName(name, context) {
    const string = name,  ///
          node = null,
          breakPoint = null,
          metaType = new MetaType(context, string, node, breakPoint, name);

    return metaType;
  }
});
