"use strict";

import { DERIVED, TRANSIENT } from "../constants";

export function desist(innerFunction, state = 0) {
  state = (state | TRANSIENT);

  return innerFunction(state);
}

export function derive(innerFunction, state = 0) {
  state = (state | DERIVED);

  return innerFunction(state);
}

export function persist(innerFunction, state = 0) {
  state = (state & ~TRANSIENT);

  return innerFunction(state);
}

export function declare(innerFunction, state = 0) {
  state = (state & ~DERIVED);

  return innerFunction(state);
}

export function isDerived(state) {
  const derived = !!(state & DERIVED);

  return derived;
}

export function isDeclared(state) {
  const derived = isDerived(state),
        declared = !derived;

  return declared;
}

export function isTransient(state) {
  const transient = !!(state & TRANSIENT);

  return transient;
}

export function isPersistent(state) {
  const transient = isTransient(state),
        persistent = !transient;

  return persistent;
}
