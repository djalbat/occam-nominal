"use strict";

import Context from "../context";

import { EMPTY_STRING } from "../constants";

export default class PhanericContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  }

  getContexts() {
    return this.contexts;
  }

  nullifyContext() {
    const context = null;

    this.setContext(context);
  }

  attach(context) {
    this.setContext(context);
  }

  detach() {
    const context = this.getContext();

    this.nullifyContext();

    return context;
  }

  nodeAsString(node) {
    let string = EMPTY_STRING;

    const context = this.getContext(),
          contexts = [
            context,
            ...this.contexts
          ];

    contexts.some((context) => {
      string = context.nodeAsString(node);

      if (string !== EMPTY_STRING) {
        return true;
      }
    });

    return string;
  }

  static fromContexts(contexts) {
    contexts = [  ///
      ...contexts
    ];

    const context = contexts.shift(),
          phanericContext = new PhanericContext(context, contexts);

    return phanericContext;
  }
}
