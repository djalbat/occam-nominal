"use strict";

import Context from "../context";

export default class KrasicContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  }

  getContexts() {
    return this.contexts;
  }

  getInferredSubstitutions(inferredSubstitutions = []) {
    const context = this.getContext(),
          contexts = [
            context,
            ...this.contexts
          ];

    contexts.forEach((context) => {
      context.getInferredSubstitutions(inferredSubstitutions);
    })

    return inferredSubstitutions;
  }

  static fromContexts(contexts) {
    contexts = [  ///
      ...contexts
    ];

    const context = contexts.shift(),
          krasicContext = new KrasicContext(context, contexts);

    return krasicContext;
  }
}
