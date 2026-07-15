"use strict";

import { arrayUtilities } from "necessary";

import Context from "../context";

import { EMPTY_STRING } from "../constants";

const { first } = arrayUtilities;

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
    const firstContext = first(contexts),
          context = firstContext,  ///
          phanericContext = new PhanericContext(context, contexts);

    return phanericContext;
  }
}
