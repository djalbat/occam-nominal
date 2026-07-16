"use strict";

import Context from "../context";

export default class KenonContext extends Context {
  static fromNothing(context) {
    const kenonContext = new KenonContext(context);

    return kenonContext;
  }
}
