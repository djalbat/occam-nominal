"use strict";

import { Element, breakPointUtilities } from "occam-languages";

import { define } from "../elements";

const { unbreakable } = breakPointUtilities;

export default define(class Error extends Element {
  getErrorNode() {
    const node = this.getNode(),
          errorNode = node; ///

    return errorNode;
  }

  verify = unbreakable(function (context, forward, back) {
    const errorString = this.getString();  ///

    context.warning(`The '${errorString}' error cannot be verified.`);

    return back();
  });

  static name = "Error";
});
