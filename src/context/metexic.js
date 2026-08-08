"use strict";

import Context from "../context";

export default class MetexicContext extends Context {
  constructor(context, contexts) {
    super(context);

    this.contexts = contexts;
  }

  getContexts() {
    return this.contexts;
  }

  getDeclaredVariables(declaredVariables = []) {
    const context = this.getContext(),
          contexts = [
            context,
            ...this.contexts
          ];

    contexts.forEach((context) => {
      context.getDeclaredVariables(declaredVariables);
    })

    return declaredVariables;
  }

  findDeclaredVariableByVariableIdentifier(variableIdentifier) {
    const declaredVariables = this.getDeclaredVariables(),
          declaredVariable = declaredVariables.find((declaredVariable) => {
            const variableComparesToVariableIdentifier = declaredVariable.compareVariableIdentifier(variableIdentifier);

            if (variableComparesToVariableIdentifier) {
              return true;
            }
          }) || null;

    return declaredVariable;
  }

  findDeclaredVariablesByVariableIdentifier(variableIdentifier) {
    let declaredVariables;

    declaredVariables = this.getDeclaredVariables();

    declaredVariables = declaredVariables.filter((declaredVariable) => {
      const variableComparesToVariableIdentifier = declaredVariable.compareVariableIdentifier(variableIdentifier);

      if (variableComparesToVariableIdentifier) {
        return true;
      }
    });

    return declaredVariables;
  }

  static fromContexts(contexts) {
    contexts = [  ///
      ...contexts
    ];

    const context = contexts.shift(),
          metexicContext = new MetexicContext(context, contexts);

    return metexicContext;
  }
}
