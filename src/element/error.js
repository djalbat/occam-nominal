"use strict";

import { Element, continuationUtilities } from "occam-languages";

import { define } from "../elements";

const { breakable } = continuationUtilities;

export default define(class Error extends Element {
  getErrorNode() {
    const node = this.getNode(),
          errorNode = node; ///

    return errorNode;
  }

  async verify(context) {
    let verifies = false;

    const errorString = this.getString();  ///

    context.warning(`The '${errorString}' error cannot be verified.`);

    return verifies;
  }

  static name = "Error";
});
