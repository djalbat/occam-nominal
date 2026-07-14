"use strict";

import { continuationUtilities } from "occam-languages";

export const { some, every, match, reduce, forEach, extract, resolve, forwardsEvery, backwardsEvery } = continuationUtilities;

export function all(callbacks, ...remainingArguments) {
  const continuation = remainingArguments.pop();

  return every(callbacks, (callback, continuation) => {
    return callback(...remainingArguments, continuation);
  }, continuation);
}

export function exists(callbacks, ...remainingArguments) {
  const continuation = remainingArguments.pop();

  return some(callbacks, (callback, continuation) => {
    return callback(...remainingArguments, continuation);
  }, continuation);
}
