"use strict";

import { Element } from "occam-languages";

import { define } from "../elements";

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
