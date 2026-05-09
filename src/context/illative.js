"use strict";

import Context from "../context";

export default class IllativeContext extends Context {
  isStated() {
    const stated = false;

    return stated;
  }

  static fromNothing(context) {
    const illativeContext = new IllativeContext(context);

    return illativeContext;
  }
}