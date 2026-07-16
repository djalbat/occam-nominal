"use strict";

import Context from "../context";

export default class AmnesicContext extends Context {
  addSubstitution(substitution) {
    ///
  }

  static fromNothing(context) {
    const amnesicContext = new AmnesicContext(context);

    return amnesicContext;
  }
}
