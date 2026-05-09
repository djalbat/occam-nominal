"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { EMPTY_STRING } from "../constants";

const { last } = arrayUtilities;

export default class PhanericContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  }

  getContexts() {
    return this.contexts;
  }

  nodeAsString(node) {
    let string = EMPTY_STRING;

    this.contexts.some((context) => {
      string = context.nodeAsString(node);

      if (string !== EMPTY_STRING) {
        return true;
      }
    });

    return string;
  }

  static fromContexts(contexts) {
    const lastContext = last(contexts),
          context = lastContext,  ///
          phanericContext = new PhanericContext(context, contexts);

    return phanericContext;
  }
}
