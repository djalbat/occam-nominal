"use strict";

import Context from "../context";

export default class TheticContext extends Context {
  isStated() {
    const stated = true;

    return stated;
  }

  static fromNothing(context) {
    const theticContext = new TheticContext(context);

    return theticContext;
  }
}