"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";

export default define(class Error extends Element {
  getErrorNode() {
    const node = this.getNode(),
          errorNode = node; ///

    return errorNode;
  }

  verify(context, back, forward) {
    const errorString = this.getString();  ///

    context.warning(`The '${errorString}' error cannot be verified.`);

    return back(context);
  }

  static name = "Error";
});
