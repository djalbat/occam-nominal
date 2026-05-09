"use strict";

import MnemicContext from "../context/mnemic";
import NestedContext from "../context/nested";
import TheticContext from "../context/thetic";
import AphasicContext from "../context/aphasic";
import BoundedContext from "../context/bounded";
import NominalContext from "../context/nominal";
import LiteralContext from "../context/literal";
import LiminalContext from "../context/liminal";
import PhanericContext from "../context/phaneric";
import IllativeContext from "../context/illative";
import BranchingContext from "../context/branching";
import NominalFileContext from "../context/file/nominal";

import { mnemicContextFromJSON, mnemicContextsFromJSON, mnemicContextToMnemicContextJSON, mnemicContextsToMnemicContextsJSON } from "../utilities/json";

export function evaluate(procedure, terms) {
  const context = procedure.getContext();

  return procedure.call(terms, context);
}

export function ground(innerFunction) {
  let context;

  const nominalContext = NominalContext.fromNothing();

  context = nominalContext; ///

  const literalContext = LiteralContext.fromNothing(context);

  context = literalContext;  ///

  return innerFunction(context);
}

export function declare(innerFunction, context) {
  const theticContext = TheticContext.fromNothing(context);

  context = theticContext;  ///

  return innerFunction(context);
}

export function derive(innerFunction, context) {
  const illativeContext = IllativeContext.fromNothing(context);

  context = illativeContext;  ///

  return innerFunction(context);
}

export function elide(innerFunction, context) {
  const aphasicContext = AphasicContext.fromNothing(context);

  context = aphasicContext;  ///

  return innerFunction(context);
}

export function enclose(innerFunction, context) {
  const boundedContext = BoundedContext.fromNothing(context);

  context = boundedContext;  ///

  return innerFunction(context);
}

export function encapsulate(innerFunction, metaLevelAssumptions, context) {
  const boundedContext = BoundedContext.fromMetaLevelAssumptions(metaLevelAssumptions, context);

  context = boundedContext;  ///

  return innerFunction(context);
}

export function choose(innerFunction, context) {
  const branchingContext = BranchingContext.fromNothing(context);

  context = branchingContext;  ///

  return innerFunction(context);
}

export function descend(innerFunction, context) {
  const nestedContext = NestedContext.fromNothing(context);

  context = nestedContext;  ///

  return innerFunction(context);
}

export function ablate(innerFunction, context) {
  const unreleased = context.isUnreleased();

  if (unreleased) {
    context = ablateContext(context); ///
  }

  return innerFunction(context);
}

export function attempt(innerFunction, context) {
  const unreleased = context.isUnreleased();

  if (unreleased) {
    const mnemicContext = MnemicContext.fromNothing(context);

    context = mnemicContext;  ///
  }

  return innerFunction(context);
}

export function reconcile(innerFunction, context) {
  const liminalContext = LiminalContext.fromNothing(context);

  context = liminalContext;  ///

  return innerFunction(context);
}

export function serialise(innerFunction, context) {
  const mnemicContext = context, ///
        mnemicContextJSON = mnemicContextToMnemicContextJSON(mnemicContext),
        contextJSON = mnemicContextJSON; ///

  context = contextJSON;  ///

  return innerFunction(context);
}

export function unserialise(innerFunction, json, context) {
  const mnemicContext = mnemicContextFromJSON(json, context);

  context = mnemicContext; ///

  return innerFunction(json, context);
}

export function unserialises(innerFunction, json, context) {
  const mnemicContexts = mnemicContextsFromJSON(json, context),
        contexts = mnemicContexts; ///

  return innerFunction(json, ...contexts);
}

export function instantiate(innerFunction, context) {
  const literalContext = LiteralContext.fromNothing(context);

  context = literalContext;  ///

  return innerFunction(context);
}

export function manifest(innerFunction, ...contexts) {
  const phanericContext = PhanericContext.fromContexts(contexts),
        context = phanericContext;  ///

  return innerFunction(context);
}

export function attempts(innerFunction, ...contexts) {
  contexts = contexts.map((context) => {  ///
    const unreleased = context.isUnreleased();

    if (unreleased) {
      const mnemicContext = MnemicContext.fromNothing(context);

      context = mnemicContext;  ///
    }

    return context;
  });

  return innerFunction(...contexts);
}

export function serialises(innerFunction, ...contexts) {
  const mnemicContexts = contexts, ///
        mnemicContextsJSON = mnemicContextsToMnemicContextsJSON(mnemicContexts),
        contextsJSON = mnemicContextsJSON; ///

  contexts = contextsJSON;  ///

  return innerFunction(...contexts);
}

export function ablates(innerFunction, ...contexts) {
  contexts = contexts.map((context) => {  ///
    const unreleased = context.isUnreleased();

    if (unreleased) {
      context = ablateContext(context); ///
    }

    return context;
  });

  return innerFunction(...contexts);
}

function ablateContext(context) {
    let contextGroundedContext = isContextGroundedContext(context);

    while (!contextGroundedContext) {
      context = context.getContext();

      contextGroundedContext = isContextGroundedContext(context);
    }

  return context;
}

function isContextGroundedContext(context) {
  const contextTheticContext = (context instanceof TheticContext),
        contextIllativeContext = (context instanceof IllativeContext),
        contextNominalFileContext = (context instanceof NominalFileContext),
        contextGroundedContext = (contextTheticContext || contextIllativeContext || contextNominalFileContext);

  return contextGroundedContext;
}
