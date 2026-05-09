"use strict";

import Context from "../context";

export default class AphasicContext extends Context {
  addAssignment(assignment) {
    ///
  }

  static fromNothing(context) {
    const aphasicContext = new AphasicContext(context);

    return aphasicContext;
  }
}
